function add(x,y){
  return x + y;
}
function mul(x,y){
  return x * y;
}
function cat(x,y){
 return x.toString() + y.toString();
}
function multilize(op){
  return function(){
    var args = [].slice.call(arguments);
    return args.reduce(function(x,y){
      return op(x,y);
    });
  }
}
var addAll = multilize(add);
var mulAll = multilize(mul);
var catAll = multilize(cat);

console.log(addAll(3,4,5,6));
console.log(mulAll(1,2,5,6));
console.log(mulAll(1,3,5,6));
console.log(catAll(1,4,5,6));
