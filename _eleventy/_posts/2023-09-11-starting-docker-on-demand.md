---
tags:
  - post
layout: post
title: "🐳 Starting docker on demand"
summary: "How to avoid not having docker running when you run <code>docker</code> or <code>docker-compose</code> commands"
date: 2023-09-11T13:17:31+0530
categories:
  - "tools"
---

Inspired by [this article](https://alexwlchan.net/2023/docker-on-demand/) from [Alex](https://alexwlchan.net) I also set out to remove always running Docker daemon from the background while ensuring it is available whenever I need it on running `docker` or `docker-compose` commands.

I created 2 scripts and put them on my path before the actual `docker` and `docker-compose` binaries. For an explanation of the scripts I suggest you read Alex's article linked above.

```shell
#!/usr/bin/env bash

set -o errexit
set -o nounset

is_docker_running() {
  if /usr/local/bin/docker info > /dev/null 2>&1; then
    return 0
  else
    return 1
  fi
}

if ! is_docker_running; then
  echo "Starting Docker..."
  open /Applications/Docker.app

  for i in $(seq 60)
  do
    if is_docker_running; then
      break
    fi
    sleep 1
  done
fi

/usr/local/bin/docker "$@"
```

I named the above file `docker`, gave it executable permissions and did a similar thing for `docker-compose`

```shell
#!/usr/bin/env bash

set -o errexit
set -o nounset

is_docker_running() {
  if /usr/local/bin/docker info > /dev/null 2>&1; then
    return 0
  else
    return 1
  fi
}

if ! is_docker_running; then
  echo "Starting Docker..."
  open /Applications/Docker.app

  for i in $(seq 60)
  do
    if is_docker_running; then
      break
    fi
    sleep 1
  done
fi

/usr/local/bin/docker-compose "$@"
```

Thanks again to [Alex](https://alexwlchan.net) for the inspiration.
