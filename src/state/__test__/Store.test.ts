import Store, { organizationRelationships, ticketRelationships, userRelationships } from '../Store'
import config from '../../config/config'
import { mocked } from 'ts-jest/utils'
import testUsers from './testData/testUsers.json'
import testOrganizations from './testData/testOrganizations.json'
import testTickets from './testData/testTickets.json'

jest.mock('../../config/config')
const mockedConfig = mocked(config)

describe('#Store', () => {
  describe('when files exist', () => {
    it('creates a store to access', () => {
      mockedConfig.users = './__test__/testData/testUsers.json'
      mockedConfig.organizations = './__test__/testData/testOrganizations.json'
      mockedConfig.tickets = './__test__/testData/testTickets.json'

      const expectedResult = {
        users: {
          data: {
            '1': testUsers[0],
            '2': testUsers[1],
          },
          name: 'User',
          relationships: userRelationships,
        },
        organizations: {
          data: {
            '101': testOrganizations[0],
            '102': testOrganizations[1],
          },
          name: 'Organization',
          relationships: organizationRelationships,
        },
        tickets: {
          data: {
            '436bf9b0-1147-4c0a-8439-6f79833bff5b': testTickets[0],
            '1a227508-9f39-427c-8f57-1b72f3fab87c': testTickets[1],
          },
          name: 'Ticket',
          relationships: ticketRelationships,
        },
      }

      const store = new Store()
      expect(store.getStore()).toEqual(expectedResult)
    })
  })
  describe('when files do not exist', () => {
    beforeEach(() => {
      console.error = jest.fn()
      mockedConfig.users = './this/location/does/not/exist/file.json'
    })
    it('does not create a store', () => {
      expect(new Store().getStore()).toEqual(null)
    })
    it('throws an error', () => {
      expect(Store).toThrow(Error)
    })
    it('prints an error message to the console', () => {
      new Store()
      expect(console.error).toHaveBeenCalled()
    })
  })
})
