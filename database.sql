--A SQL file is ready to be run for use in databases other than those in the program

CREATE DATABASE IF NOT EXISTS moveo_task;

USE moveo_task;

CREATE TABLE code_blocks (
                             id INT AUTO_INCREMENT PRIMARY KEY,
                             title VARCHAR(255),
                             code TEXT,
                             solution TEXT
);

INSERT INTO code_blocks (title, code, solution) VALUES
                                                    ('Find the Nth Fibonacci Number', 'function findNthFibonacci(n) {\n    // Your code here\n}', 'function findNthFibonacci(n) {\n    if (n <= 1) return n;\n    return findNthFibonacci(n - 1) + findNthFibonacci(n - 2);\n}'),
                                                    ('Check Palindrome', 'function isPalindrome(str) {\n    // Your code here\n}', 'function isPalindrome(str) {\n    return str === str.split("").reverse().join("");\n}'),
                                                    ('Calculate Factorial', 'function calculateFactorial(n) {\n    // Your code here\n}', 'function calculateFactorial(n) {\n    if (n === 0) return 1;\n    return n * calculateFactorial(n - 1);\n}'),
                                                    ('Merge Two Sorted Arrays', 'function mergeSortedArrays(arr1, arr2) {\n    // Your code here\n}', 'function mergeSortedArrays(arr1, arr2) {\n    let mergedArray = [];\n    let i = 0, j = 0;\n\n    while (i < arr1.length && j < arr2.length) {\n        if (arr1[i] <= arr2[j]) {\n            mergedArray.push(arr1[i]);\n            i++;\n        } else {\n            mergedArray.push(arr2[j]);\n            j++;\n        }\n    }\n\n    while (i < arr1.length) {\n        mergedArray.push(arr1[i]);\n        i++;\n    }\n\n    while (j < arr2.length) {\n        mergedArray.push(arr2[j]);\n        j++;\n    }\n\n    return mergedArray;\n}')
;
