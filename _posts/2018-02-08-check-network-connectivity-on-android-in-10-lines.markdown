---
layout: post
title:  "Check network connectivity on Android in 10 lines"
date:   2018-02-08 00:00:00 +0530
categories: 
  - "android"
---
Have you ever wanted to show different things to your user based on whether they are connected to the network or not? Well, Android provides a simple way to check for an active network connection.

Note: This is checking whether or not the device is connected to a network (and not whether it is connected to Internet or not).

The way Android provides to check for network connectivity is just 10 lines of code. But me being the lazy coder that I am, I just write that code inside a helper method once and then use that one-line method call everywhere that I need to check for connectivity.

As you can see in the code-block below, it is quite easy to wrap the connectivity check logic in a function.

{% highlight java %}
public class ConnectivityHelper {
  public static boolean isConnectedToNetwork(Context context) {
    ConnectivityManager connectivityManager =
        (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
    
    boolean isConnected = false;
    if (connectivityManager != null) {
      NetworkInfo activeNetwork = connectivityManager.getActiveNetworkInfo();
      isConnected = (activeNetwork != null) && (activeNetwork.isConnectedOrConnecting());
    }
    
    return isConnected;
  }
}
{% endhighlight %}

You also need to have the `ACCESS_NETWORK_STATE` permission added in your manifest like below.

{% highlight xml %}
<manifest ...>
  
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
  <application ...>
    ...
  </application>
</manifest>
{% endhighlight %}

### Done

Now anywhere that you need to check the connection, you only need to

{% highlight java %}
if (ConnectivityHelper.isConnectedToNetwork(context)) {
  //Show the connected screen
} else {
  //Show disconnected screen
}
{% endhighlight %}

## Further reading

The [Official Documentations][android-documentation-connectivity] are a good place to find more about this.

If you know of a better way for this, [contact me][varun-contact] or tweet to me [@varun_barad][varun-twitter]. You can even send me ideas for any other topics that you would like to know about.

[varun-contact]: https://varunbarad.com/contact
[varun-twitter]: https://twitter.com/varun_barad
[android-documentation-connectivity]: https://developer.android.com/training/monitoring-device-state/connectivity-monitoring.html
