(function(global){'use strict'
  console.log = function(){
    document.write.apply(document, [].slice.call(arguments).concat(["<br/>"]));
  };
  Function.prototype.extend = function(props){
    var Super = this; //父类构造函数

    //父类原型
    var TmpCls = function(){

    }
    TmpCls.prototype = Super.prototype;

    var superProto = new TmpCls();

    //父类构造器wrapper
    var _super = function(){
      return Super.apply(this, arguments);
    }

    var Cls = function(){
      if(props.constructor){
        //执行构造函数
        props.constructor.apply(this, arguments);
      }
      //绑定 this._super 的方法
      for(var i in Super.prototype){
        _super[i] = Super.prototype[i].bind(this);
      }
    }
    Cls.prototype = superProto;
    Cls.prototype._super = _super;
    
    //复制属性
    for(var i in props){
      if(i !== 'constructor'){
        Cls.prototype[i] = props[i];
      }
    }  

    return Cls;
  }

  function Animal(name){
    this.name = name;
  }

  Animal.prototype.sayName = function(){
    console.log('My name is '+this.name);
  }

  var Programmer = Animal.extend({
    constructor: function(name){
      this._super(name);
    },
    sayName: function(){
      this._super.sayName(name);
    },
    program: function(){
      console.log("I'm coding...");
    }
  });
  //测试我们的类
  var animal = new Animal('dummy'),
      akira = new Programmer('akira');
  animal.sayName();//输出 ‘My name is dummy’
  akira.sayName();//输出 ‘My name is akira’
  akira.program();//输出 ‘I'm coding...’
})(this);
