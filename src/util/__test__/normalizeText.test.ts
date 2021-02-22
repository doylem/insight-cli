import normalizeText from '../normalizeText'

describe('#normalizeText', () => {
  describe('when text is an array', () => {
    it('converts to a string before normalizing', () => {
      expect(normalizeText(['test'])).toEqual('test')
    })
  })

  describe('when text is a string', () => {
    it('converts to lowercase and trims any whitespace', () => {
      expect(normalizeText(['TEST '])).toEqual('test')
    })
  })
})
