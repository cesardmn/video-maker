const readline = require('readline-sync')
const robots = {
  text: require('./text-robots/text-robots')
}

async function start(){
  content = {}

  content.searchTerm = askAndReturnSearchTerm()
  content.prefix = askAndReturnPrefix()

  await robots.text(content)

  function askAndReturnSearchTerm(){
    return readline.question('Type a Wikipedia search term: ')
  }

  function askAndReturnPrefix(){
    const prefixes = ['Who is', 'What is', 'History of']
    const selectedPrefixIndex = readline.keyInSelect(prefixes, 'choose on option: ')
    return prefixes[selectedPrefixIndex]
  }

  console.log(content);

}

start()

