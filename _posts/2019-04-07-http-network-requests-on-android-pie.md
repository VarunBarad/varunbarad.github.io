---
layout: post
title:  "HTTP Network Requests on Android Pie"
summary: "Android Pie only allows HTTPS traffic by default & blocks all HTTP requests. You can enable HTTP communication for your API endpoints once you have configured this little thing."
date: 2019-04-07 12:00:00 +0530
redirect_from:
  - "/android/2019/04/07/http-network-requests-on-android-pie.html"
categories:
  - "android"
---

Recently when I started work on a new app for my company I noticed that all of my requests were being rejected before even reaching the server. This was a problem I was facing only on the emulator and not on the Nexus 5 I had for physical testing. I searched on the Internet a bit and found out that Android Pie has disabled cleartext network traffic by default.

I found 2 solutions for this. You can either enable cleartext traffic from your app for specific domains or you can set it for all the domains.

## Enabling cleartext traffic for all domains (discouraged due to being less secure)

Add this attribute to the `<application>` tag in your `AndroidManifest.xml`

```xml
android:usesCleartextTraffic="true"
```

This will enable app-wide cleartext traffic for any and all domains to which your app makes a request.

This is discouraged as you don't specifically allow only the domains that require cleartext.

## Enabling HTTP requests for specific domains (go for this one if you can)

You first need to create a file named `network_security_config.xml` file inside your `res/xml` directory. The file contents should be as below

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">example-domain.com</domain>
    </domain-config>
</network-security-config>
```

You need to replace `example-domain.com` with the domain for which you want to enable http traffic. If you want to enable http for more than one domains then add relevant `<domain>` tags for each.

Then you need to specify this file in your `AndroidManifest.xml` as below:

```xml
...
<application
    ...
    android:networkSecurityConfig="@xml/network_security_config">
...
```

## That's all folks

I faced this issue at work and now I am writing about it so others (and also me) can benefit from it in future. If you have more such ideas/examples or any other suggestions  under the sky, [contact me][varun-contact] or tweet to me [@varun_barad][varun-twitter].

[varun-contact]: https://varunbarad.com/contact
[varun-twitter]: https://twitter.com/varun_barad
