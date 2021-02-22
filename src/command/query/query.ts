import searchQueryParser, { SearchParserResult } from 'search-query-parser'
import { Store as DataStore, Entities } from 'state/types'
import columnify from 'columnify'
import chalk from 'chalk'
import search from './search'
import normalizeText from '../../util/normalizeText'

export const highlightText = (text: string): string => chalk.black.bgCyan(text)

export const checkAndHighlightSearchText = (data: string, normalizedSearchText: string): string => {
  if (!data.toLowerCase().includes(normalizedSearchText)) return data

  // Some values are arrays which have been joined with commas
  // Find which value to highlight by iterating over them
  if (data.indexOf(',') !== -1) {
    const tokens = data.split(',')
    tokens.forEach((element, index) => {
      if (element.toLowerCase().includes(normalizedSearchText)) {
        tokens[index] = highlightText(element)
      }
    })

    return tokens.join(', ')
  } else {
    return highlightText(data)
  }
}

export const displayResults = (
  results: Array<Entities>,
  highlightTerm: string,
  entityName: string,
): void => {
  results.map((result: Entities) => {
    const relationships = Object.assign([], result.relationships)
    delete result.relationships // remove here as we will display relationships seperately
    console.log(chalk.green(`\n--- Found match in: ${entityName} ---`))
    console.log(
      columnify(result, {
        columnSplitter: ' | ',
        showHeaders: false,
        dataTransform: (text: string) => checkAndHighlightSearchText(text, highlightTerm),
        truncate: true,
        maxWidth: 100,
      }),
    )

    if (relationships) {
      const totalRelationships = relationships.length
      console.log(
        chalk.blue(
          `\n--- Showing ${totalRelationships} relationship${
            totalRelationships > 1 ? 's' : ''
          } for ${entityName}: "${result._id}" ---`,
        ),
      )
      relationships.forEach(({ name, data }: { name: string; data: Entities }) => {
        console.log('')
        console.log(chalk.blue(`--- ${name} ---`))
        console.log(
          columnify(data, {
            columnSplitter: ' | ',
            showHeaders: false,
            truncate: true,
            maxWidth: 100,
          }),
        )
      })
    }
  })
}

export const displaySummary = (totalSearchResults: number, searchQuery: string): void => {
  if (totalSearchResults > 0) {
    console.log(
      chalk.green(
        `\n🎉 Your search for ${highlightText(searchQuery)} returned ${totalSearchResults} result${
          totalSearchResults > 1 ? 's' : ''
        }`,
      ),
    )
  } else {
    console.log(chalk.red(`\n🤨 No results found for ${highlightText(searchQuery)}.\n`))
  }
}

export const parseSearchQuery = (searchQuery: string): SearchParserResult => {
  const options = { keywords: ['isEmpty'], tokenize: true, offsets: false }
  return searchQueryParser.parse(searchQuery, options) as SearchParserResult
}

const query = (dataStore: DataStore, searchQuery: string, entityName: string): void => {
  const entity = dataStore[entityName]
  const queryOptions: SearchParserResult = parseSearchQuery(searchQuery)
  const { results } = search(dataStore, entity, queryOptions)

  // Determine which value to highlight before displaying results
  const normalizedSearchText = normalizeText(queryOptions.text || [''])
  const highlightTerm = queryOptions.isEmpty ? queryOptions.isEmpty : normalizedSearchText

  displayResults(results, highlightTerm, entity.name)
  displaySummary(results.length, searchQuery)
}

export default query
