---
layout: post
title: "Group posts by year in Jekyll using Liquid"
summary: "You can use the `group_by_exp` filter in Liquid to group posts by year"
date: 2023-05-10 07:55:00 +0530
categories:
  - "programming"
---

On the [list-all-posts page](/blog) on this blog I wanted to group posts by year and show the year as a section-heading.

I found a [StackOverflow answer](https://stackoverflow.com/a/61346228/4717436) that suggested using the `group_by_exp` filter in Liquid. I used it as follows:

{% raw %}
```html
{% assign postsByYear = site.posts | group_by_exp:"post", "post.date | date: '%Y'" %}
{% for year in postsByYear %}
<h2>{{ year.name }}</h2>

<div class="post-list">
  {% for post in year.items %}
  <p>
    <a href="{{ post.url }}" class="post-title">{{ post.title }}</a>
    <br>
    <span class="post-description">{{ post.summary }}</span>
  </p>
  {% endfor %}
</div>
{% endfor %}
```
{% endraw %}

If you want to further do sub-sections by month then you can use something like this:

{% raw %}
```html
{% assign postsByYear = site.posts | group_by_exp:"post", "post.date | date: '%Y'" %}
{% for year in postsByYear %}
<h2>{{ year.name }}</h2>

<div class="month-list">
  {% assign postsByMonth = year.items | group_by_exp:"post", "post.date | date: '%B'" %}
  {% for month in postsByMonth %}
  <h3>{{ month.name }}</h3>

  <div class="post-list">
    {% for post in month.items %}
    <p>
      <a href="{{ post.url }}" class="post-title">{{ post.title }}</a>
      <br>
      <span class="post-description">{{ post.summary }}</span>
    </p>
    {% endfor %}
  </div>
  {% endfor %}
</div>
{% endfor %}
```
{% endraw %}
