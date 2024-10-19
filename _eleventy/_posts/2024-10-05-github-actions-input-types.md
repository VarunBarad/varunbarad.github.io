---
tags:
  - post
layout: post
title: "Not all booleans are created equal on GitHub Actions"
summary: "How to get an actual boolean input value on a manually run GitHub Action"
date: 2024-10-05T06:55:23+0530
categories:
  - "programming"
  - "tools"
---

We use the `workflow_dispatch` trigger to run a GitHub Action manually. This also allows us to specify any inputs that we want to provide to the action at the time of running ([link to documentation](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#providing-inputs)).

Take the below example where an imaginary workflow greets a person based on whether they prefer "Hello" or not as told by user. This would not work if the workflow parameter `greetWithHello` actually expects a boolean as the value of even a boolean input parameter in a `workflow_dispatch` call is actually a string `'true'`/`'false'`.

{% raw %}
```yaml
name: Show inputs

on:
  workflow_dispatch:
    inputs:
      prefersHello:
        description: 'Whether the person prefers to greet with a Hello'
        required: true
        type: boolean
        default: false

jobs:
  greet_person:
    name: Greet the person
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: imaginary/greet@v1
        with:
          greetWithHello: ${{ github.event.inputs.prefersHello }}
```
{% endraw %}

The way to convert this into an actual boolean is to compare the value of the input like this

{% raw %}
```yaml
${{ github.event.inputs.prefersHello == 'true' }}
```
{% endraw %}

With that, the previous example turns into:

{% raw %}
```yaml
name: Show inputs

on:
  workflow_dispatch:
    inputs:
      prefersHello:
        description: 'Whether the person prefers to greet with a Hello'
        required: true
        type: boolean
        default: false

jobs:
  greet_person:
    name: Greet the person
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: imaginary/greet@v1
        with:
          greetWithHello: ${{ github.event.inputs.prefersHello == 'true' }}
```
{% endraw %}
