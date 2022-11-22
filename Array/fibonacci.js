// 正常的斐波拉契数列js实现方式

const Fibonacci = (n) => {
  if (n <= 1) return 1;
  return  Fibonacci(n - 1) + Fibonacci(n - 2);
}
Fibonacci(10) // 89
Fibonacci(40) // 165580141 计算缓慢有延迟了
Fibonacci(100) // 栈溢出，无法得到结果复制代码


// 使用尾递归优化该方法

const Fibonacci = (n, sum1 = 1, sum2 = 1) => {
  if (n <= 1) return sum2;
  return Fibonacci(n - 1, sum2, sum1 + sum2)
}
Fibonacci(10) // 89
Fibonacci(100) // 573147844013817200000 速度依旧很快
Fibonacci(1000) // 7.0330367711422765e+208 还是没有压力

// 尾递归优化可以在数量较大的计算中，可以起到很好的作用