import arrayToDict from '../arrayToDict'

describe('#arrayToDict', () => {
  describe('when an _id exists in the source array', () => {
    it('converts to a dictionary using _id as the key', () => {
      const entry = { _id: 23, name: 'foo' }
      const expectedOutput = { 23: entry }

      expect(arrayToDict([entry])).toEqual(expectedOutput)
    })
  })

  describe('when an _id does not exist in the source array', () => {
    it('converts to a dictionary using index as the key', () => {
      const entry = { name: 'foo' }
      const expectedOutput = { 0: entry }

      expect(arrayToDict([entry])).toEqual(expectedOutput)
    })
  })
})
