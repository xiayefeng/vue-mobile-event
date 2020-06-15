/**
 *  观察者模式
 */

// 定义一个主体对象
class Subject {
  constructor () {
    this.Observer = [];
  }

  add (observer) {
    this.Observer.push(observer);
  }

  remove (observer) {
    this.Observer.filter(item => item === observer);
  }

  notify () {
    this.Observer.forEach(item => {
      item.update();
    });
  }
}

// 定义观察着对象
class Observer {
  constructor (props) {
    this.props = props;
  }

  update () {
    typeof this.props.cb === 'function' && this.props.cb();
  }
}

class MyEvent extends Subject {
  constructor (props) {
    super(props);
    this.tapTime = props.tapTime || 200;
    this.logTapTime = props.logTapTime || 400;
    this.desX = props.desX || 30;
    this.desY = props.desY || 30;
    this.minMoveDes = props.minMoveDes || 50;
    let select = props.select;
    if (typeof select === 'string') {
      this.ele = document.querySelector(select);
    } else if (select instanceof HTMLElement && select.nodeType === 1) {
      this.ele = select;
    } else {
      throw new TypeError('props of select must be string or HTMLElement')
    }
    this.tapLastTime = null;
    if (props.destory && typeof props.destory === 'function') {
      props.destory().then(() => {
        this.notify();
      }).catch(err => {
        console.log(err);
      });
    }
  }
  tap (handler) {
    let startTime, endTime;
    let that = this;
    let touchFn = function (e) {
      e.preventDefault();
      switch (e.type) {
        case 'touchstart':
          startTime = new Date().getTime();
          break
        case 'touchend':
          endTime = new Date().getTime();
          if (endTime - startTime < that.tapTime) {
            if (!that.tapLastTime || endTime - that.tapLastTime > 600) { // 防止重复提交
              that.tapLastTime = +new Date();
              handler.call(this, e);
            }
          }
          break
        default:
          startTime = new Date().getTime();
          break
      }
    };
    this.ele.addEventListener('touchstart', touchFn);
    this.ele.addEventListener('touchend', touchFn);
    let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn);
      this.ele.removeEventListener('touchend', touchFn);
    };
    this.add(new Observer({ cb: observer.bind(this) }));
  }

  longTap (startHandle, endHandle) {
    let startTime, endTime, timerId, startX, startY, endY;
    let isLongPress = false;
    let that = this;
    let touchFn = function (e) {
      e.preventDefault();
      let isMove = Math.abs(e.changedTouches[0].clientX - startX) > that.desX || Math.abs(e.changedTouches[0].clientY - startY) > that.desY;
      switch (e.type) {
        case 'touchstart':
          startTime = new Date().getTime();
          startX = e.changedTouches[0].clientX;
          startY = e.changedTouches[0].clientY;
          timerId = setTimeout(() => {
            startHandle.call(this, e);
            isLongPress = true;
            timerId = null;
          }, that.logTapTime);
          break
        case 'touchmove':
          
          startTime = new Date().getTime();
          if (isMove && !isLongPress) {
            timerId && clearTimeout(timerId);
            timerId = setTimeout(() => {
              startHandle.call(this, e);
              isLongPress = true;
              timerId = null;
            }, that.logTapTime);
          }
          break
        case 'touchend':
          endTime = new Date().getTime();
          endY = e.changedTouches[0].clientY;
          // console.log(endY, startY)
          if (endTime - startTime < that.logTapTime) {
            timerId && clearTimeout(timerId);
          } else if (endHandle && (startY - endY < that.desY)) {
            endHandle.call(this, e);
          }
          // clearTimeout(timerId)
          break
        default:
          clearTimeout(timerId);
          break
      }
    };
    this.ele.addEventListener('touchstart', touchFn);
    this.ele.addEventListener('touchmove', touchFn);
    this.ele.addEventListener('touchend', touchFn);

    let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn);
      this.ele.removeEventListener('touchmove', touchFn);
      this.ele.removeEventListener('touchend', touchFn);
    };
    this.add(new Observer({ cb: observer.bind(this) }));
  }

  leftSlip (handler) {
    let startX, startY, endX, endY;
    let that = this;
    let touchFn = function (e) {
      // console.log(e.type)
      e.preventDefault();
      switch (e.type) {
        case 'touchstart':
          startX = e.changedTouches[0].clientX;
          startY = e.changedTouches[0].clientY;
          break
        case 'touchend':
          endX = e.changedTouches[0].clientX;
          endY = e.changedTouches[0].clientY;
          if (Math.abs(startY - endY) < that.desY && startX - endX > that.minMoveDes) {
            handler.call(this, e);
          }
          break
      }
    };
    this.ele.addEventListener('touchstart', touchFn);
    this.ele.addEventListener('touchend', touchFn);

    let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn);
      this.ele.removeEventListener('touchend', touchFn);
    };
    this.add(new Observer({ cb: observer.bind(this) }));
  }

  rightSlip (handler) {
    let startX, startY, endX, endY;
    let that = this;
    let touchFn = function (e) {
      e.preventDefault();
      switch (e.type) {
        case 'touchstart':
          startX = e.changedTouches[0].clientX;
          startY = e.changedTouches[0].clientY;
          break
        case 'touchend':
          endX = e.changedTouches[0].clientX;
          endY = e.changedTouches[0].clientY;
          if (Math.abs(startY - endY) < that.desY && endX - startX > that.minMoveDes) {
            handler.call(this, e);
          }
          break
      }
    };
    this.ele.addEventListener('touchstart', touchFn);
    this.ele.addEventListener('touchend', touchFn);

    let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn);
      this.ele.removeEventListener('touchend', touchFn);
    };
    this.add(new Observer({ cb: observer.bind(this) }));
  }

  upSlip (handler) {
    let startX, startY, endX, endY;
    let that = this;
    let touchFn = function (e) {
      // console.log(e.type)
      e.preventDefault();
      switch (e.type) {
        case 'touchstart':
          startX = e.changedTouches[0].clientX;
          startY = e.changedTouches[0].clientY;
          break
        case 'touchend':
          endX = e.changedTouches[0].clientX;
          endY = e.changedTouches[0].clientY;
          /* console.log('X:' + Math.abs(startX - endX))
          console.log('Y:' + (startY - endY)) */
          if ((Math.abs(startX - endX) < that.desX && startY - endY > that.minMoveDes)) {
            handler.call(this, e);
          }
          break
      }
    };
    this.ele.addEventListener('touchstart', touchFn);
    this.ele.addEventListener('touchend', touchFn);

    let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn);
      this.ele.removeEventListener('touchend', touchFn);
    };
    this.add(new Observer({ cb: observer.bind(this) }));
  }
  downSlip (handler) {
    let startX, startY, endX, endY;
    let that = this;
    let touchFn = function (e) {
      // console.log(e.type)
      e.preventDefault();
      switch (e.type) {
        case 'touchstart':
          startX = e.changedTouches[0].clientX;
          startY = e.changedTouches[0].clientY;
          break
        case 'touchend':
          endX = e.changedTouches[0].clientX;
          endY = e.changedTouches[0].clientY;
          // console.log('X:' + Math.abs(startX - endX))
          // console.log('Y:' + (endY - startY))
          if (Math.abs(startX - endX) < that.desX && endY - startY > that.minMoveDes) {
            handler.call(this, e);
          }
          break
      }
    };
    this.ele.addEventListener('touchstart', touchFn);
    this.ele.addEventListener('touchend', touchFn);

    let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn);
      this.ele.removeEventListener('touchend', touchFn);
    };
    this.add(new Observer({ cb: observer.bind(this) }));
  }
}

