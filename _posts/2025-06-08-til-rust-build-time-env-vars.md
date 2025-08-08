---
tags:
  - post
layout: post
title: "📝 Rust read build-time environment variables at run-time"
summary: "TIL: How to read in a rust program at run-time the environment variables that were only defined at build-time"
date: 2025-06-08T19:24:15+0530
categories:
  - "til"
  - "programming"
---

When building [valet](./project-valet) I required a couple pieces of configuration values but didn't want to read them from a file and didn't want them to be forever present in my environment variables so that I can read from there on runtime. Neither did I want to put them in code anywhere, so I looked for if there was a way where I read a value from somewhere (environment variable in this case) at compile-time and then use that value during run-time without needing to have that source available at run-time.

That's where I first encountered how to configure your build process using `build.rs`. So let's take this example that you need to read `VALET_CONFIG_SOMETHING` environment variable at build-time and then have its value available at run-time you need to put this in your `build.rs`.

```rust
fn main() {
    let compile_time_config = std::env::var("VALET_CONFIG_SOMETHING").expect("Please provide config");
    println!("cargo:rustc-env=CONFIG_SOMETHING={}", compile_time_config);

    // Rebuild when these change
    println!("cargo:rerun-if-changed=build.rs");
    println!("cargo:rerun-if-env-changed=VALET_CONFIG_SOMETHING");
}
```

And then to use it in your program you need to do something like this:

```rust
fn main() {
    println!("Config found at run-time: {}", env!("CONFIG_SOMETHING"));
}
```

To ensure cargo uses your build-script, you need to add this line to your `Cargo.toml`:

```toml
build = "build.rs"
```

Then you need to ensure that the variable is available at build-time:

```shell
$ VALET_CONFIG_SOMETHING="A value for config" cargo build
Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.00s
```

And then check that the value is available later at run-time:

```shell
$ ./target/debug/valet
Config found at run-time: A value for config
```

## Articles related to project valet

1. [Project valet announcement](./project-valet)
2. [Read SMB share password from MacOS Keychain](./til-read-smb-share-password-from-macos-keychain)
3. Rust read build-time environment variables at run-time (this article)
4. [Mount an SMB share on Mac OS using Rust](./til-macos_mount_remote_smb_share)
