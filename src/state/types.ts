export interface User {
  _id: number
  url: string
  external_id: string
  name: string
  alias: string
  created_at: string
  active: boolean
  verified: boolean
  shared: boolean
  locale: string
  timezone: string
  last_login_at: string
  email: string
  phone: string
  signature: string
  organization_id: number
  tags: Array<string>
  suspended: boolean
  role: string
  relationships?: any
}

export interface Organization {
  _id: number
  url: string
  external_id: string
  name: string
  domain_names: Array<string>
  created_at: string
  details: string
  shared_tickets: boolean
  tags: Array<string>
  relationships?: any
}

export interface Ticket {
  _id: string
  url: string
  external_id: string
  created_at: string
  type: string
  subject: string
  priority: string
  status: string
  submitter_id: number
  assignee_id: number
  organization_id: number
  tags: Array<string>
  has_incidents: boolean
  due_at: string
  via: string
  relationships?: any
}

export type Entities = User | Organization | Ticket

export enum Stores {
  users = 'users',
  organizations = 'organizations',
  tickets = 'tickets',
}

export type UserRelationships = [
  {
    store: 'organizations'
    key: string
    name: string
  },
]
export type OrganizationRelationships = []
export type TicketRelationships = [
  {
    store: 'organizations'
    key: string
    name: string
  },
  {
    store: 'users'
    key: string
    name: string
  },
  {
    store: 'users'
    key: string
    name: string
  },
]

export interface UserStore {
  data: { [key: string]: User }
  relationships: UserRelationships
  name: 'User'
}
export interface OrganizationStore {
  data: { [key: string]: Organization }
  relationships: OrganizationRelationships
  name: 'Organization'
}

export interface TicketStore {
  data: { [key: string]: Ticket }
  relationships: TicketRelationships
  name: 'Ticket'
}

export type EntityStores = UserStore | OrganizationStore | TicketStore

export interface Store {
  [key: string]: EntityStores
}
