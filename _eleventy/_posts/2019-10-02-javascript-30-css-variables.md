---
tags:
  - post
layout: post
title:  "JavaScript 30 - CSS Variables"
summary: "Day 3 of JS30 challenge where I built an analog clock with CSS and animate its changes using JS and CSS."
date: 2019-10-02T12:00:00+0530
redirect_from:
  - "/programming/web/javascript-30/2019/10/02/javascript-30-css-variables.html"
categories:
  - "programming"
  - "web"
  - "javascript-30"
---

On my day 3 of [JS30 challenge][js30-website] I got introduced primarily to CSS variables but also to many other things.

The key concepts I learned from today's challenge were:

- CSS variables
- `dataset` property on DOM elements 
- Image blur
- Color input

## CSS variables

CSS variables work very similar to how we use variables in JS or any other programming language. They let us define their value at one place and then just use that same value anywhere we refer to that variable.

For example, we can define at one place that we want text on our website to be `white` then we can define it like this

```css
:root {
    --text-color: white;
}
```

Here we define this `text-color` variable at the root element. Now any place that we need to use this value we need to do something like

```css
.content {
    color: var(--text-color);
}
```

CSS variables can be used for more than just colors. In today's project we used these variables for storing the border thickness and color of an image and also for storing the blur amount for that image.

**Note:** One fun idea I have with CSS variables is that I can define the color palette of my website at one place and then provide the user with a night-mode switch. I can change colors across the whole website by changing them at just one place.

To modify their value via JS a simple method call does the trick.

```javascript
<dom-element>.style.setProperty('--text-color', 'red');
```

The above snippet will change the value associated with `--text-color` at any point in the `dom-element` and any of `dom-element`.

## `dataset` property on DOM elements

In HTML whenever we want to write a custom-property on an element we make use of what are called `data` attributes. A sample can be like

```html
<input id="blur" type="range" name="blur" min="0" max="25" value="5" data-sizing="px" data-purpose="A slider input to select blur amount">
```

Here we have defined 2 data attributes, namely `data-sizing` and `data-purpose`.

Now when we need to use these in JS we can simply do

```javascript
console.log(inputElement.dataset.sizing); // Used to access the data-sizing attribute.
console.log(inputElement.dataset.purpose); // Used to access the data-purpose attribute.
```

`dataset` is a very simple property on DOM elements which lists all the `data` attributes defined on that element.

## Image blur

Today I learnt a nifty simple trick to blur an image using only CSS.

```css
img {
    filter: blur(5px);
}
```

We can just specify a `blur` CSS filter and our work is done. There are lots of other functions available which can be used as `filter`, do make sure to take a look at that list.

## Color input

Standardisation of HTML and CSS has made it easy to create a simple and functional color-picker. The only thing that needs to be done is

```html
    <input id="base" type="color" name="base" value="#43bc46">
```

Here we have just declared an input tag which then takes care of displaying a color picker and also shows the user with a tiny sample of the color they have picked.

## Conclusion

That's all folks, that was it for today. If you have anything unclear in this article or want to discuss anything else, hit me up on twitter [@varun_barad][varun-twitter].

[js30-website]: https://javascript30.com
[varun-twitter]: https://twitter.com/varun_barad
