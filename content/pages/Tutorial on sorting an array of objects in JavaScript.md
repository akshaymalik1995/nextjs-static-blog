---
title : Tutorial on sorting an array of objects in JavaScript
date : 2023-06-01 04:11
tags : 
- javascript
---

## Introduction

In this tutorial, we will discuss how to sort an array of objects in JavaScript using the `Array.sort()` method and providing a comparison function that determines the order of the objects.

First, let's create an array of objects:

```js
const employees = [
  { firstName: 'John', lastName: 'Doe', age: 27, joinedDate: 'December 15, 2017' },
  { firstName: 'Jane', lastName: 'Doe', age: 32, joinedDate: 'January 1, 2018' },
  { firstName: 'Mike', lastName: 'Johnson', age: 27, joinedDate: 'February 1, 2018' },
];

```

Now, let's sort this array by the `age` property in ascending order:

```js
employees.sort((a, b) => a.age - b.age)
```


You can also sort the array in descending order by changing the order of subtraction:

```js
exmployees.sort((a , b) => b.age - a.age)
```

If you want to sort the array by a different property, such as `lastName`, you can modify the comparison function accordingly:

```js
employees.sort((a , b) => {
	const lA = a.lastName.toUpperCase()
	const lB = b.lastName.toUpperCase()
	if (lA < lB) return -1
	if (lA > lB) return 1
	return 0
})
```

## How does it work?

The `Array.prototype.sort()` method sorts the elements of an array in place and returns aa reference to the same array, now sorted. 

When the `sort()` method compares two values, it sends the values to the compare function, and sorts the values according to the returned (negative, zero, positive) value. If the result is negative, `a` is sorted before `b`. If the result is positive, `b` is sorted before `a`. If the result is zero, no changes are done with the sort order of the two values.

The `sort()` method accepts a compare function as an argument, which you can define to customize the sorting logic based on your requirements. The compare function should take two arguments, usually denoted as `a` and `b`, and return a positive, negative, or zero value depending on the desired order.

## Conclusion

In conclusion, the `sort` method works by converting the array elements into strings and comparing their sequences of UTF-8 code unit values. 


