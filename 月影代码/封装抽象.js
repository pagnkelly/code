function double(x){
  return x * 2;
}

function add(x, y){
  return x + y;
}

function listize(fn){
  return function(arg){
      var list = [].slice.call(arg);
        var rest = [].slice.call(arguments,1);

        return list.map(function(o){
          return fn.apply(this, [o].concat(rest));
        });
    }
}

var addAll = listize(add);

console.log(addAll([1,2,3,4], 3));

function setColor(el, color){
  el.style.color = color;
}

var els = document.querySelectorAll('ul li');

var setColorAll = listize(setColor);
setColorAll(els, 'red');

