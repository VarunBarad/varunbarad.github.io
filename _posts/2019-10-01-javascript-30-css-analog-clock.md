---
layout: post
title:  "JavaScript 30 - CSS Analog Clock"
summary: "Day 2 of JS30 challenge where I built an analog clock with CSS and animate its changes using JS and CSS."
date:   2019-10-01 12:00:00 +0530
redirect_from:
  - "/programming/web/javascript-30/2019/10/01/javascript-30-css-analog-clock.html"
categories:
  - "programming"
  - "web"
  - "javascript-30"
---

Today I am continuing my work on [JS30 challenge][js-30-website] and building a simple analog clock using CSS shapes and then animate it with CSS transforms timed using JS.

The key concepts I learned from today's challenge were:

- Changing rotation center of an object in CSS
- CSS Transition timing function
- A weird reverse-jump in animation whenever any clock hand crosses 12 o'clock mark.

## Changing rotation center of an object in CSS

By default an object in CSS rotates around its center. But in our clock we need to rotate them around one of their corners. Therefore we need to change their CSS origins

```css
.hand {
    transform-origin: 100%;
}
```

The above snippet moves the origin point for all CSS transforms to the right end of that element.

## CSS Transition timing function

You can provide a timing function for your CSS transitions so that they follow it for their rate of change during the duration of your transitions.

```css
.hand {
    transition-timing-function: ease-in-out;
}
```

There are many built-in transition timing functions but I generally liked the `ease-in-out` for how its acceleration and deceleration feel much like natural movements. You can check out the rest of them if you like.

My favorite ability in this was that we can provide our custom timing functions using what is known as a bezier curve specification. For example:

```css
.hand {
    transition-timing-function: cubic-bezier(0.42, 0.0, 0.58, 1.0);
}
```

In the above code-sample I have written the `cubic-bezier` format of the `ease-in-out` timing function but you can customize the bezier curve to your heart's content using those 2 anchor points.

# A weird reverse-jump in animation whenever any clock hand crosses 12 o'clock mark

The hands of my clock were moving nicely from 12 to 12 but when they were just going to reach 12 they would do a weird jump and instead of moving 1 tick forward from right before 12 to 12, they would perform a full reverse circle and reach 12 from that side.

This problem was occurring because of how we calculated the angles of rotation. We used the below equation for counting number of seconds.

```javascript
const secondsDegrees = ((seconds / 60) * 360) + 90;
// Here 90 degrees is the initial offset to make clock-hands start at 12
```

With this what would happen is as below:

| Seconds   | Degrees |
|:---------:|:-------:|
| 0         | 90      |
| 15        | 180     |
| 30        | 270     |
| 45        | 360     |
| 60 (or 0) | 90      |

So the main issue is that when reaching the 60 second mark it rotates counter-clockwise because the final value of clock-hand handle (90) is less than its current value (360). So instead of the transition being a smooth forward transition, it jumps counter-clockwise and that's where we see that queer problem.

A very quick way to deal with this is to keep the degrees calculation so that they are always increasing. The result with that would be something like this:

| Seconds   | Degrees  |
|:---------:|:--------:|
| 0         | 90       |
| 15        | 180      |
| 30        | 270      |
| 45        | 360      |
| 60 (or 0) | 450      |

## Conclusion

If you want to discuss anything that was unclear in today's article then hit me up on twitter [@varun_barad][varun-twitter].

[js-30-website]: https://javascript30.com
[varun-twitter]: https://twitter.com/varun_barad
