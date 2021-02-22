import { SearchParserResult } from 'search-query-parser'
import { Store as DataStore, EntityStores, Entities } from 'state/types'
import filter from 'lodash.filter'
import normalizeText from 'util/normalizeText'

const compareValue = (value: string | number | boolean | string[], text: string): boolean => {
  // values can also be arrays Eg. "tags"
  if (Array.isArray(value))
    return value.some(
      (element) => (typeof element === 'string' ? element.toLowerCase() : element) === text,
    )
  return value.toString().toLowerCase() === text
}

const isValueEmpty = (value: string | number | boolean | string[]): boolean => {
  if (Array.isArray(value)) return value.length === 0
  return value.toString().length === 0
}

interface SearchResults {
  results: Array<Entities>
}

const search = (
  dataStore: DataStore,
  entity: EntityStores,
  queryOptions: SearchParserResult,
): SearchResults => {
  const results: Array<Entities> = []
  const normalizedSearchText = normalizeText(queryOptions.text || [''])
  Object.values(entity.data).forEach((value) => {
    // handle isEmpty:key queries
    if (queryOptions.isEmpty && isValueEmpty(value[queryOptions.isEmpty])) {
      results.push({ ...value, relationships: [] })
    } else {
      // Filter by search text
      const result = filter(value as Entities, (each) => compareValue(each, normalizedSearchText))
      if (result.length) results.push({ ...value, relationships: [] })
    }
  })

  // if we have positive search results, lookup any relationships
  if (results.length) {
    entity.relationships.forEach(({ store, key, name }) => {
      results.forEach((result: any) => {
        if (result.hasOwnProperty(key)) {
          result.relationships.push({ name, data: dataStore[store].data[result[key]] })
        }
      })
    })
  }

  return { results }
}

export default search
