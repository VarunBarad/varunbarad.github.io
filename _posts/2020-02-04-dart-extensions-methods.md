---
layout: post
title: "Dart Extension Methods"
summary: "An overview of extension methods in Dart and how they can be useful"
date: 2020-02-04 12:00:00 +0530
categories:
  - "flutter"
  - "dart"
  - "programming"
---

![Article Header - Dart Extension Methods]({{ site.url }}/assets/images/posts/headers/dart-extension-methods.png)

Welcome devs, have you tried your hands at extensions methods? Dart recently announced support for extension methods (from Dart 2.7) and extension properties.

Extension methods are a way to add functionality to existing libraries. When you are using someone else's library it's often impractical/impossible to change the API. But you can _extend_ it using extension methods.

## What are extension methods?

Consider the following code that parses a string into an integer:

```dart
int.parse('42')
```

Won't it look cleaner/better if this functionality was available on `String` class like below?

```dart
'42'.parseInt()
```

Since the language (where class `String` comes from) doesn't provide such a method we can't parse a string to an int like that. Extension methods allow us to specify such custom functionalities not provided by the library (Dart language in this case). Let's see how to do that in next section.

## Writing a basic extension method

So we want to have a method `parseInt` __on__ `String` class which would parse the given string to integer.

```dart
'42'.parseInt()
```

For that we will define an extension method on `String` like this

```dart
// File: extension_methods.dart
extension StringExtras on String {
    int parseInt() {
        return int.parse(this);
    }
    // We can also define getters as extensions
    int get doubleLength => length * 2;
}
```

Here we have named this set of extension methods as `StringExtras`, you can name them anything you like.

__Note:__ As you might have noticed above, we can define multiple extension methods/getters under a single extension block.

## Using the extension method

Extension methods (once imported) can be used just like any member method on that class's object. Our example would go like this

```dart
import 'extension_methods.dart';

void main() {
    print('42'.parseInt() + 8); // Would print 50
}
```

Similarly we can use the getters too

```dart
import 'extension_methods.dart';

void main() {
    print('42'.doubleLength); // Would print 4
}
```

## Important Notes

1. Extension methods _don't_ work with the type `dynamic`. However they _do_ work with Dart's type inference.
2. Since extension methods are resolved statically, they're as fast as calling a static function.
3. Extension methods can't access private members of the class.
4. If an extension member has a name conflict then you should refer [here](https://dart.dev/guides/language/extension-methods#api-conflicts) for your options.
5. You can define extension methods on classes which take generic type parameters (for example `List<T>`). Refer [this section](https://dart.dev/guides/language/extension-methods#implementing-generic-extensions) for further details.

## Reference

[Official release documentation - https://dart.dev/guides/language/extension-methods](https://dart.dev/guides/language/extension-methods)

Want to discuss this or any other interesting thing, hit me up on Twitter [@varun_barad](https://twitter.com/varun_barad).
