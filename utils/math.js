export function fibonacciSeries(n) {
  let arr = [0, 1];
  for (let i = 2; i < n; i++) {
    arr.push(arr[i - 1] + arr[i - 2]);
  }
  return arr.slice(0, n);
}

export function primeFilter(nums) {
  function isPrime(x) {
    if (x < 2) return false;
    for (let i = 2; i <= Math.sqrt(x); i++)
      if (x % i === 0) return false;
    return true;
  }
  return nums.filter(isPrime);
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

export function hcfArray(arr) {
  return arr.reduce((a, b) => gcd(a, b));
}

export function lcmArray(arr) {
  function lcm(a, b) {
    return (a * b) / gcd(a, b);
  }
  return arr.reduce((a, b) => lcm(a, b));
}
