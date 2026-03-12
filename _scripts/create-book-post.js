const fs = require('fs');
const https = require('https');
const path = require('path');
const { execSync } = require('child_process');

const parseArgs = () => {
  const args = process.argv.slice(2);
  const idx = args.indexOf('--openLibraryBookId');
  if (idx === -1 || !args[idx + 1]) {
    throw new Error('Usage: node _scripts/create-book-post.js --openLibraryBookId <id>');
  }
  return args[idx + 1];
};

const fetchJson = (url) => {
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

const toSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-');
};

const toUrlTitle = (title) => {
  return title.replace(/\s+/g, '_');
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
  const bookId = parseArgs();

  const idType = bookId.endsWith('M') ? 'edition' : bookId.endsWith('W') ? 'work' : null;
  if (!idType) {
    throw new Error(`Unknown Open Library ID format: ${bookId}. Expected OL*M (edition) or OL*W (work).`);
  }

  const baseUrl =
    idType === 'edition'
      ? `https://openlibrary.org/books/${bookId}.json`
      : `https://openlibrary.org/works/${bookId}.json`;

  console.log(`Fetching book data from ${baseUrl}...`);
  const bookData = await fetchJson(baseUrl);

  let workData = null;
  if (idType === 'edition' && bookData.works && bookData.works.length > 0) {
    const workKey = bookData.works[0].key;
    const workUrl = `https://openlibrary.org${workKey}.json`;
    console.log(`Fetching work data from ${workUrl}...`);
    workData = await fetchJson(workUrl);
  }

  const title = bookData.title;
  if (!title) {
    throw new Error('No title found in book data');
  }

  const subtitle = bookData.subtitle || (workData && workData.subtitle) || null;
  const displayTitle = subtitle ? `${subtitle}: ${title}` : title;

  const rawDesc = bookData.description || (workData && workData.description);
  let description = null;
  if (rawDesc) {
    description = (typeof rawDesc === 'string') ? rawDesc : rawDesc.value;
  }
  if (!description) {
    throw new Error('Warning: No description found for this book. Blockquote will be omitted.');
  }

  const coverImageId = bookData.covers && bookData.covers.length > 0 ? bookData.covers[0] : null;
  if (!coverImageId) {
    throw new Error('No cover image found for this book.');
  }

  const titleSlug = toSlug(displayTitle);
  const urlTitle = toUrlTitle(title);
  const openLibraryUrl = `https://openlibrary.org/books/${bookId}/${urlTitle}`;
  const { datetime, datePrefix } = getIstDatetime();
  const imageFileName = `${titleSlug}.webp`;
  const postFileName = `${datePrefix}-book-${titleSlug}.md`;

  const booksImagesDir = path.join('assets', 'images', 'books');
  fs.mkdirSync(booksImagesDir, { recursive: true });

  const jpgPath = path.join(booksImagesDir, `${titleSlug}.jpg`);
  const webpPath = path.join(booksImagesDir, imageFileName);

  const coverUrl = `https://covers.openlibrary.org/b/id/${coverImageId}-L.jpg`;
  console.log(`Downloading cover image from ${coverUrl}...`);
  const imageData = await fetchBinary(coverUrl);
  fs.writeFileSync(jpgPath, imageData);

  console.log(`Converting cover image to WebP...`);
  execSync(`convert "${jpgPath}" -resize x640 "${webpPath}"`);
  fs.unlinkSync(jpgPath);
  console.log(`Saved cover image: ${webpPath}`);

  let markdown = `---
tags:
  - post
layout: post
open_library_book_id: "${bookId}"
title:  "📚 ${displayTitle}"
summary: "My thoughts and opinions on this book"
date: ${datetime}
categories:
  - "book-highlights"
---

<img alt="Cover of the book ${displayTitle}" src="/assets/images/books/${imageFileName}" style="width: fit-content; height: 320px;" /> <br />
`;

  if (description) {
    markdown += `
${formatDescription(description)}
>
> — [Open Library](${openLibraryUrl})
`;
  }

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
