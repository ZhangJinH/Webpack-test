import _ from 'lodash'
import print  from './print'

function createComponent() {
  let ele = document.createElement('div')
  let btn = document.createElement('button')
  ele.innerHTML = _.join(['hello', 'webpack'], ' ')

  btn.innerHTML = 'click me'
  btn.onclick = print
  ele.appendChild(btn)
  return ele
}

document.getElementsByTagName('body')[0].appendChild(createComponent())