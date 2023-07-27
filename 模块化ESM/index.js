// 导入其他模块
// import 模块名 from '模块的路径'
// import {num} from './a.js'
import user,{num,a} from './a.js'

// import {num as num2} from './b.js'
import {name as name2,age,gender,info} from './b.js'
import * as Modb from './b.js'

// let {name,age} = Modb;

console.log(num,a)
// console.log(num2)

console.log(user);

// console.log(name);
// info()


console.log(Modb);
console.log(Modb.name)
Modb.info()
