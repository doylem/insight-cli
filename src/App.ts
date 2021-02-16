import Store from './state/Store'
import prompt from 'readline-sync'
import ora from 'ora'

import command from './command'

export const init = (): void => {
  console.log('_________________________________')
  console.log('|                                |')
  console.log('|  insight-cli 🎉                |')
  console.log('|  A helpful JSON search app     |')
  console.log('|________________________________|\n')

  const spinner = ora('Loading data').start()
  const store = new Store()
  spinner.stop()

  while (true) {
    console.log('What would you like to do?')
    const choice = prompt.question('(S)earch, (H)elp or (E)xit: ').toUpperCase()

    if (choice === 'S') {
      command.query(store)
    } else if (choice === 'H') {
      command.help()
    } else if (choice === 'E') {
      command.exit()
    } else {
      console.log("\n⚠️  Sorry, that option doesn't exist. Please try again.\n")
    }
  }
}
