import _ from 'lodash'

function createComponent() {
  let ele = document.createElement('div')
  ele.innerHTML = _.join(['hello', 'webpack'], ' ')
  return ele
}

document.getElementById('app').appendChild(createComponent())