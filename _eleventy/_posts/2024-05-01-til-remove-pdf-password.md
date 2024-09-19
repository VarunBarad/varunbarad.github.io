---
tags:
  - post
layout: post
title: "📝 Remove password from PDF files using qpdf"
summary: "TIL: If you know the password then you can remove it from PDF files using qpdf"
date: 2024-05-02T00:28:40+0530
categories:
  - "til"
---

Sometimes you get PDF files which have password on them. You know the password right now but want to store those files in your archive and don't want to remember their passwords. One way to do it is using the tool called [qpdf](https://github.com/qpdf/qpdf)


```shell
qpdf --decrypt --password="<your-password-goes-here>" "<input-file-name>" --replace-input
```

Note: This will replace your existing input file, so please make a copy of the file before running this command. If you want to store the output in a different file then use below command:

```shell
qpdf --decrypt --password="<your-password-goes-here>" "<input-file-name>" "<output-file-name>"
```

References: [Carlos Delgado](https://ourcodeworld.com/articles/read/937/how-to-remove-the-password-of-a-pdf-using-the-qpdf-cli)
