---
layout: post
title:  "Simplifying User-Experience for rating your Android app"
date:   2018-02-15 00:00:00 +0530
categories: 
  - "android"
---
Who doesn’t want their users to leave ratings for their application on the Play Store? But it is not the top thing on users’ minds (unless they are really annoyed by your app). Even if they want to rate your app, it is a rather cumbersome process for them to:

1. Open the Play Store (temporarily abandoning whatever they are doing)
2. Search for your app
3. Find the one that is actually yours among a buttload ([it is an actual unit of measurement][wiktionary-buttload]) of other clones
4. Rate your app

## Simplifying the user flow

You might have seen in many apps that they provide a button or something similar which redirects them directly to the Play Store listing of their particular app. This short-circuits the first three steps in the above flow, providing user with a much shorter flow for rating your app.

Providing such an option requires mainly 2 steps from the developer:

1. Displaying an option to user to rate the app (showing a button, dialog or something else)
2. Launching the Play Store listing of that app on clicking the above presented option

## 1. Displaying "Rate-Me" option to user

There are many options to display an option to user for rating your app. I will be using a simple button for this purpose.

{% highlight xml %}
<Button
    android:id="@+id/button_rateMe"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Rate Me!"
    android:onClick="rateApp" />
{% endhighlight %}

You have many other options like:

- Dialog
- Menu item
- Floating Action Button (FAB) in About screen of app

## 2. Launching the Play Store listing

Now comes the part where we launch the Store listing for our app when user clicks on whatever we displayed above. Continuing the above example, I have the below code in my Activity in which the above button is displayed.

{% highlight java %}
// Java
public void rateApp(View rateMeButton) {
    String packageName = this.getPackageName();
    String playStoreAppUri = "market://details?id=" + packageName;
    String playStoreSiteUri = "https://play.google.com/store/apps/details?id=" + packageName;
    
    try {
        Intent playStoreAppIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(playStoreAppUri));
        startActivity(playStoreAppIntent);
    } catch (ActivityNotFoundException e) {
        Intent playStoreBrowserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(playStoreSiteUri));
        startActivity(playStoreBrowserIntent);
    }
}
{% endhighlight %}

{% highlight kotlin %}
// Kotlin
public fun rateApp(rateMeButton: View): Unit {
    val packageName = this.packageName
    val playStoreAppUri = "market://details?id=$packageName"
    val playStoreSiteUri = "https://play.google.com/store/apps/details?id=$packageName"
    
    try {
        val playStoreAppIntent = Intent(Intent.ACTION_VIEW, Uri.parse(playStoreAppUri))
        startActivity(playStoreAppIntent)
    } catch (e: ActivityNotFoundException) {
        val playStoreBrowserIntent = Intent(Intent.ACTION_VIEW, Uri.parse(playStoreSiteUri))
        startActivity(playStoreBrowserIntent)
    }
}
{% endhighlight %}

Let me explain what the above code does.

If you have ever paid attention to the URL of the store-listing of any app on the Play Store then you would have noticed that the app’s package name is used as it’s unique identifier on the store. The structure is like this:

`https://play.google.com/store/apps/details?id=<package-name-of-your-app>`

And a similar structure is followed by the URI for Play Store app:

`market://details?id=<package-name-of-your-app>`

So, we first try launching the Play Store app on the device, using the URI for the app (the `market://...` one). If the Play Store app is present on the device then it is launched and the page containing listing of our app is opened.
                                                                                                                 
If due to some conditions the Play Store app is not present (this can be the case with some custom ROMs), then `startActivity` will throw the `ActivityNotFoundException` exception and we then fall-back to opening our app’s listing on the web version of the Play Store using the browser.

### That's all folks

If you know of a better way for this, [contact me][varun-contact] or tweet to me [@varun_barad][varun-twitter]. You can even send me ideas for any other topics that you would like to know about.

[varun-contact]: https://varunbarad.com/contact
[varun-twitter]: https://twitter.com/varun_barad
[wiktionary-buttload]: https://en.wiktionary.org/wiki/buttload
