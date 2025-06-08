---
tags:
  - post
layout: post
title: "🗃️ My valet parks my files for me"
summary: "I finally stitched-together a valet to process and park various files from my inbox to their respective destinations"
date: 2025-05-04T11:59:13+0530
categories:
  - "valet"
  - "rust"
  - "tools"
  - "programming"
---

I was increasingly getting annoyed by having to handle various filing tasks and was looking for a way to automate it. The two most regular and straight-forward ones to handle were my credit-card statements as they came monthly and had a bunch of steps (listed below) that needed to be followed for each one:

- Download the statement PDF from email
- Decrypt it using the appropriate password
- Save the decrypted version so that I don't have to fuss with that password in the future
- Rename the file to reflect statement date
- Connect to my NAS and locate/create the appropriate folder for that statement
- Copy the statement to NAS directory
- Delete the files from my local machine

Since this was a long process it regularly got pushed back and when once automated had a high-probability of both reducing my cognitive/time burden as well as chances of human-errors in the process.

And thus emerged [valet](https://github.com/VarunBarad/valet). Before writing the program I had managed to do a lot of the above tasks using individual commands rather than using any graphical interface, this way I was inching myself toward automating it.

When I first started storing decrypted statements I used to use Mac's Preview utility to open the encrypted PDF file and then print from it to another PDF file thus removing the password encryption from the new PDF. I eventually moved to using the nifty little program called `qpdf` to remove this encryption.

```shell
qpdf --decrypt --password="your password here" /path/to/encrypted.pdf /path/to/store/decrypted.pdf
```

To mount my NAS to my local machine I needed to open it in Finder which would in-turn mount it and thus I would be able to transfer files to/from it. I learnt of an applescript command `mount volume` which can be used to mount SMB shares which can then be used for file-transfer. Eventually in `valet` I had to use a different (non-applescript) command `mount_smbfs` to achieve the same thing.

```applescript
# The applescript way
on run argv
	try
		mount volume "smb://varun@delphinus/Legal Documents"
	on error
		return false
	end try
	return true
end run
```

```shell
# The normal shell way
# Ensure the directory `/Volumes/Legal Documents` exists and is empty
mount_smbfs "//varun@delphinus/Legal%20Documents" "/Volumes/Legal Documents"
```

I had atleast two things which I had not foreseen that I would end up learning:

- Accessing password(s) from Mac's Keychain Access programmatically. I ended up learning both how to do it from terminal and from within a rust program.
- Using a custom build-script to access variables in my rust program at run-time whose values were passed as environment variables at compile-time.

I would write about both of those in coming days.

Some other things which I sort of expected to learn and actually ended up learning were:

- How to run shell commands from within a rust program
- Encoding both parts for a URL and the complete URL to ensure no non-permitted character messes up the mounting URL for SMB share
- Finding files in rust from a directory based on the filename matching a regex
- Date-time parsing/handling in rust

The current version of valet only handles a couple of my credit card statements but already some other things are coming to my mind which I can slowly take on and move to automate with valet.

- The bills that I create for my consulting clients
- Some of the bills that I receive (for example from my ISP)

## Articles related to project valet

1. Project valet announcement (this article)
2. [Read SMB share password from MacOS Keychain](./til-read-smb-share-password-from-macos-keychain)
