import MyEvent from './my-event'
const vuePhoneEvent = {
  install(Vue){
    Vue.directive('event', {
      inserted: function (el, binding) {
        let myEvent = new MyEvent({ select: el })
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
    })
  }
}

export default vuePhoneEvent