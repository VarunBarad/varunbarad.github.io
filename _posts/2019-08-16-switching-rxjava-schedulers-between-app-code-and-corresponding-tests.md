---
layout: post
title:  "Switching RxJava schedulers between app code and corresponding tests"
summary: "A simple way to switch between using appropriate schedulers in app code and using trampoline schedulers for tests."
date:   2019-08-16 12:00:00 +0530
categories:
  - "programming"
  - "rx-java"
---

When using RxJava we need to specify the schedulers which we want to use to 1) perform the given task and 2) return result of the operation chain.

One of the interesting ways I found while working on a take-home challenge for a company was as below:

```kotlin
object VarunSchedulers {
    private var schedulers: RxSchedulers = RxSchedulers.Default

    fun enableTesting() {
        this.schedulers = RxSchedulers.Test
    }

    fun disableTesting() {
        this.schedulers = RxSchedulers.Default
    }

    fun io(): Scheduler = this.schedulers.io()
    fun computation(): Scheduler = this.schedulers.computation()
    fun main(): Scheduler = this.schedulers.main()

    private sealed class RxSchedulers {
        abstract fun io(): Scheduler
        abstract fun computation(): Scheduler
        abstract fun main(): Scheduler

        object Test : RxSchedulers() {
            override fun io(): Scheduler = Schedulers.trampoline()
            override fun computation(): Scheduler = Schedulers.trampoline()
            override fun main(): Scheduler = Schedulers.trampoline()
        }

        object Default : RxSchedulers() {
            override fun io(): Scheduler = Schedulers.io()
            override fun computation(): Scheduler = Schedulers.computation()
            override fun main(): Scheduler = AndroidSchedulers.mainThread()
        }
    }
}
```

Now let's take the example of fetching a network query, we can simply do this

```kotlin
pandaService.getCutestPanda()
    .subscribeOn(VarunSchedulers.io())
    .observeOn(VarunSchedulers.main())
    ...
```

And when we write our unit-tests we can easily turn testing-mode on and off using the `@Before` and `@After` methods.

```kotlin
class SomeTestClass {
    @Before
    fun setupTests() {
        VarunSchedulers.enableTesting()
    }
    
    @After
    fun tearDown() {
        VarunSchedulers.disableTesting()
    }
    
    // Write your tests
}
```

Now whenever we are inside tests, then automatically the `trampoline` schedulers are assigned and respectively appropriate schedulers by default in case we are not in tests.

If you have more such tricks up your sleeve or something in here isn't clear to you or you just want to chat then hit me up on twitter [@varun_barad][varun-twitter].

[varun-twitter]: https://twitter.com/varun_barad 
