import { Store as DataStore } from './types'
import arrayToDict from '../util/arrayToDict'
import config from '../config/config'

class Store {
  public store: DataStore

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const users = require(config.users)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const organizations = require(config.organizations)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const tickets = require(config.tickets)

    this.store = {
      users: arrayToDict(users),
      organizations: arrayToDict(organizations),
      tickets: arrayToDict(tickets),
    }
  }
}

export default Store