function strHash (input) {
  var I64BIT_TABLE =
 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
  var hash = 5381;
  var i = input.length - 1;

  if (typeof input === 'string') {
    for (; i > -1; i--) { hash += (hash << 5) + input.charCodeAt(i); }
  } else {
    for (; i > -1; i--) { hash += (hash << 5) + input[i]; }
  }
  var value = hash & 0x7FFFFFFF;

  var retValue = '';
  do {
    retValue += I64BIT_TABLE[value & 0x3F];
  }
  while ((value >>= 6))

  return retValue
}

function domToString (node) {
  return node.outerHTML
}

const cache = {};

function inserted (el, binding, vNode) {
  let myEvent;
  let hashText = strHash(domToString(el));
  if (!cache[hashText]) {
    cache[hashText] = new MyEvent({
      select: el,
      destory () {
        return new Promise((resolve, reject) => {
          vNode.context.$once('hook:beforeDestroy',
          function () {
            delete cache[hashText];
            hashText = null;
            return resolve()
          });
          vNode.context.$on('error', function (err) {
            return reject(err)
          });
        })
      }
    });
  }
  myEvent = cache[hashText];
  if (!myEvent[binding.arg]) {
    throw new Error(`no such ${binding.arg} evnet type`)
  }
  if (typeof binding.value === 'function') {
    myEvent[binding.arg](binding.value);
  }else if(typeof binding.value === 'object' && binding.value && Reflect.has(binding.value, 'startHandle') && Reflect.has(binding.value, 'endHandle') && typeof binding.value.startHandle === 'function' && typeof binding.value.endHandle === 'function' && binding.arg === 'longTap') {
      myEvent[binding.arg](binding.value.startHandle, binding.value.endHandle);
  } else {
    throw new TypeError(`expression must be function or a object, object has 'startHandle' and 'endHandle' function`)
  }
}
const vuePhoneEvent = {
  install(Vue){
    Vue.directive('event', {
      inserted
    });
  }
};

export default vuePhoneEvent;
export { inserted };
