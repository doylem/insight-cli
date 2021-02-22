import Store from './state/Store'
import { Store as DataStore, Stores } from './state/types'
import prompt from 'readline-sync'
import ora from 'ora'

import command from './command'

const inputError = () => {
  console.log("\n⚠️  Sorry, that option doesn't exist. Please try again.\n")
}

export const init = (): void => {
  console.log(`
     ________________________________
    |                                |
    |  insight-cli 🎉                |
    |  A helpful JSON search app     |
    |________________________________|`)

  const spinner = ora('Loading data').start()
  const store: DataStore | null = new Store().getStore()
  spinner.stop()

  if (store) {
    while (true) {
      console.log('')
      const choice = prompt.question('(S)earch, (H)elp or (E)xit: ').toUpperCase()

      if (choice === 'S') {
        console.log('')
        console.log('Which data source would you like to search?')
        const entityChoice = prompt.question('(U)sers, (O)rganizations, (T)ickets: ').toUpperCase()
        let entity: Stores | null = null
        if (entityChoice === 'U') {
          entity = Stores.users
        } else if (entityChoice === 'O') {
          entity = Stores.organizations
        } else if (entityChoice === 'T') {
          entity = Stores.tickets
        }

        if (entity) {
          console.log('')
          const searchQuery = prompt.question(`Search within ${entity}: `)
          command.query(store, searchQuery, entity)
        } else {
          inputError()
        }
      } else if (choice === 'H') {
        command.help()
      } else if (choice === 'E') {
        command.exit()
      } else {
        inputError()
      }
    }
  }
}
