import MyEvent from './my-event'
const vuePhoneEvent = {
  install(Vue){
    Vue.directive('event', {
      inserted: function (el, binding) {
        let myEvent = new MyEvent({ select: el })
        if (!myEvent[binding.arg]) {
          throw new Error(`no such ${binding.arg} evnet type`)
        }
        if (typeof binding.value !== 'function') {
          throw new TypeError(`expression must be function`)
        }
        myEvent[binding.arg](binding.value)
      }
    })
  }
}

export default vuePhoneEvent