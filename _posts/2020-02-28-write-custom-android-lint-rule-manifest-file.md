---
tags:
  - post
layout: post
title: "Write Custom Android Lint Rule - Manifest File"
summary: "Writing our own custom android lint rules for verifying AndroidManifest file."
date: 2020-02-28T12:00:00+0530
categories:
  - "android"
  - "programming"
---

Welcome folks, last time we wrote a lint check for making sure that all of our `EditText` have the `android:inputType` attribute.

This time we will be writing a check which works on our `AndroidManifest.xml` file. This check will ensure that our `application` tag has a child `meta-data` tag with attribute `android:name="android.webkit.WebView.MetricsOptOut"`. Read the background for that [here](https://developer.android.com/guide/webapps/managing-webview#metrics).

If you haven't yet then first go through [the last post]({{ site.url }}/blog/write-custom-android-lint-rule-layout-files) otherwise you might not understand many things as we will be building upon what we have created in that post.

## Changes to add to last project

We will be building upon the `lint-checks` module we created last time. We would need to make following changes:

- Add a new issue and detector pertaining to this manifest check
- Register the new issue in `LintRegistry` class

## Create the detector

Create a class named `WebViewMetricsMetaTagDetector` which extends from `ManifestDetector`

```kotlin
class WebViewMetricsMetaTagDetector : ManifestDetector() {
    ...
}
```

Now to define the Issue.

```kotlin
companion object {
    @JvmStatic
    internal val ISSUE_MISSING_WEBVIEW_METRICS_META_TAG = Issue.create(
        id = "MissingWebViewMetricsMetaTag",
        briefDescription = "Specify whether you want to opt-out of metrics tracking via WebView.",
        explanation = "WebView can upload diagnostic data to Google. You can opt-out by specifying a `meta-data` tag under your `application` tag in manifest.",
        category = Category.SECURITY,
        priority = 8,
        severity = Severity.ERROR,
        implementation = Implementation(
            WebViewMetricsMetaTagDetector::class.java,
            Scope.MANIFEST_SCOPE
        )
    ).addMoreInfo("https://developer.android.com/guide/webapps/managing-webview#metrics")
}
```

The things that have changed here are:

1. `id`, `briefDescription` and `explanation` for the issue.
2. Scope inside the Implementation object passed against `implementation` parameter. We changed from `Scope.ALL_RESOURCES_SCOPE` to `Scope.MANIFEST_SCOPE`.

We now override the 2 required methods:

```kotlin
override fun getApplicableElements(): Collection<String>? {
    return listOf(
        SdkConstants.TAG_APPLICATION
    )
}

override fun visitElement(context: XmlContext, element: Element) {
    val containsWebViewMetricsOptOutTag = element.childNodes
        .toList()
        .filter { it.nodeName == "meta-data" }
        .any { node ->
            node.attributes.toPairedNameValueList().filter { attribute ->
                attribute.first == "android:name" && attribute.second == "android.webkit.WebView.MetricsOptOut"
            }.isNotEmpty()
        }

    if (!containsWebViewMetricsOptOutTag) {
        context.report(
            issue = ISSUE_MISSING_WEBVIEW_METRICS_META_TAG,
            location = context.getLocation(element),
            message = ISSUE_MISSING_WEBVIEW_METRICS_META_TAG.getExplanation(TextFormat.TEXT)
        )
    }
}
```

In the `visitElement` method, we are traversing through all children of `<application>` and checking that a `meta-data` tag with attribute `android:name="android.webkit.WebView.MetricsOptOut"` exists. If it does not exist then we raise our issue `ISSUE_MISSING_WEBVIEW_METRICS_META_TAG`.

## Register the new issue

The last thing we need to do now is to add the above created issue in our `LintRegistry` class.

```kotlin
class LintRegistry : IssueRegistry() {
    override val api: Int
        get() = CURRENT_API

    override val issues: List<Issue>
        get() = listOf(
            InputTypeDetector.ISSUE_MISSING_INPUT_TYPE,
            WebViewMetricsMetaTagDetector.ISSUE_MISSING_WEBVIEW_METRICS_META_TAG // We added this line
        )
}
```

## Run the lint checks

There we are done, now to run the lint checks using gradle

```shell
./gradlew lint
```

Want to discuss this or any other interesting thing, hit me up on Twitter [@varun_barad](https://twitter.com/varun_barad).
