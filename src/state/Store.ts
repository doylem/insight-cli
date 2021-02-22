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

export const userRelationships: UserRelationships = [
  {
    store: 'organizations',
    key: 'organization_id',
    name: 'Organization',
  },
]
export const organizationRelationships: OrganizationRelationships = []
export const ticketRelationships: TicketRelationships = [
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
  public store: DataStore | null

  constructor() {
    let usersJson, organizationsJson, ticketsJson
    this.store = null
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      usersJson = require(config.users)
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      organizationsJson = require(config.organizations)
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      ticketsJson = require(config.tickets)

      this.parseData(usersJson, organizationsJson, ticketsJson)
    } catch (error) {
      console.error(
        '\n\nError while parsing data files. Please check files exist in the locations configured in config/config.ts\n',
      )
    }
  }

  private parseData(usersJson: any, organizationsJson: any, ticketsJson: any): void {
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

  public getStore(): DataStore | null {
    return this.store
  }
}

export default Store
