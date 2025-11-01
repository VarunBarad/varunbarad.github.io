# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Varun Barad's personal website and blog built with Eleventy (11ty). It's a static site generator that processes Liquid templates, Markdown posts, and various asset files to create a complete website hosted at varunbarad.com.

## Development Commands

### Core Commands
- `npm run build` - Build the site using Eleventy (outputs to `_site/`)  
- `npm run serve` - Start development server on port 8080 with live reload
- `npm run clean` - Remove build artifacts from `_site/`
- `npm run setup-hooks` - Install git pre-commit hook
- `npm run sync-resources` - Run resource sync script and copy blog posts

### Build Process
The site uses Eleventy with:
- Input directory: root (`.`)
- Output directory: `_site/`  
- Layouts: `_layouts/`
- Includes: `_includes/`

## Architecture

### Content Structure
- **Blog posts**: `_posts/` - Markdown files with YAML frontmatter, named with date prefix (YYYY-MM-DD-title.md)
- **Pages**: Root-level `.liquid` and `.html` files for static pages
- **Layouts**: `_layouts/` - Liquid templates for different page types (post.liquid, page.liquid, etc.)
- **Includes**: `_includes/` - Reusable template components (header, footer, styles)
- **Data**: `_data/` - JSON files containing site metadata and project data

### Asset Organization
- `assets/css/` - Stylesheets including Prism syntax highlighting themes
- `assets/images/posts/` - Post-specific images organized by post topic
- `assets/js/` - JavaScript dependencies (jQuery, Bootstrap)
- `assets/fonts/` and `assets/webfonts/` - Font assets

### Post Frontmatter Structure
Posts require this frontmatter format:
```yaml
---
tags:
  - post
layout: post
title: "Post Title"
summary: "Brief description"
date: YYYY-MM-DDTHH:MM:SS+0530
categories:
  - "category-name"
---
```

### Eleventy Configuration
- Custom date filter for timezone conversion (Asia/Kolkata)
- RSS/Atom feed generation
- Syntax highlighting plugin
- Blog post categories collection builder
- Passthrough copying for assets, podcasts, experiments

## Scripts and Automation

### Resource Management
- `_scripts/sync-resources` - Copies files to legacy `_eleventy` directory structure
- `_scripts/copy-blog-posts.js` - Processes post metadata and copies to target directory
- `_scripts/pre-commit` - Git hook (currently minimal implementation)

### Content Processing
The copy-blog-posts script automatically:
1. Adds post tags to frontmatter
2. Converts date format to ISO 8601
3. Processes all files in `_posts/` directory

## Development Workflow

1. **Adding new posts**: Create in `_posts/` with proper date prefix and frontmatter
2. **Local development**: Use `npm run serve` for live preview
3. **Building**: Run `npm run build` to generate static site
4. **Git workflow**: Site is deployed from `master` branch; currently on `redesign-start` branch

## Key Dependencies
- `@11ty/eleventy` - Static site generator
- `@11ty/eleventy-plugin-rss` - RSS feed generation
- `@11ty/eleventy-plugin-syntaxhighlight` - Code syntax highlighting
- `@js-joda/core` and `@js-joda/timezone` - Date/time handling with timezone support
