---
tags:
  - post
layout: post
title: "🀄 Leaves is an easy to pick-up table-top game"
summary: "Let me show you a pocket-sized game that can be learnt in under 5 mins and played anywhere"
date: 
categories:
  - "tabletop-games"
---



I want to make tools and scripts to simplify my work and make it easier.

## The first tool in the tool-belt

Amongst the many ideas I have in mind, I decided to start with one which would help me log what all I do during my work hours. So after summoning all my creative juices, I decided to name it `worklog`. This tool when invoked, takes a text input from the user and logs an entry to a CSV file along with the current timestamp. Below is the code for its first version (can totally be ignored for this post):

```python
```

My directory structure of the project at this moment was:

```text
worklog/
└── src/
    └── main.py
```

## Running worklog

Whenever I wanted to, I ran the script by specifying its full path in the terminal like `/Users/varunb/Projects/worklog/src/main.py`. Since currently the script does not have any dependencies on external libraries, this approach worked fine. But I wanted to have a setup where I could run it from anywhere on my system and neither have to worry about the full path to the script, nor have to have the dependencies installed in the global Python environment. I knew it was possible to write command-line tools in Python that satisfied both of those requirements as [yt-dlp](https://github.com/yt-dlp/yt-dlp) is a Python based tool meeting both of those requirements. Looking around told me that I need to look for [`pipx`](https://pipx.pypa.io/).

## Packaging it

I initially started with the `setup.py` route as I found a [guide for it](https://python-packaging.readthedocs.io/en/latest/index.html) first, but then found that `pipx` has a different suggested way (using `pyproject.toml`) and they also provided a [guide for the same](https://setuptools.pypa.io/en/latest/userguide/quickstart.html).

My final directory structure looked like this:

```text
```

With `pyproject.toml` looking like this:

```toml
```

And `src/worklog/__init__.py` remaining mostly unchanged:

```python
```

## Installing it

After all of this now I can do `pipx install /path/to/worklog/ worklog` and that would install my tool and make it available to run from anywhere on my system with a simple `worklog` command. This also takes care of creating a virtual-environment for the dependencies of this tool and installing them in there.
