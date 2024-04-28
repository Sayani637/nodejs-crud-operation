// function add(a,b){
//     return a+b;
// }
// var add=function(a,b){
//     return a+b;
// }
// var add = (a,b) => {return a+b;}
// var add = (a,b) => a+b;
// var result=add(444,5);
// console.log(result);

// (function(){
//     console.log('sayani');
// })();

// function callback(){
//     console.log('sayani is start reading node js');
// }
// const add = function(a,b, callback){
//     var result =a+b;
//     console.log('result: ' +result);
//     callback();
// }
// add(3,4, callback);

// const add = function(a,b, callback){
//     var result =a+b;
//     console.log('result: ' +result);
//     callback();
// }
// add(2,3, function(){
//     console.log('add complete');
// });

// add(2,5, () => console.log('add complete'));

// var fs = require('fs');
// var os = require('os');

// var user = os.userInfo();
// console.log(user.username);

// fs.appendFile('greeting.txt', 'Hi ' + user.username + '!\n', ()=>{
//     console.log('file is created');
// });

// console.log(fs);

// const node = require('./node.js');
// var _ = require('lodash');

// console.log('server is aviavble');

// var age = node.age;
// var result = node.addNumber(age+18, 10);
// console.log(age);
// console.log(result);

// var data = ['person', 'person', 1, 2, 5, 7, 'name', 'age', '2'];
// var filter = _.uniq(data);
// console.log(filter);
// console.log(_.isString(4));

// const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
// const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject);

// const objectToConvert = {
//     name: "sayani",
//     age: 28
// };
// const json = JSON.stringify(objectToConvert);
// console.log(json);

const express = require('express')
const app = express();
// app.use(express.json());
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());


const MenuItem = require('./models/Menuitem');


app.get('/', function (req, res) {
  res.send('Welcome to my Hello World')
})

// Import the router files
const personRoutes = require('./routes/personRoutes');
// Use the Routers
app.use('/person', personRoutes);

app.listen(3000, ()=>{
    console.log('listening on port 3000');
})
