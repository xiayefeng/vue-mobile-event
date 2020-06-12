import { Subject, Observer } from './observer'
export default class MyEvent extends Subject {
  constructor (props) {
    super(props)
    this.tapTime = props.tapTime || 200
    this.logTapTime = props.logTapTime || 500
    let select = props.select
    if (typeof select === 'string') {
      this.ele = document.querySelector(select)
    } else if (select instanceof HTMLElement && select.nodeType === 1) {
      this.ele = select
    } else {
      throw new TypeError('props of select must be string or HTMLElement')
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
    let startTime, endTime
    let that = this
    let touchFn = function (e) {
      e.preventDefault()
      switch (e.type) {
        case 'touchstart':
          startTime = new Date().getTime()
          break
        case 'touchend':
          endTime = new Date().getTime()
          if (endTime - startTime < that.tapTime) {
            if (!that.tapLastTime || endTime - that.tapLastTime > 600) { // 防止重复提交
              that.tapLastTime = +new Date()
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
    let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn)
      this.ele.removeEventListener('touchend', touchFn)
    }
    this.add(new Observer({ cb: observer.bind(this) }))
  }

  longTap (startHandle, endHandle) {
    let startTime, endTime, timerId, startX, startY, endY
    let isLongPress = false
    let that = this
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
          }, that.logTapTime)
          break
        case 'touchmove':
          
          startTime = new Date().getTime()
          if (isMove && !isLongPress) {
            timerId && clearTimeout(timerId)
            timerId = setTimeout(() => {
              startHandle.call(this, e)
              isLongPress = true
              timerId = null
            }, that.logTapTime)
          }
          break
        case 'touchend':
          endTime = new Date().getTime()
          endY = e.changedTouches[0].clientY
          // console.log(endY, startY)
          if (endTime - startTime < that.logTapTime) {
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

    let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn)
      this.ele.removeEventListener('touchmove', touchFn)
      this.ele.removeEventListener('touchend', touchFn)
    }
    this.add(new Observer({ cb: observer.bind(this) }))
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

    let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn)
      this.ele.removeEventListener('touchend', touchFn)
    }
    this.add(new Observer({ cb: observer.bind(this) }))
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

    let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn)
      this.ele.removeEventListener('touchend', touchFn)
    }
    this.add(new Observer({ cb: observer.bind(this) }))
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

    let observer = () => {
      this.ele.removeEventListener('touchstart', touchFn)
      this.ele.removeEventListener('touchend', touchFn)
    }
    this.add(new Observer({ cb: observer.bind(this) }))
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
  let tmpNode = document.createElement('div')
  let newNode = node.cloneNode(true)
  tmpNode.appendChild(newNode)
  let str = tmpNode.innerHTML
  tmpNode = newNode = null // 解除引用，以便于垃圾回收
  return str
}
