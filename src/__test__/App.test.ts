import { init } from '../App'
import { mocked } from 'ts-jest/utils'
import Store from '../state/Store'
import ora from 'ora'
import prompt from 'readline-sync'
import command from '../command'

jest.mock('ora')
const mockedOra = mocked(ora)

jest.mock('../state/Store')
const mockedStore = mocked(Store)

describe('App', () => {
  beforeEach(() => {
    console.log = jest.fn()
    mockedOra.mockImplementation((): any => ({
      start: jest.fn().mockImplementation(() => ({
        stop: jest.fn(),
      })),
    }))
    mockedStore.mockImplementation((): any => ({
      getStore: jest.fn().mockImplementation(() => ({})),
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
    mockedOra.mockClear()
    mockedStore.mockClear()
  })

  describe('#init', () => {
    describe('when user chooses (S)earch', () => {
      describe('and chooses (U)sers as a data source', () => {
        it('calls command.query to initiate search function', () => {
          const mockPrompt = jest.spyOn(prompt, 'question')
          mockPrompt.mockImplementationOnce(() => 's')
          mockPrompt.mockImplementationOnce(() => 'u')
          mockPrompt.mockImplementationOnce(() => 'search text')
          const mockCommand = jest.spyOn(command, 'query')
          mockCommand.mockImplementationOnce(() => jest.fn())

          init()
          expect(mockedOra).toHaveBeenLastCalledWith('Loading data')
          expect(mockCommand).toHaveBeenCalledWith({}, 'search text', 'users')
        })
      })
      describe('and chooses (O)rganizations as a data source', () => {
        it('calls command.query to initiate search function', () => {
          const mockPrompt = jest.spyOn(prompt, 'question')
          mockPrompt.mockImplementationOnce(() => 's')
          mockPrompt.mockImplementationOnce(() => 'o')
          mockPrompt.mockImplementationOnce(() => 'search text')
          const mockCommand = jest.spyOn(command, 'query')
          mockCommand.mockImplementationOnce(() => jest.fn())

          init()
          expect(mockCommand).toHaveBeenCalledWith({}, 'search text', 'organizations')
        })
      })
      describe('and chooses (T)ickets as a data source', () => {
        it('calls command.query to initiate search function', () => {
          const mockPrompt = jest.spyOn(prompt, 'question')
          mockPrompt.mockImplementationOnce(() => 's')
          mockPrompt.mockImplementationOnce(() => 't')
          mockPrompt.mockImplementationOnce(() => 'search text')
          const mockCommand = jest.spyOn(command, 'query')
          mockCommand.mockImplementationOnce(() => jest.fn())

          init()
          expect(mockCommand).toHaveBeenCalledWith({}, 'search text', 'tickets')
        })
      })
    })
    describe('when user chooses (H)elp', () => {
      it('calls command.help to display help text', () => {
        const mockPrompt = jest.spyOn(prompt, 'question')
        mockPrompt.mockImplementationOnce(() => 'h')
        const mockCommand = jest.spyOn(command, 'help')
        mockCommand.mockImplementationOnce(() => jest.fn())

        init()
        expect(mockCommand).toHaveBeenCalled()
      })
    })
    describe('when user inputs chooses (E)xit', () => {
      it('calls command.exit to exit the program', () => {
        const mockPrompt = jest.spyOn(prompt, 'question')
        mockPrompt.mockImplementationOnce(() => 'e')
        const mockCommand = jest.spyOn(command, 'exit')
        mockCommand.mockImplementationOnce(() => jest.fn())

        init()
        expect(mockCommand).toHaveBeenCalled()
      })
    })
    describe('when user inputs an option that does not exist', () => {
      it('displays an error message', () => {
        const mockPrompt = jest.spyOn(prompt, 'question')
        mockPrompt.mockImplementationOnce(() => 'z')

        init()
        expect(console.log).toHaveBeenCalledWith(
          expect.stringContaining("Sorry, that option doesn't exist"),
        )
      })
    })
  })
})
