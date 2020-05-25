import '../css/iconfont.css';
import '../css/index.less';


function add(x, y) {
  return x + y;
}

console.log(add(1, 2));

// if (module.hot) {
//   module.hot.accept('xxx'),
//     function () {
//       // 方法会监听 xxx 文件的变化，一旦发生变化，其他模块不会重新打包构建，
//       // 会执行后面的函数
//       xxx();
//     };
// }