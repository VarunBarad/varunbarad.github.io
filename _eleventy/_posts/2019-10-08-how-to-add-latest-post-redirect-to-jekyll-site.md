---
tags:
  - post
layout: post
title:  "How to add \"latest\" post redirect to Jekyll site"
summary: "I wanted to add a URL to my site which will always redirect the visitor to the latest blog post I have published at that time."
date: 2019-10-08T12:00:00+0530
redirect_from:
  - "/programming/web/2019/10/08/how-to-add-latest-post-redirect-to-jekyll-site.html"
categories:
  - "programming"
  - "web"
---

I wanted to have a URL which I can give to someone and it would always take them to the latest post published on my blog. I ended up using [https://varunbarad.com/blog/latest][vb-blog-latest] as the URL.

Since my website is statically generated and hosted, it wasn't an option for me to specify a server-side `30x` redirect for that particular URL to my latest post.

So what I ended up doing is generate a page on each build which would redirect user to the latest post using JS. To get the information about latest post, I made use of Jekyll's Liquid templating *syntax* (not sure what else to call it).

So the `<body>` tag of that page ended up looking like this:

{% raw %}
```html
<body>
{%- assign latest_post = site.posts[0] -%}
<p>Redirecting you to {{ latest_post.title }}</p>

<script>
    window.location.href = "{{ latest_post.url }}";
</script>

</body>
```
{% endraw %}

Here I get the details of latest post by taking the first post in the list `site.posts`. AFAIK `site.posts` is sorted in descending order by publishing date, so this approach fetches me the last published post.

Then it is a simple matter of setting the `window.location.href` to the final url of the latest post.

The final task remaining was to make sure that this page was compiled and generated exactly at `https://varunbarad.com/blog/latest`. For that I specified a `permalink: "/blog/latest/"` in the front-matter for that page. That way Jekyll knows where to put the final generated HTML file for that page.

## Conclusion

That was all, a simple way to add a URL to your Jekyll site which will always take the visitor to your latest blog post. You can take a look at the full source code of my website over at [GitHub][vb-website-repo] or you can also find the full code of this "latest post redirect" page at [this link][vb-website-repo-latest-page].

If you want to talk with me about anything related to this feel free to reach out to me on twitter [@varun_barad][vb-twitter]

[vb-blog-latest]: https://varunbarad.com/blog/latest
[vb-website-repo]: https://github.com/VarunBarad/varunbarad.github.io/tree/development
[vb-website-repo-latest-page]: https://github.com/VarunBarad/varunbarad.github.io/blob/development/latest-post-redirect.html
[vb-twitter]: https://twitter.com/varun_barad
