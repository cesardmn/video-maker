const robot = require('./text-robots/text-robots')

const robots = {
  input: require('./text-robots/input'),
  text: require('./text-robots/text-robots'),
  state: require('./text-robots/state.js'),
  image: require('./text-robots/image.js')
}

async function start() {

  robots.input()
  await robots.text()
  await robots.image()

  const content = robots.state.load()

  console.dir(content, { depth: null })
}

start()

