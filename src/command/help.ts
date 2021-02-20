import chalk from 'chalk'

export default function (): void {
  console.log(
    chalk.magenta(`

  insight-cli Help
  ----------------

  Your options are (S)earch, (H)elp or (E)xit.

  (S)earch:
    - Searching Options
      - Data source:
        - You will be prompted to search on a specific data source
          The possible options are: (U)sers, (O)rganizations, (T)ickets

      - Keyword search:
        - Type the keyword Eg. 'admin' when prompted and press Enter
          Eg. 'Search within users: admin'
          NOTE: Search is case insensitive

      - Empty value search: 
        - Type 'isEmpty:key' where 'key' is the name of the empty field name you wish to search for 
          Eg. 'Search within tickets: isEmpty:description'

  (H)elp:
    Displays this message

  (E)xit:
    Will exit this program
  `),
  )
}
