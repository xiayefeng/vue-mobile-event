/**
 *  观察者模式
 */

// 定义一个主体对象
export class Subject {
  constructor () {
    this.Observer = []
  }

  add (observer) {
    this.Observer.push(observer)
  }

  remove (observer) {
    this.Observer.filter(item => item === observer)
  }

  notify () {
    this.Observer.forEach(item => {
      item.update()
    })
  }
}

// 定义观察着对象
export class Observer {
  constructor (props) {
    this.props = props
  }

  update () {
    typeof this.props.cb === 'function' && this.props.cb()
  }
}
