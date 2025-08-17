---
tags:
  - post
layout: post
title: "How to get a random point inside a circle"
summary: "Generate random points in a circle using polar coordinates instead of brute force"
date: 2025-08-17T16:15:48+0530
categories:
  - "blaugust-2025"
  - "programming"
---

This is something from years ago, I needed to get a random point within a circular radius from a different point. The brute-force way would have to be "just get a random point and check if it is within the specified distance".

Below is a circle of radius 'r' centered at origin, and a point situated at (x,y) somewhere within the circle.

![An image of a circle of radius 'r' centered at origin showing a point at (x,y) inside the circle](/assets/images/posts/random-point-inside-circle/circle.svg)

It would be something like this:

```javascript
const x = Math.random() * r; // A number between 0 (inclusive) and r (exclusive)
const y = Math.random() * r; // A number between 0 (inclusive) and r (exclusive)

// According to mathematical equation of this circle
if ((x^2) + (y^2) < (r^2)) {
	console.log(`Hurray, we can use (${x},${y}).`);
} else {
	console.error(`Sorry, (${x},${y}) doesn't fall inside the circle.`);
}
```

The problem with this approach is that each time we have to check and we aren't sure how many iterations it might take to land on workable coordinates. But we have another way that we can approach this problem.

## Polar coordinates for the win

We can even show the same point in terms of its polar coordinates: (d, θ)

![The same point represented with its polar coordinates](/assets/images/posts/random-point-inside-circle/circle-polar.svg)

Now, rather than having a constraint only on the combined values of these parameters we have individual constraints on both of them:

- 0 ≤ θ ≤ 2π
- 0 ≤ d < r

This makes it much easier to generate both values, which can be done like this:

```javascript
const d = Math.random() * r; // A value between 0 (inclusive) and r (exclusive)
const angle = Math.random() * (2 * Math.PI); // A value between 0 (inclusive) and 2π (exclusive)

// Using their projections on both the axes we get the values of x and y
const x = d * Math.cos(angle);
const y = d * Math.sin(angle);
```

With this, in a single execution we are guaranteed to get one of the points that we desire.

## Side-bonus: How to get a random point in a disc around a point

What if we want to instead of getting the point inside a circle, want to get one inside a disc centered around origin with inner-radius being <code>r<sub>i</sub></code> and outer-radius being <code>r<sub>o</sub></code> (`= r` from before).

The only condition we need to update here is this one:

- Before: 0 ≤ d < r
- Now: <code>r<sub>i</sub></code> ≤ d < <code>r<sub>o</sub></code>

The code gets updated to:

```javascript
const d = (Math.random() * (rOuter - rInner)) + rInner; // A value between rInner (inclusive) and rOuter (exclusive)
const angle = Math.random() * (2 * Math.PI); // A value between 0 (inclusive) and 2π (exclusive)

// Using their projections on both the axes we get the values of x and y
const x = d * Math.cos(angle);
const y = d * Math.sin(angle);
```
