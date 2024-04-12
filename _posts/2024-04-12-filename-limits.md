---
layout: post
title: "🗂 Filenames can't just be anything"
summary: "There are limitations on how long a filename can be or even what characters it can contain. And they differ across different filesystems."
date: 2024-04-12 09:01:19 +0530
categories:
  - "computers"
---

In my forever effort to organise my family's media collection on my NAS, I came across a file which I couldn't copy over from my laptop to the NAS. The error message said that either the file-name was too long for the destination or the name contained invalid characters which were not supported by the target. For context, this was the name of that file:

```text
उत्तर रामायण - EP 08 - रामराज्य में संत संगमन। गुप्तचर द्वारा राजा राम को पीड़ित स्त्री की सूचना देना।.mp4
```

## It has to be the Unicode characters

Seeing as the filename contained Devanāgari (the script which language Hindi is written in) characters which exist in Unicode but not in ASCII, and it was being copied over from a Mac machine to a Synology NAS, my first thought was that it must be that Unicode is not supported on the target system.

I knew that Samba was a very popular network file-sharing protocol and assumed that that was what my NAS was using so started looking up any restrictions that it has on what characters can/cannot be part of a filename. Since it is very popular for working with Windows machines I also looked up the restrictions for NTFS filesystem too. I came across [this answer](https://superuser.com/a/1699196) (which links to an awesome documentation page by Microsoft) on SuperUser (a cousin site of StackOverflow). That did not help as none of the characters listed as restricted there were present in my filename.

## Could it be the length?

This is when my attention turned towards the possibility that it could be that the filename was too long for the target. When I started looking that up for APFS (filesystem on my Mac machine) and for NTFS it was 255 Unicode characters on APFS and 255 UTF-16 code units on NTFS. Since the filename was 106 characters long, that couldn't be the issue either. Just to be sure I made a copy of the file locally and renamed it to `aaaaaaaaaa…a.mp4` (there are 106 `a` in there) and tried copying it over to the NAS. It worked! So somehow the length of the filename did not appear to be the issue here.

## All Unicode characters aren't measured the same

Then I thought it might be that since each Unicode character can be anywhere from 1 to 4 bytes long, the filename might be too long in bytes. I checked using Python and found that the filename was indeed 260 bytes long. That felt like I was getting closer to the actual issue. Then I made a copy of the file locally and tried renaming it to `aaaaaaaaaaaaaa…a.mp4` (there are 255 `a` in there) and Mac wouldn't let me do that. Turns out I forgot to account for the `.mp4` extension, so I removed 4 `a` from the name and now it let me rename the file. I tried copying this file over to the NAS and it worked! So the issue was indeed that the filename was too long in bytes.

Now the confusion was why did MacOS not let me rename the file to a string longer than 255 bytes while it originally already has a filename which was 260 bytes long? The light-bulb went off at that time that it was because the original name even though being longer than 255 bytes was actually only 106 Unicode characters long (thus being well under the limit) but the name I was trying to rename it to was not only longer than 255 bytes but also longer than 255 Unicode characters therefore MacOS wouldn't let me do that.

## The final piece of the puzzle

At this point I actually went ahead and checked what filesystem my NAS was running and lo-and-behold it wasn't NTFS, when setting it up initially I had configured it to run Btrfs where the maximum permitted filename length is 255 bytes. Now all the pieces fell into place, while the filename was well under the limit for APFS (255 Unicode characters) it was too long for Btrfs (255 bytes). Even though now I had to think of another naming convention for this whole show/series, I was relieved to have finally figured out what the issue was.

## My feelings

I would say this is one place where I like Apple's choice more than the other popular Unix/Linux filesystems, none of the ext* or Btrfs or ZFS filesystems have a limit on the number of Unicode characters in a filename, they all have a limit on the number of bytes in a filename. Folks much smarter than me have written those filesystems and they must have had their reasons for choosing this way, but I feel as an end-user that it makes more sense to have a limit that applies so that two files with similarly long looking filenames are either both valid or both invalid.

## References

- [SuperUser: Which Unicode characters cannot be used for NTFS file names?](https://superuser.com/a/1699196)
- [Microsoft: Naming Files, Paths, and Namespaces](https://learn.microsoft.com/en-us/windows/win32/fileio/naming-a-file#naming-conventions)
- [SuperUser: What is the maximum length of a filename (APFS)?](https://superuser.com/a/1561487)
- [Wikipedia: Comparison of file systems](https://en.wikipedia.org/wiki/Comparison_of_file_systems#Limits)
- [Wikipedia: UTF-8 Encoding](https://en.wikipedia.org/wiki/UTF-8#Encoding)
