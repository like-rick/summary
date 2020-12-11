const thunkify = require('./thunk');
function square(num, callback) {
  setTimeout(() => {
    callback && callback(null , num * num);
  }, 1000)
}
const thunkSquare = thunkify(square);
var gen = function* (){
  var r1 = yield thunkSquare(1);
  console.log(r1.toString());
  var r2 = yield thunkSquare(2);
  console.log(r2.toString());
};

function run (fn) {
  var g = fn();
  function next(err, data){
    var result = g.next(data);
    if (result.done) return;
    result.value(next); 
  }
  next();
}
run(gen)

