// import { Subject, Observer } from './observer'

export default class MyEvent {
  constructor (props) {
    // super(props)
    let select = props.select
    if (typeof select === 'string') {
      this.ele = document.querySelector(select)
    } else if (select instanceof HTMLElement && select.nodeType === 1) {
      this.ele = select
    } else {
      throw new TypeError('props of select must be string or HTMLElement')
    }
    this.tapLastTime = null
    // this.observer = new Subject()
    /* if (props.destory && typeof props.destory === 'function') {
      props.destory().then(() => {
        this.observer.notify()
      }).catch(err => {
        console.log(err)
      })
    } */
  }
  tap (handler) {
    let startTime, endTime
    let touchFn = function (e) {
      e.preventDefault()
      switch (e.type) {
        case 'touchstart':
          startTime = new Date().getTime()
          break
        case 'touchend':
          endTime = new Date().getTime()
          if (endTime - startTime < 200) {
            if (!this.tapLastTime || endTime - this.tapLastTime > 600) { // 防止重复提交
              this.tapLastTime = +new Date()
              handler.call(this, e)
            }
          }
          break
        default:
          startTime = new Date().getTime()
          break
      }
    }
    this.ele.addEventListener('touchstart', touchFn)
    this.ele.addEventListener('touchend', touchFn)
    /* let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn)
      this.ele.removeEventListener('touchend', touchFn)
      console.log('remove tap event')
    }
    this.add(new Observer({ cb: observer })) */
  }

  longTap (startHandle, endHandle) {
    let startTime, endTime, timerId, startX, startY, endY
    let isLongPress = false
    let touchFn = function (e) {
      e.preventDefault()
      let isMove = Math.abs(e.changedTouches[0].clientX - startX) > 20 || Math.abs(e.changedTouches[0].clientY - startY) > 20
      switch (e.type) {
        case 'touchstart':
          startTime = new Date().getTime()
          startX = e.changedTouches[0].clientX
          startY = e.changedTouches[0].clientY
          timerId = setTimeout(() => {
            startHandle.call(this, e)
            isLongPress = true
            timerId = null
          }, 500)
          break
        case 'touchmove':
          
          startTime = new Date().getTime()
          if (isMove && !isLongPress) {
            timerId && clearTimeout(timerId)
            timerId = setTimeout(() => {
              startHandle.call(this, e)
              isLongPress = true
              timerId = null
            }, 500)
          }
          break
        case 'touchend':
          endTime = new Date().getTime()
          endY = e.changedTouches[0].clientY
          // console.log(endY, startY)
          // console.log('Y:' + (startY - endY))
          // console.log('time:' + (endTime - startTime))
          if (endTime - startTime < 500) {
            timerId && clearTimeout(timerId)
          } else if (endHandle && (startY - endY < 30)) {
            endHandle.call(this, e)
          }
          // clearTimeout(timerId)
          break
        default:
          clearTimeout(timerId)
          break
      }
    }
    this.ele.addEventListener('touchstart', touchFn)
    this.ele.addEventListener('touchmove', touchFn)
    this.ele.addEventListener('touchend', touchFn)

    /* let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn)
      this.ele.removeEventListener('touchmove', touchFn)
      this.ele.removeEventListener('touchend', touchFn)
    }
    this.add(new Observer({ cb: observer })) */
  }

  leftSlip (handler) {
    let startX, startY, endX, endY
    let touchFn = function (e) {
      // console.log(e.type)
      e.preventDefault()
      switch (e.type) {
        case 'touchstart':
          startX = e.changedTouches[0].clientX
          startY = e.changedTouches[0].clientY
          break
        case 'touchend':
          endX = e.changedTouches[0].clientX
          endY = e.changedTouches[0].clientY
          if (Math.abs(startY - endY) < 30 && startX - endX > 50) {
            handler.call(this, e)
          }
          break
        default:
          break
      }
    }
    this.ele.addEventListener('touchstart', touchFn)
    this.ele.addEventListener('touchend', touchFn)

    /* let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn)
      this.ele.removeEventListener('touchend', touchFn)
    }
    this.add(new Observer({ cb: observer })) */
  }

  rightSlip (handler) {
    let startX, startY, endX, endY
    let touchFn = function (e) {
      e.preventDefault()
      switch (e.type) {
        case 'touchstart':
          startX = e.changedTouches[0].clientX
          startY = e.changedTouches[0].clientY
          break
        case 'touchend':
          endX = e.changedTouches[0].clientX
          endY = e.changedTouches[0].clientY
          if (Math.abs(startY - endY) < 30 && endX - startX > 50) {
            handler.call(this, e)
          }
          break
        default:
          break
      }
    }
    this.ele.addEventListener('touchstart', touchFn)
    this.ele.addEventListener('touchend', touchFn)

    /* let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn)
      this.ele.removeEventListener('touchend', touchFn)
    }
    this.add(new Observer({ cb: observer })) */
  }

  upSlip (handler, sort) {
    let startX, startY, endX, endY
    let touchFn = function (e) {
      // console.log(e.type)
      e.preventDefault()
      switch (e.type) {
        case 'touchstart':
          startX = e.changedTouches[0].clientX
          startY = e.changedTouches[0].clientY
          break
        case 'touchend':
          endX = e.changedTouches[0].clientX
          endY = e.changedTouches[0].clientY
          /* console.log('X:' + Math.abs(startX - endX))
          console.log('Y:' + (startY - endY)) */
          if ((Math.abs(startX - endX) < 40 && startY - endY > 50) || (sort && startY - endY > 60)) {
            handler.call(this, e)
          }
          break
        default:
          break
      }
    }
    this.ele.addEventListener('touchstart', touchFn)
    this.ele.addEventListener('touchend', touchFn)

    /* let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn)
      this.ele.removeEventListener('touchend', touchFn)
    }
    this.add(new Observer({ cb: observer })) */
  }
  downSlip (handler) {
    let startX, startY, endX, endY
    let touchFn = function (e) {
      console.log(e.type)
      e.preventDefault()
      switch (e.type) {
        case 'touchstart':
          startX = e.changedTouches[0].clientX
          startY = e.changedTouches[0].clientY
          break
        case 'touchend':
          endX = e.changedTouches[0].clientX
          endY = e.changedTouches[0].clientY
          // console.log('X:' + Math.abs(startX - endX))
          // console.log('Y:' + (endY - startY))
          if (Math.abs(startX - endX) < 30 && endY - startY > 50) {
            handler.call(this, e)
          }
          break
        default:
          break
      }
    }
    this.ele.addEventListener('touchstart', touchFn)
    this.ele.addEventListener('touchend', touchFn)

    /* let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn)
      this.ele.removeEventListener('touchend', touchFn)
    }
    this.add(new Observer({ cb: observer })) */
  }
}
