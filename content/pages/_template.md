---
title: This is a demo title
date: 2020-12-31 16:00:00
description: This is a demo description
tags: 
    - "tag1"
    - "tag2"
---

## This is a demo content

### Content

Please write your content in markdown format. The title and description are not included in the content. To avoid the title being included in the content, start your content with a level 2 heading (##).

> Do not include markdown in the headings.

### Front Matter
The metadata of the page is stored in the front matter. The front matter is a YAML block delimited by `---`. The front matter must be at the top of the file and must be followed by a blank line. There should not be a blank line before the front matter.

The name of the file will be used as a slug. Do not change it. 


### Title

The title is a required field. Enclose the title in double quotes if it contains special characters.

### Date

The date is a required field and should be in the format of YYYY-MM-DD HH:MM:SS. Posts shall be sorted by date in descending order. 

### Description

The description is an optional field. Enclose the description in double quotes if it contains special characters. Avoid using special characters in the description.
The description is not converted to HTML and is used as is.

### Tags

The tags are optional and should be in the format of a list of strings separated by a comma.


### Build Data

To build the data, please run the command `npm run build-data`.
