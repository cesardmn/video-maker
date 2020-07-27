const robots = {
  input: require('./text-robots/input'),
  text: require('./text-robots/text-robots'),
  state: require('./text-robots/state.js')
}

async function start() {

  robots.input()
  await robots.text()

  const content = robots.state.load()

  console.dir(content, {depth: null})
}

start()

