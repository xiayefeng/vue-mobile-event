import { Subject, Observer } from './observer'
export default class MyEvent extends Subject {
  constructor (props) {
    super(props)
    this.tapTime = props.tapTime || 200
    this.logTapTime = props.logTapTime || 400
    this.desX = props.desX || 30
    this.desY = props.desY || 30
    this.originMin = props.originMin || 10
    this.minMoveDes = props.minMoveDes || 50
    let select = props.select
    if (typeof select === 'string') {
      this.ele = document.querySelector(select)
    } else if (select instanceof HTMLElement && select.nodeType === 1) {
      this.ele = select
    }
    if(!this.ele){
      console.error('props of select must be already exist DOM select or HTMLElement')
    }
    this.tapLastTime = null
    if (props.destory && typeof props.destory === 'function') {
      props.destory().then(() => {
        this.notify()
      }).catch(err => {
        console.log(err)
      })
    }
  }
  tap (handler) {
    let startTime, endTime, startX, endX, startY, endY
    let that = this
    let touchFn = function (e, ...args) {
      e.preventDefault()
      switch (e.type) {
        case 'touchstart':
          startTime = new Date().getTime()
          startX = e.changedTouches[0].clientX
          startY = e.changedTouches[0].clientY
          break
        case 'touchend':
          endTime = new Date().getTime()
          endX = e.changedTouches[0].clientX
          endY = e.changedTouches[0].clientY
          if (endTime - startTime <= that.tapTime && Math.abs(startX-endX) < that.originMin && Math.abs(startY - endY) < that.originMin) {
            if (!that.tapLastTime || endTime - that.tapLastTime > 600) { // 防止重复提交
              that.tapLastTime = +new Date()
              handler.call(this, e, ...args)
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
    let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn)
      this.ele.removeEventListener('touchend', touchFn)
    }
    this.add(new Observer({ cb: observer.bind(this) }))
  }

  longTap (startHandle, endHandle) {
    let startTime, endTime, timerId, startX, endX, startY, endY
    let isLongPress = false
    let that = this
    let touchFn = function (e, ...args) {
      e.preventDefault()
      let isMove = function() {
          return Math.abs(e.changedTouches[0].clientX - startX) > that.desX || Math.abs(e.changedTouches[0].clientY - startY) > that.desY
      } 
      switch (e.type) {
        case 'touchstart':
          startTime = new Date().getTime()
          startX = e.changedTouches[0].clientX
          startY = e.changedTouches[0].clientY
          timerId = setTimeout(() => {
            startHandle.call(this, e, args)
            isLongPress = true
            timerId = null
          }, that.logTapTime)
          break
        case 'touchmove':
          startTime = new Date().getTime()
          
          if (isMove() && !isLongPress) {
            timerId && clearTimeout(timerId)
            timerId = setTimeout(() => {
              startHandle.call(this, e, ...args)
              isLongPress = true
              timerId = null
            }, that.logTapTime)
          }
          break
        case 'touchend':
          endTime = new Date().getTime()
          endX = e.changedTouches[0].clientX
          endY = e.changedTouches[0].clientY
          // console.log(endY, startY)
          if (endTime - startTime < that.logTapTime) {
            timerId && clearTimeout(timerId)
          } else if (endHandle && (Math.abs(startY - endY) < that.desY) && (Math.abs(startX - endX) < that.desX)) {
            endHandle.call(this, e, ...args)
          }
          // clearTimeout(timerId)
          isLongPress = false
          break
        default:
          endHandle && endHandle.call(this, e, ...args)
          timerId && clearTimeout(timerId)
          isLongPress = false
          break
      }
    }
    this.ele.addEventListener('touchstart', touchFn)
    this.ele.addEventListener('touchmove', touchFn)
    this.ele.addEventListener('touchend', touchFn)

    let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn)
      this.ele.removeEventListener('touchmove', touchFn)
      this.ele.removeEventListener('touchend', touchFn)
    }
    this.add(new Observer({ cb: observer.bind(this) }))
  }

  leftSlip (handler) {
    let startX, startY, endX, endY
    let that = this
    let touchFn = function (e, ...args) {
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
          if (Math.abs(startY - endY) < that.desY && startX - endX > that.minMoveDes) {
            handler.call(this, e, ...args)
          }
          break
        default:
          break
      }
    }
    this.ele.addEventListener('touchstart', touchFn)
    this.ele.addEventListener('touchend', touchFn)

    let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn)
      this.ele.removeEventListener('touchend', touchFn)
    }
    this.add(new Observer({ cb: observer.bind(this) }))
  }

  rightSlip (handler) {
    let startX, startY, endX, endY
    let that = this
    let touchFn = function (e, ...args) {
      e.preventDefault()
      switch (e.type) {
        case 'touchstart':
          startX = e.changedTouches[0].clientX
          startY = e.changedTouches[0].clientY
          break
        case 'touchend':
          endX = e.changedTouches[0].clientX
          endY = e.changedTouches[0].clientY
          if (Math.abs(startY - endY) < that.desY && endX - startX > that.minMoveDes) {
            handler.call(this, e, ...args)
          }
          break
        default:
          break
      }
    }
    this.ele.addEventListener('touchstart', touchFn)
    this.ele.addEventListener('touchend', touchFn)

    let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn)
      this.ele.removeEventListener('touchend', touchFn)
    }
    this.add(new Observer({ cb: observer.bind(this) }))
  }

  upSlip (handler) {
    let startX, startY, endX, endY
    let that = this
    let touchFn = function (e, ...args) {
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
          if ((Math.abs(startX - endX) < that.desX && startY - endY > that.minMoveDes)) {
            handler.call(this, e, ...args)
          }
          break
        default:
          break
      }
    }
    this.ele.addEventListener('touchstart', touchFn)
    this.ele.addEventListener('touchend', touchFn)

    let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn)
      this.ele.removeEventListener('touchend', touchFn)
    }
    this.add(new Observer({ cb: observer.bind(this) }))
  }
  downSlip (handler) {
    let startX, startY, endX, endY
    let that = this
    let touchFn = function (e, ...args) {
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
          // console.log('X:' + Math.abs(startX - endX))
          // console.log('Y:' + (endY - startY))
          if (Math.abs(startX - endX) < that.desX && endY - startY > that.minMoveDes) {
            handler.call(this, e, ...args)
          }
          break
        default:
          break
      }
    }
    this.ele.addEventListener('touchstart', touchFn)
    this.ele.addEventListener('touchend', touchFn)

    let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn)
      this.ele.removeEventListener('touchend', touchFn)
    }
    this.add(new Observer({ cb: observer.bind(this) }))
  }
}

export function strHash (input) {
  var I64BIT_TABLE =
 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'
  var hash = 5381
  var i = input.length - 1

  if (typeof input === 'string') {
    for (; i > -1; i--) { hash += (hash << 5) + input.charCodeAt(i) }
  } else {
    for (; i > -1; i--) { hash += (hash << 5) + input[i] }
  }
  var value = hash & 0x7FFFFFFF

  var retValue = ''
  do {
    retValue += I64BIT_TABLE[value & 0x3F]
  }
  while ((value >>= 6))

  return retValue
}

export function domToString (node) {
  return node.outerHTML
}
