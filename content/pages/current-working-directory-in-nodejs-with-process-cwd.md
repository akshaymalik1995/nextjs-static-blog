---
title : "Getting current working directory in Node.js with process.cwd()"
tags : ["nodejs", "javascript"]
date : 2023-05-31 16:32
description : "process.cwd() is a method in the Node.js process module that returns the current working directory of the Node.js process."
---

## process.cwd()

`process.cwd()` is a method in the Node.js process module that returns the current working directory of the Node.js process. The method does not take any parameters. 

The difference between `process.cwd()` and `__dirname` is that `process.cwd()` returns the current working directory of the process, while `__dirname` returns the directory name of the current module or file. `__dirname` is a property of the module, whereas `process.cwd()` is a method of the global `process` object. 

Here are some use cases and examples of how to use `process.cwd()`:

- To print the current working directory of the Node.js process, you can simply call `process.cwd()`:

```javascript
console.log(process.cwd());
```

- To change the current working directory of the Node.js process, you can use the `process.chdir(directory)` method. This method changes the current working directory to `directory`.

```javascript
process.chdir('/tmp');
console.log(process.cwd());
```

- You can use `process.cwd()` to create file paths relative to the current working directory of the Node.js process. For example:

```javascript
const path = require('path');

const filePath = path.join(process.cwd(), 'data', 'file.txt');
console.log(filePath);
```

This will print the file path `/path/to/current/working/directory/data/file.txt`.

Note that `process.cwd()` returns the current working directory of the Node.js process, which may not necessarily be the same as the directory where the Node.js script is located. To get the directory where the script is located, you can use `__dirname`.

```javascript
console.log(__dirname);
```

This will print the directory where the script is located.

Overall, `process.cwd()` is a useful method for working with file paths and changing the current working directory of the Node.js process. 

Sources:
- [GeeksforGeeks](https://www.geeksforgeeks.org/node-js-process-cwd-method/)
- [Stack Overflow](https://stackoverflow.com/questions/9874382/whats-the-difference-between-process-cwd-vs-dirname)
- [LogRocket](https://blog.logrocket.com/understanding-using-globs-node-js/)
- [Baeldung](https://www.baeldung.com/linux/find-working-directory-of-running-process)