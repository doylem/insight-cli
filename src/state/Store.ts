import { Store as DataStore } from './types'
import arrayToDict from '../util/arrayToDict'

class Store {
  public store: DataStore

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const users = require('../../data/users.json')
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const organizations = require('../../data/organizations.json')
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const tickets = require('../../data/tickets.json')

    this.store = {
      users: arrayToDict(users),
      organizations: arrayToDict(organizations),
      tickets: arrayToDict(tickets),
    }
  }
}

export default Store
