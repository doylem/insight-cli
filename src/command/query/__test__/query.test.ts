import search from '../search'
import { mocked } from 'ts-jest/utils'
import testStoreData from './testStoreData'
import query, {
  checkAndHighlightSearchText,
  displayResults,
  displaySummary,
  parseSearchQuery,
} from '../query'
import * as queryFunctions from '../query'
import columnify from 'columnify'

jest.mock('../search')
const mockedSearch = mocked(search)

jest.mock('columnify')
const mockedColumnify = mocked(columnify)

describe('query functions', () => {
  beforeEach(() => {
    console.log = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
    mockedSearch.mockClear()
    mockedColumnify.mockClear()
  })

  describe('#query', () => {
    describe('with a search query', () => {
      it('calls search with a parsed query', () => {
        mockedSearch.mockImplementation(() => ({ results: [] }))
        const queryOptions = { text: ['test'], exclude: {} }
        query(testStoreData as any, 'test', 'users')
        expect(mockedSearch).toHaveBeenCalledWith(testStoreData, testStoreData.users, queryOptions)
      })
    })
  })

  describe('#parseSearchQuery', () => {
    describe('with isEmpty flag', () => {
      it('parses the search query with the flag', () => {
        mockedSearch.mockImplementation(() => ({ results: [] }))
        const expectedResponse = { isEmpty: 'someKey', exclude: {} }

        expect(parseSearchQuery('isEmpty:someKey')).toEqual(expectedResponse)
      })
    })

    describe('without isEmpty flag', () => {
      it('parses the search query', () => {
        mockedSearch.mockImplementation(() => ({ results: [] }))
        const expectedResponse = { text: ['test', 'text'], exclude: {} }

        expect(parseSearchQuery('test text')).toEqual(expectedResponse)
      })
    })
  })
  describe('#displaySummary', () => {
    describe('with no results', () => {
      it('displays a no results message', () => {
        displaySummary(0, 'test')

        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('No results found'))
      })
    })

    describe('with one result', () => {
      it('displays a singular summary', () => {
        displaySummary(1, 'test')

        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('returned 1 result'))
      })
    })
    describe('with two results', () => {
      it('displays a pluralised summary', () => {
        displaySummary(2, 'test')

        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('returned 2 results'))
      })
    })
  })

  describe('#checkAndHighlightSearchText', () => {
    describe('without tag like comma values', () => {
      it('highlights the correct term', () => {
        const spy = jest.spyOn(queryFunctions, 'highlightText')
        checkAndHighlightSearchText('Word', 'word')
        expect(spy).toHaveBeenCalledWith('Word')
      })
    })
    describe('with tag like comma values', () => {
      it('highlights the correct term', () => {
        const spy = jest.spyOn(queryFunctions, 'highlightText')
        checkAndHighlightSearchText('tag1,tag2,tag3', 'tag3')
        expect(spy).toHaveBeenCalledWith('tag3')
      })
    })
  })

  describe('#displayResults', () => {
    describe('with results', () => {
      it('calls columnify with the data to present', () => {
        displayResults([testStoreData.users.data['1']], 'Miss Coffey', 'users')

        expect(mockedColumnify).toHaveBeenCalledWith(
          testStoreData.users.data['1'],
          expect.objectContaining({
            columnSplitter: ' | ',
            maxWidth: 100,
            showHeaders: false,
            truncate: true,
          }),
        )
      })

      it('displays the results in the console', () => {
        displayResults([testStoreData.users.data['1']], 'Miss Coffey', 'users')
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Found match'))
      })

      describe('with relationships', () => {
        const relationships = [
          { data: testStoreData.users.data['2'], name: 'user' },
          { data: testStoreData.users.data['2'], name: 'user' },
        ]
        const dataWithMultpleRelationships = {
          ...testStoreData.users.data['1'],
          relationships,
        }
        it('calls columnify with the relationships data to present', () => {
          displayResults([dataWithMultpleRelationships], 'Miss Coffey', 'users')

          expect(mockedColumnify).toHaveBeenCalledWith(
            relationships[0].data,
            expect.objectContaining({
              columnSplitter: ' | ',
              maxWidth: 100,
              showHeaders: false,
              truncate: true,
            }),
          )
        })
      })
    })
    describe('with no results', () => {
      it('does not calls columnify', () => {
        displayResults([], 'search text', 'users')

        expect(mockedColumnify).not.toHaveBeenCalled()
      })
      it('does not display any results', () => {
        displayResults([], 'search text', 'users')

        expect(console.log).not.toHaveBeenCalled()
      })
    })
  })
})
