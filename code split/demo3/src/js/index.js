function sum(x, y) {
  return x + y;
}
// eslint-disable-next-line
console.log(sum(1, 3));

/* 
通过js代码，让某个文件被单独打包成一个chunk
import动态导入语法:能将某个文件单独打包
*/

import( /* webpackChunkName:'test' */ './test')
  .then(({
    mul
  }) => {
    //文件加载成功~
    // eslint-disable-next- line
    console.log(mul(2, 5));
  })
  .catch(() => {
    // eslint-disable-next-line
    console.log('文件加载失败~');
  });