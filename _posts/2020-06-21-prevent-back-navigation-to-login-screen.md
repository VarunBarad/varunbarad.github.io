---
layout: post
title: "Prevent back navigation to login screen"
summary: "The guide to correct way of preventing back navigation to login screens once user is logged-in"
date: 2020-06-21 12:00:00 +0530
categories:
  - "android"
  - "programming"
---

There is a typical use-case in apps where once the user has logged in, you won't want them to return to login screens when they press back. Instead what you want is to close the app itself.

I have encountered such a situation many times but learnt this week that the path I was following was way suboptimal and had its flaws. I also got introduced to a much cleaner approach of achieving that.

## Setup

Let us say that our app has 2 activities `LoginActivity` and `DashboardActivity`. We don't want anyone to reach `DashboardActivity` until they haven't logged in. And we also want that when user presses back from `DashboardActivity` they exit the app instead of going back to the `LoginActivity` (normal behavior of pressing back on an activity is to open the previous activity which opened current activity).

## What I used to do

Till now I used to setup `LoginActivity` such that it won't be saved to the back-stack. I used to  set the `android:noHistory` flag for `LoginActivity` to `true` in `AndroidManifest.xml`.

Atleast I thought that this was just preventing the activity from being placed on back-stack. But what it actually does is tells the system to not maintain any kind of history for instances of this activity class.

I never realized the problem with this because it worked okay with single-screen login flows (so far I had built only those). The place where this breaks is when you have multiple screens for login implemented via fragments.

What I started to notice in multi-screen login flow is that once user passes the first screen and then leaves the app (via pressing home-button, thus not actually going back) and come back to it they are brought back to the first fragment in the flow instead of taking them back to the fragment/screen where they left the app.

The problem here was the android system was completely forgetting everything about the activity as soon as the user left. All it remembered was that this is the activity that user left on and thus when they come back, they have to be shown this activity again.

## What is the solution for this

One of my colleague ([Sanchita](https://twitter.com/sanchita_ag)) showed me a much better way to do this. This method does not set any flags on any activity thus they keep their natural behavior of resuming user to the fragment that they left on.

What you want to do is, once the user is logged-in, you provide a couple of flags to the intent that launches the `DashboardActivity`. Those flags tell it to clear the current task and launch our `DashboardActivity` on a new task. This new task won't have the `LoginActivity` in its back-stack so when user presses back on `DashboardActivity` the app would exit instead of taking them back to `LoginActivity`.

This is how the launching code for `DashboardActivity` should look like:

```kotlin
fun startDashboardActivity() {
  val intent = Intent(context, DashboardActivity::class.java)
  intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TASK or Intent.FLAG_ACTIVITY_NEW_TASK
  context.startActivity(intent)
}
```

You can look at this [StackOverflow answer](https://stackoverflow.com/a/29565717/4717436) which explains those flags in much more detail.

Anyways, this was more as a documentation of my learning than a tutorial so do ask if there was still anything unclear in my explanation.

Feel free to reach out to me to discuss this or anything else. You can find me on Twitter [@varun_barad](https://twitter.com/varun_barad) or [email me](mailto:contact@varunbarad.com)
