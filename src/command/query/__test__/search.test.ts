import search from '../search'
import testStoreData from './testStoreData'

describe('search', () => {
  describe('with a matching search string', () => {
    it('returns one result', () => {
      const queryOptions = { text: ['Miss Coffey'] }
      const results = search(testStoreData as any, testStoreData.users as any, queryOptions)
      expect(results.results).toHaveLength(1)
    })

    it('returns the result with associated relationships', () => {
      const queryOptions = { text: ['Miss Coffey'] }
      const results = search(testStoreData as any, testStoreData.users as any, queryOptions)

      const expectedResult = [
        {
          ...testStoreData.users.data['1'],
          relationships: [
            {
              data: testStoreData.organizations.data['101'],
              name: 'Organization',
            },
          ],
        },
      ]

      expect(results.results).toEqual(expectedResult)
    })

    describe('When a match has multiple relationships', () => {
      it('returns multiple relationships', () => {
        const queryOptions = { text: ['pending'] }
        const results = search(testStoreData as any, testStoreData.tickets as any, queryOptions)

        const expectedResult = [
          {
            ...testStoreData.tickets.data['436bf9b0-1147-4c0a-8439-6f79833bff5b'],
            relationships: [
              {
                data: testStoreData.organizations.data['101'],
                name: 'Organization',
              },
              {
                data: testStoreData.users.data['1'],
                name: 'User (Assignee)',
              },
              {
                data: testStoreData.users.data['1'],
                name: 'User (Submitter)',
              },
            ],
          },
        ]

        expect(results.results).toEqual(expectedResult)
      })
    })
    describe('with a matching string in multiple items', () => {
      it('returns multiple results', () => {
        const queryOptions = { text: ['admin'] }
        const results = search(testStoreData as any, testStoreData.users as any, queryOptions)
        expect(results.results).toHaveLength(2)
      })
    })
  })
  describe('with a mismatching search string', () => {
    it('returns no results', () => {
      const queryOptions = { text: ['some text that does not exist'] }
      const results = search(testStoreData as any, testStoreData.users as any, queryOptions)
      expect(results.results).toHaveLength(0)
    })
  })

  describe('with an isEmpty:key flag', () => {
    describe('with a key that exists', () => {
      describe('with a matching empty field', () => {
        it('returns one result', () => {
          const queryOptions = { isEmpty: 'description' }
          const results = search(testStoreData as any, testStoreData.tickets as any, queryOptions)
          expect(results.results).toHaveLength(1)
        })

        it('returns the matching value with relationships', () => {
          const queryOptions = { isEmpty: 'description' }
          const results = search(testStoreData as any, testStoreData.tickets as any, queryOptions)
          const expectedResult = [
            {
              ...testStoreData.tickets.data['436bf9b0-1147-4c0a-8439-6f79833bff5b'],
              relationships: [
                {
                  data: testStoreData.organizations.data['101'],
                  name: 'Organization',
                },
                {
                  data: testStoreData.users.data['1'],
                  name: 'User (Assignee)',
                },
                {
                  data: testStoreData.users.data['1'],
                  name: 'User (Submitter)',
                },
              ],
            },
          ]

          expect(results.results).toEqual(expectedResult)
        })
      })
    })
    describe('with a key that does not exist', () => {
      it('returns no results', () => {
        const queryOptions = { isEmpty: 'thisKeyShouldNotExist' }
        const results = search(testStoreData as any, testStoreData.tickets as any, queryOptions)
        expect(results.results).toHaveLength(0)
      })
    })
  })
})
