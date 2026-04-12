const fs = require('fs');
const https = require('https');
const path = require('path');
const { execSync } = require('child_process');

const parseArgs = () => {
  const args = process.argv.slice(2);
  const idx = args.indexOf('--thetvdbMovieId');
  if (idx === -1 || !args[idx + 1]) {
    throw new Error('Usage: node _scripts/create-movie-post.js --thetvdbMovieId <id>\nRequires THETVDB_API_KEY environment variable.');
  }
  return args[idx + 1];
};

const getApiKey = () => {
  const apiKey = process.env.THETVDB_API_KEY;
  if (!apiKey) {
    throw new Error('THETVDB_API_KEY environment variable is required.\nGet an API key at https://www.thetvdb.com/api-information');
  }
  return apiKey;
};

const postJson = (url, body) => {
  return new Promise((resolve, reject) => {
    const bodyStr = JSON.stringify(body);
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyStr),
      },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse JSON from ${url}: ${e.message}`));
        }
      });
    });
    req.on('error', reject);
    req.write(bodyStr);
    req.end();
  });
};

const fetchJson = (url, headers = {}) => {
  return new Promise((resolve, reject) => {
    const get = (currentUrl) => {
      const urlObj = new URL(currentUrl);
      const options = {
        hostname: urlObj.hostname,
        path: urlObj.pathname + urlObj.search,
        headers,
      };
      https.get(options, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          get(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${currentUrl}`));
          return;
        }
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Failed to parse JSON from ${currentUrl}: ${e.message}`));
          }
        });
      }).on('error', reject);
    };
    get(url);
  });
};

const fetchBinary = (url) => {
  return new Promise((resolve, reject) => {
    const get = (currentUrl) => {
      https.get(currentUrl, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          get(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${currentUrl}`));
          return;
        }
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      }).on('error', reject);
    };
    get(url);
  });
};

const getIstDatetime = () => {
  const now = new Date();
  const offsetMs = 5.5 * 60 * 60 * 1000;
  const ist = new Date(now.getTime() + offsetMs);
  const pad = (n) => String(n).padStart(2, '0');
  const year = ist.getUTCFullYear();
  const month = pad(ist.getUTCMonth() + 1);
  const day = pad(ist.getUTCDate());
  const hours = pad(ist.getUTCHours());
  const minutes = pad(ist.getUTCMinutes());
  const seconds = pad(ist.getUTCSeconds());
  return {
    datetime: `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+0530`,
    datePrefix: `${year}-${month}-${day}`,
  };
};

const formatDescription = (desc) => {
  const paragraphs = desc.trim().split(/\n\n+/);
  return paragraphs.map((p) => '> ' + p.replace(/\n/g, '\n> ')).join('\n>\n');
};

const main = async () => {
  const movieId = parseArgs();
  const apiKey = getApiKey();

  console.log('Logging in to TheTVDB...');
  const loginResponse = await postJson('https://api4.thetvdb.com/v4/login', { apikey: apiKey });
  if (loginResponse.status !== 'success' || !loginResponse.data?.token) {
    throw new Error(`TheTVDB login failed: ${JSON.stringify(loginResponse)}`);
  }
  const token = loginResponse.data.token;

  const movieUrl = `https://api4.thetvdb.com/v4/movies/${movieId}/extended?meta=translations`;
  console.log(`Fetching movie data from ${movieUrl}...`);
  const movieResponse = await fetchJson(movieUrl, { Authorization: `Bearer ${token}` });
  if (movieResponse.status !== 'success' || !movieResponse.data) {
    throw new Error(`Failed to fetch movie data: ${JSON.stringify(movieResponse)}`);
  }
  const movieData = movieResponse.data;

  const title = movieData.name;
  if (!title) {
    throw new Error('No title found in movie data');
  }

  const slug = movieData.slug;
  if (!slug) {
    throw new Error('No slug found in movie data');
  }

  const overviewTranslations = movieData.overviewTranslations || [];
  let overview = null;
  const engEntry = overviewTranslations.find((t) => t.language === 'eng');
  if (engEntry) {
    overview = engEntry.overview;
  }
  if (!overview) {
    throw new Error('No English overview found for this movie.');
  }

  const posterUrl = movieData.image;
  if (!posterUrl) {
    throw new Error('No poster image found for this movie.');
  }

  const { datetime, datePrefix } = getIstDatetime();
  const imageFileName = `${slug}-poster.webp`;
  const postFileName = `${datePrefix}-movie-${slug}.md`;
  const thetvdbUrl = `https://thetvdb.com/movies/${slug}`;

  const moviesImagesDir = path.join('assets', 'images', 'movies');
  fs.mkdirSync(moviesImagesDir, { recursive: true });

  const jpgPath = path.join(moviesImagesDir, `${slug}-poster.jpg`);
  const webpPath = path.join(moviesImagesDir, imageFileName);

  console.log(`Downloading poster from ${posterUrl}...`);
  const imageData = await fetchBinary(posterUrl);
  fs.writeFileSync(jpgPath, imageData);

  console.log('Converting poster to WebP...');
  execSync(`convert "${jpgPath}" -resize x640 "${webpPath}"`);
  fs.unlinkSync(jpgPath);
  console.log(`Saved poster: ${webpPath}`);

  const markdown = `---
tags:
  - post
layout: post
thetvdb_movie_id: "${movieId}"
title:  "🎬 ${title}"
summary: "My thoughts and opinions on this movie"
date: ${datetime}
categories:
  - "movies"
---

<img alt="Poster of the movie ${title}" src="/assets/images/movies/${imageFileName}" style="width: fit-content; height: 320px;" /> <br />

Score: ?/5

${formatDescription(overview)}
>
> — [TheTVDB.com](${thetvdbUrl})

`;

  const postPath = path.join('_posts', postFileName);
  fs.writeFileSync(postPath, markdown, { encoding: 'utf-8' });
  console.log(`Created post: ${postPath}`);
};

main()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
