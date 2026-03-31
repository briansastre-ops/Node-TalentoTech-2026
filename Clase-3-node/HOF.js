function calculator(a, b, operation) {
    return operation(a, b);
}

console.log(calculator(2, 3, (x, y) => x + y));
console.log(calculator(2, 3, (x, y) => x - y));
console.log(calculator(2, 3, (x, y) => x * y));
console.log(calculator(2, 3, (x, y) => x / y));   