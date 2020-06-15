import MyEvent, {strHash, domToString} from './my-event'
const cache = {}

export function inserted (el, binding, vNode) {
  let myEvent
  let hashText = strHash(domToString(el))
  if (!cache[hashText]) {
    cache[hashText] = new MyEvent({
      select: el,
      destory () {
        return new Promise((resolve, reject) => {
          vNode.context.$once('hook:beforeDestroy',
          function () {
            delete cache[hashText]
            hashText = null
            return resolve()
          })
          vNode.context.$on('error', function (err) {
            return reject(err)
          })
        })
      }
    })
  }
  myEvent = cache[hashText]
  if (!myEvent[binding.arg]) {
    throw new Error(`no such ${binding.arg} evnet type`)
  }
  if (typeof binding.value === 'function') {
    myEvent[binding.arg](binding.value)
  }else if(typeof binding.value === 'object' && binding.value && Reflect.has(binding.value, 'startHandle') && Reflect.has(binding.value, 'endHandle') && typeof binding.value.startHandle === 'function' && typeof binding.value.endHandle === 'function' && binding.arg === 'longTap') {
      myEvent[binding.arg](binding.value.startHandle, binding.value.endHandle)
  } else {
    throw new TypeError(`expression must be function or a object, object has 'startHandle' and 'endHandle' function`)
  }
}
const vuePhoneEvent = {
  install(Vue){
    Vue.directive('event', {
      inserted
    })
  }
}

export default vuePhoneEvent