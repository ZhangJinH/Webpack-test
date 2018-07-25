import _ from 'lodash'
import print from './print'

function createComponent() {
  let ele = document.createElement('div')
  ele.innerHTML = _.join(['hello', 'webpack', 'zjh'], ' ')
  return ele
}

document.getElementsByTagName('body')[0].appendChild(createComponent())

if (module.hot) {
  module.hot.accept('./print.js', function () {
    console.log()
    print()
  })
}