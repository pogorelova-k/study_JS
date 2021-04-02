
let num = 266219;
let result = 1;

while (num > 0) {
    result = result * (num % 10);
    num =  Math.trunc(num/10);
    continue;
}

console.log(result);