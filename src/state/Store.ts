import {
  OrganizationRelationships,
  Store as DataStore,
  UserStore,
  TicketRelationships,
  UserRelationships,
  OrganizationStore,
  TicketStore,
} from './types'
import arrayToDict from '../util/arrayToDict'
import config from '../config/config'

const userRelationships: UserRelationships = [
  {
    store: 'organizations',
    key: 'organization_id',
    name: 'Organization',
  },
]
const organizationRelationships: OrganizationRelationships = []
const ticketRelationships: TicketRelationships = [
  {
    store: 'organizations',
    key: 'organization_id',
    name: 'Organization',
  },
  {
    store: 'users',
    key: 'assignee_id',
    name: 'User (Assignee)',
  },
  {
    store: 'users',
    key: 'submitter_id',
    name: 'User (Submitter)',
  },
]

class Store {
  public store: DataStore

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const usersJson = require(config.users)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const organizationsJson = require(config.organizations)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ticketsJson = require(config.tickets)

    const users: UserStore = {
      data: arrayToDict(usersJson),
      relationships: userRelationships,
      name: 'User',
    }
    const organizations: OrganizationStore = {
      data: arrayToDict(organizationsJson),
      relationships: organizationRelationships,
      name: 'Organization',
    }
    const tickets: TicketStore = {
      data: arrayToDict(ticketsJson),
      relationships: ticketRelationships,
      name: 'Ticket',
    }

    this.store = {
      users,
      organizations,
      tickets,
    }
  }

  public getStore(): DataStore {
    return this.store
  }
}

export default Store
