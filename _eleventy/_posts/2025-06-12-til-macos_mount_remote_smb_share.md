---
tags:
  - post
layout: post
title: "📝 Mount an SMB share on Mac OS using Rust"
summary: "TIL: How to mount an SMB share on Mac OS programmatically using Rust"
date: 2025-06-15T08:16:58+0530
categories:
  - "til"
  - "programming"
---

Just as before, while working on my last project ([valet](./project-valet)) I learned something new. I wanted to mount a remote SMB share from my NAS onto my laptop as that shared storage is where I eventually want to store all my files once they are cleaned-up and sorted appropriately. I know how to do that using Finder but this time I needed to do it from inside a program.

> Aside: I think I should stop writing this under a TIL because at the time I am writing this, it has been more than 3 weeks since I learned how to do this.

### The AppleScript way

Previously I have mounted the same share using AppleScript. The share URL follows this pattern `smb://<username-on-server>@<name-of-server>/<name-of-shared-folder>`, and the whole command goes something like this:

```applescript
mount volume "smb://varun@ella/Legal Documents"
```

This would automatically use the stored password from my Keychain. But the problem here was that I needed to run it from inside a rust program which does not directly run apple-script but can run shell-scripts. To execute the above as a shell-script I need to pass it to the `osascript` program like this:

```shell
osascript -e 'mount volume "smb://varun@ella/Legal Documents"'
```

> Aside: As I am writing this next section, it comes to my mind that I could have made it work with just this setup and that would have simplified my work a lot. I then would not have had to figure out how to access the Keychain or how to properly escape these paths. But alas, that is the life of a programmer 😅

Here, to ensure that the full directory name "Legal Documents" is parsed correctly, we had to put the complete share URL inside double-quotes. And then to ensure the complete apple-script is parsed correctly, we had to put that inside another pair of single-quotes.

### The shell-script way

The underlying program to use in a shell-script would be `mount_smbfs` which takes two arguments:

- Complete URL of the remote-share which is built of below four parts and formatted like this `//u:p@s/f`
  - `u`: Username on server
  - `p`: Password of the above username on server
  - `s`: Name/Network-address of the server
  - `f`: URL-escaped name of the shared folder
- Directory (ensure it is empty) on your local machine where to mount the share

The invocation for that goes like:

```shell
mount_smbfs "//varun:some-password@ella/Legal%20Documents" "/Volumes/Legal Documents"
```

Here we get control over where the shared folder gets mounted locally, but now we have to supply the password ourselves (here's how to [get it from Keychain](./til-read-smb-share-password-from-macos-keychain)).

### Using the `mount_smbfs` command from Rust

Now we can use `Command` from rust's standard-library to call `mount_smbfs` and mount the share. For that we need to ensure that all the components are appropriately escaped to form a proper URL. To do that we use the [`url` crate](https://crates.io/crates/url). Here's how we do that:

```rust
fn get_storage_mount_path_remote(
    username: &str,
    password: &str,
    server_name: &str,
    shared_folder_name: &str,
) -> String {
    let encoded_password = form_urlencoded::byte_serialize(password.as_bytes()).collect::<String>();
    let actual_url = format!("//{}:{}@{}/{}", username, encoded_password, server_name, shared_folder_name);
    let prefixed_url = format!("https:{}", actual_url);
    let parsed_url = Url::parse(prefixed_url.as_str()).unwrap();

    return parsed_url
        .to_string()
        .strip_prefix("https:")
        .unwrap()
        .to_string();
}
```

We need to:

1. First encode the password using [`form_urlencoded` crate](https://crates.io/crates/form_urlencoded) (a dependency of the `url` crate) to ensure proper escaping of it
2. Form the whole URL and prefix it with a protocol (any protocol should work) at the beginning, we use `https` here. This is because the `Url::parse` method expects a complete URL and a complete URL needs to have a protocol
3. Convert the `Url` object to its string representation and strip the protocol prefix from it

And using that cleaned-up URL we can then go and invoke the `mount_smbfs` command like this:

```rust
// Ensure there is a directory created where we want to mount the SMB share
std::fs::create_dir_all(Path::new(storage_mount_path_local)).unwrap();
Command::new("mount_smbfs")
    .arg(storage_mount_path_remote.as_str())
    .arg(storage_mount_path_local.as_str())
    .output()
    .unwrap();
```

## Articles related to project valet

1. [Project valet announcement](./project-valet)
2. [Read SMB share password from MacOS Keychain](./til-read-smb-share-password-from-macos-keychain)
3. [Rust read build-time environment variables at run-time](./til-rust-build-time-env-vars)
4. Mount an SMB share on Mac OS using Rust (this article)
