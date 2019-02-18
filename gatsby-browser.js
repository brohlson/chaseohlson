const scrollToElement = require('scroll-to-element')

exports.onRouteUpdate = ({ location }) => {
  checkHash(location)
}

const checkHash = location => {
  let hash = location.hash
  if (hash) {
    scrollToElement(hash, {
      offset: -90,
      duration: 1000,
    })
  }
}
