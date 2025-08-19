---
tags:
  - post
layout: post
title: "📝 Setting up MongoDB for local development with docker compose"
summary: "TIL: How to setup MongoDB for local development"
date: 2025-08-20T01:19:06+0530
categories:
  - "til"
  - "blaugust-2025"
---

Recently for a project I needed to setup a local mongodb instance using docker (via docker-compose). I set up this simple compose file:

```yaml
version: "3.1"
services:
  mongo:
    container_name: node-auth-mongo
    image: mongo:4.4.20-rc0-focal
    environment:
      MONGO_INITDB_DATABASE: authdb
      MONGO_INITDB_ROOT_USERNAME: mongo-admin
      MONGO_INITDB_ROOT_PASSWORD: admin-password
    ports:
      - "27017:27017"
```

Mongo stores the login credentials in a database named `admin` so we would need to specify that too (as `authSource`) when connecting to it:

```dotenv
MONGO_URL=mongodb://mongo-admin:admin-password@localhost:27017/authdb?retryWrites=true&w=majority&authSource=admin
```

Thanks to [Hans Kilian](https://stackoverflow.com/a/75320403/4717436) over on StockOverflow.
