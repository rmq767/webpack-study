// import '@babel/polyfill'

function add(x, y) {
  return x + y
}
// 下一行所有规则失效
// eslint-disable-next-line
console.log(add(1, 2))

const promise = new Promise((res) => {
  setTimeout(() => {
    console.log('object')
    res()
  }, 1000)
})
console.log(promise)
