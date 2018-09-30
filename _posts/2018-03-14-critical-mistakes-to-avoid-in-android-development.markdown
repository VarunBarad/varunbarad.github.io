---
layout: post
title:  "Critical mistakes to avoid in Android development"
date:   2018-03-14 00:00:00 +0530
categories: 
  - "android"
---
As many pioneers and leaders in different fields have paraphrased:

> In any endeavor, it is important to know what are the top few things that need to be done right. But, it is equally important, if not more, to know the top few things which people should avoid at all costs.

My posts up until now have been about how to perform a particular task on Android. Heeding the above saying, today I will be writing about the first five mistakes which I think should be avoided by Android developers.

## Not putting all the strings to be displayed in strings.xml

This provides for a poor internationalization experience, as you will have to design your own ways of displaying the correct version of a message based on the user’s locale.

If the messages are in strings.xml, then they can easily be translated and integrated into the app. The Android OS then seamlessly handles which string resource to use based on the locale that the user has set on their device.

Here are a few of the reasons given by users to not use string-resources:

- **Need context to access:** If you wish to display that string to UI, you will inevitably need/have some kind of context there too. Just use that same context to fetch the string
- **But I only need it in this one place:** There is no telling when tomorrow you might need to have that same string in some other file. It is better to invest an extra minute to provide insurance against future problems
- **Complex string with run-time data:** Friends, Android has you covered. There are parameterized strings supported by the platform with a syntax similar to the one used in Java’s `String.format()`. More than that, plural-strings (using different strings based on the quantity of something) are also supported. Check out [this StackOverflow post](https://stackoverflow.com/questions/2397613/are-parameters-in-strings-xml-possible "Parameterized Strings") for parameterized strings and the [official documentation](https://developer.android.com/guide/topics/resources/string-resource.html "Plural Strings") for plural-strings.

## Not using data-binding

Who likes to write cumbersome `findViewById` calls and then maintain the reference to those views in their current namespace? Also, in that case we need to keep our view-id’s so that we are sure of which view-id we are using in `findViewById` . This is because autocomplete in Android Studio will suggest every id (from all layouts), but only those present in the current layout tree will be available to `findViewById` . Non-existent ones will return `null` (probably causing a `NullPointerException`).

Google has made it extremely easy to integrate data-binding into any app (new/existing) and eliminate all those pesky boilerplate view-reference stuff.

A few of the benefits of using data-binding (over not using it) are:

- References to only present views available (trying to refer to an absent component will show an error while editing the file in AS. It will also throw a compile-time error instead of biting you at runtime.).
- A bit faster due to it needing to traverse the whole layout-tree only once as opposed to every-time when `findViewById` is called.
- Your working namespace (class/function) remains clean, and you don’t have to keep a reference to all the views.
- You can use as few of the features in data-binding as just using it to eliminate `findViewById` calls to much more advanced features (like in this post, George Mount of Google tries to write a single adapter for all the recycler-views in an app).

## Not hiding API keys

This is a common problem which is domain-agnostic and made mostly by junior developers in almost all the areas. Once you commit some piece of code to version control it remains there forever. Even if you remove that API key in future commits, anyone who has access to that repository can view the key from its history and all sorts of problems can follow.

You can take a look at [this post][post-hiding-api-key] to figure out how to hide your API keys from your repository while still including them in the build process and making them available in your code.

## Not taking activity life-cycle into account

Any type of configuration change will cause the current activity to be destroyed and created again. To make sure that the transition is seamless for the user, we need to store the state our app was in just before the configuration change. Then we can recreate it just how the user expects it to be using the state after our activity is created anew following the configuration change.

While on the subject, we should also store the app’s state when our current activity moves to stopped state. After that, our app may be killed as per the system’s need of resources.

## Not learning the keyboard shortcuts in Android Studio

This might not be something which reflects in the code you write, but it highly affects your total workflow. Android Studio is built on top of IntelliJ Idea (an IDE famous for its keyboard friendliness). This means that there is a lot to be gained in developer productivity by simply investing a bit of time in learning different keyboard shortcuts. Here are some of my favorite resources to help you with that:

- **KeyPromoter -**  This is an IntelliJ plugin (available in AS) which would display a giant ugly dialogue, showing the shortcut command for the action you just performed, whenever you use your mouse to do something. Trust me, this one will annoy the hell out of you and kind of force you to learn those shortcuts. You can find and download it from the plugins section of Android Studio settings.
- **Cheat-sheet -** [This is an official printable cheat-sheet][jetbrains-shortcuts-cheat-sheet] for the keyboard shortcuts by Jetbrains (the company behind IntelliJ). Versions for both Windows and Mac are available.
- **Official Guide-**  [This is the official guide][jetbrains-shortcuts-documentation] provided by Jetbrains to mastering keyboard shortcuts on IntelliJ platform.
- Also check out these two videos
    - [Android Studio Shortcuts][video-android-shortcuts]
    - [Android Studio: (About) 10 Things You (Probably) Didn’t Know You Could Do][video-android-studio-10-things]

### That's all folks

These are the five things which I think anyone working in Android development should focus on first. If you have any other suggestions regarding these or any other topics under the sky, [contact me][varun-contact] or tweet to me [@varun_barad][varun-twitter].

[varun-contact]: https://varunbarad.com/contact
[varun-twitter]: https://twitter.com/varun_barad
[post-hiding-api-key]: https://varunbarad.com/android/2018/02/01/hiding-api-keys-from-your-android-repository.html
[jetbrains-shortcuts-cheat-sheet]: https://resources.jetbrains.com/storage/products/intellij-idea/docs/IntelliJIDEA_ReferenceCard.pdf
[jetbrains-shortcuts-documentation]: https://www.jetbrains.com/help/idea/mastering-intellij-idea-keyboard-shortcuts.html
[video-android-shortcuts]: https://www.youtube.com/watch?v=hdrAlhRI5vM
[video-android-studio-10-things]: https://www.youtube.com/watch?v=eOV2owswDkE
