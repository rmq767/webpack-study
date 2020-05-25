import '../css/index.css';
import { mul } from './test';

function sum(x, y) {
  return x + y;
}
// eslint-disable-next-line
console.log(sum(1, 3))
// eslint-disable-next-line
console.log(mul(1, 3))

/*
1. eslint不认识window、navigator全局变量
解决:需要修改package. json中eslintConfig配置
  "env": {
    "browser": true //支持浏览器端全局变量
  }
  2.sw代码必须运行在服务器上
    --> nodejs
    npm i serve -g
    serve -s build启动服务器，将build目录下所有资源作为静态资源暴露出去

*/

// 注册serviceworker
// 处理兼容性问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('sw注册成功了~');
      })
      .catch(() => {
        console.log('sw注册失败了~');
      });
  });
}
