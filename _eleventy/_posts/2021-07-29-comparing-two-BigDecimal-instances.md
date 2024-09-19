---
tags:
  - post
layout: post
title: "📝 Comparing two BigDecimal instances"
summary: "TIL: Turns out that 7.5.toBigDecimal() and 7.50.toBigDecimal() are not equal"
date: 2021-07-29T00:00:00+0530
categories:
  - "til"
---

If you have two instances of BigDecimal as following

```kotlin
val a = 7.5.toBigDecimal()
val b = 7.50.toBigDecimal()
```

It seems that they are equal in value and should return true when doing `a == b` but they don't. The reason is that `b` is more precise than `a` and therefore not equal in value.

So to compare the magnitude of two `BigDecimal`s (while ignoring their precision) we need to use `a.compareTo(b)`. When both the numbers are same in magnitude `compareTo` returns `0`.

So in Kotlin we can create an extension function like this

```kotlin
fun BigDecimal.isEqualInMagnitude(num: BigDecimal): Boolean {
    return this.compareTo(num) == 0
}
```

And then when we need to compare two numbers we can simply do

```kotlin
val a = 7.5.toBigDecimal()
val b = 7.50.toBigDecimal()

if (a.isEqualInMagnitude(b)) {
    println("Equal in magnitude")
} else {
    println("Magnitudes of both numbers don't match")
}
```
