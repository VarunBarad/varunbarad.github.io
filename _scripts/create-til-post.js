const fs = require('fs');
const path = require('path');

const parseArgs = () => {
  const args = process.argv.slice(2);
  const idx = args.indexOf('--title');
  if (idx === -1 || !args[idx + 1]) {
    throw new Error('Usage: node _scripts/create-til-post.js --title "Your TIL title"');
  }
  return args[idx + 1];
};

const toSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-');
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

const main = () => {
  const title = parseArgs();
  const slug = toSlug(title);
  const { datetime, datePrefix } = getIstDatetime();
  const postFileName = `${datePrefix}-til-${slug}.md`;
  const postPath = path.join('_posts', postFileName);

  const markdown = `---
tags:
  - post
layout: post
title: "📝 ${title}"
summary: "TIL: ${title}"
date: ${datetime}
categories:
  - "til"
---

`;

  fs.writeFileSync(postPath, markdown, { encoding: 'utf-8' });
  console.log(`Created post: ${postPath}`);
};

try {
  main();
  console.log('Done!');
  process.exit(0);
} catch (err) {
  console.error(err.message || err);
  process.exit(1);
}
