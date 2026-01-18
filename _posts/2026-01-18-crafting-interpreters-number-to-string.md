---
tags:
  - post
layout: post
title: "Implementing number_to_string native function"
summary: "Throwing runtime exception/error from native functions in Lox"
date: 2026-01-18T16:17:06+0530
categories:
  - "crafting-interpreters"
---

I am working my way through Crafting Interpreters and wanted to be able to concatenate numbers with strings so that I can print something like below:

```lox
for (var i = 0; i < 10; i = i + 1) {
    print "Iteration number " + i + ": " + fibonacci_term(i);
}
```

The way we've implemented the language up to this point requires both operands of the `+` operator to either be numbers or strings, it cannot process a combination of number and string. Rather than extending the `+` operator to deal with that scenario, I decided to add function `number_to_string` to allow me to convert any number anywhere to a string.

At this point in the book we had already defined a native function called `clock` and decided I would do the same thing for `number_to_string`. Here's how the existing `clock` native function looks:

```java
// Definition of the native function `clock`
package com.varunbarad.lox;

import java.util.List;

public class NativeFunctionClock implements LoxCallable {
    @Override
    public int arity() {
        return 0;
    }

    @Override
    public Object call(Interpreter interpreter, List<Object> arguments) {
        return (double) System.currentTimeMillis() / 1000.0;
    }

    @Override
    public String toString() {
        return "<native fn clock>";
    }
}
```

`clock` function didn't take any parameters but `number_to_string` takes one parameter, and I needed to ensure that only numbers are passed to it. So in this case I had to throw a runtime exception from inside the native function's `call` method.

The problem is, that inside the function call, we did not have access to the token which marks the start of that function call and the `RuntimeError` class (as shown below) requires one.

```java
// The custom exception we throw if we encounter a runtime problem in the lox program
package com.varunbarad.lox;

public class RuntimeError extends RuntimeException {
    final Token token;

    RuntimeError(Token token, String message) {
        super(message);
        this.token = token;
    }
}
```

I thought of a few options of how to tackle that:

1. Throw an `IllegalArgumentException` from inside the `call` method and catch it in our `Interpreter` class, and then throw the `RuntimeError` from there.
2. Drop the requirement for `Token` from `RuntimeError`. This was a silly idea, and I immediately shot it down.
3. Pass the token which starts that function call inside the `call` method of `LoxCallable`.

Going with Option 1 would tightly couple the interpreter to each native function's specific errors. It would mean that the interpreter would need to be updated for any more functions (and the errors that they throw) I decide to add in the future.

Option 2 was dead-on-arrival as we'd lose valuable debugging information that helps us locate errors in the code.

Finally, going with option 3 I can keep error handling self-contained within each native function while preserving the full error context. Here's the updated `LoxCallable` interface:

```diff-java
package com.varunbarad.lox;

import java.util.List;

public interface LoxCallable {
    int arity();

-    Object call(Interpreter interpreter, List<Object> arguments);
+    Object call(Token paren, Interpreter interpreter, List<Object> arguments);
}
```

Now from withing the body of `call` I can throw an instance of `RuntimeError` with all the appropriate details. Here is the final implementation of `number_to_string`:

```java
// Definition of the native function `number_to_string`
package com.varunbarad.lox;

import java.util.List;

public class NativeFunctionNumberToString implements LoxCallable {
    @Override
    public int arity() {
        return 1;
    }

    @Override
    public Object call(Token paren, Interpreter interpreter, List<Object> arguments) {
        Object arg = arguments.getFirst();
        if (arg instanceof Double) {
            return Double.toString((double) arg);
        } else {
            throw new RuntimeError(paren, "Argument must be a number, received: " + arg.toString());
        }
    }

    @Override
    public String toString() {
        return "<native fn number_to_string>";
    }
}
```

Finally, register it in the Interpreter constructor: 

```diff-java
// Registering `number_to_string` in the Interpreter constructor
-public Interpreter() {
-    globals.define("clock", new NativeFunctionClock());
-}
+public Interpreter() {
+    globals.define("clock", new NativeFunctionClock());
+    globals.define("number_to_string", new NativeFunctionNumberToString());
+}
```

Here is the original lox sample updated to use `number_to_string`:

```lox
for (var i = 0; i < 10; i = i + 1) {
    print "Iteration number " + number_to_string(i) + ": " + number_to_string(fibonacci_term(i));
}
```

This now produces the output I was looking for, with iteration numbers and Fibonacci values neatly presented in a single line.

### References

1. Crafting Interpreters by Robert Nystrom: [https://craftinginterpreters.com](https://craftinginterpreters.com)
