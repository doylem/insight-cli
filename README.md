<p align="center">
  <img src="https://cdn.iconscout.com/icon/free/png-256/zendesk-282559.png" alt="Logo" width="80" height="80">
  <h1 align="center">insight-cli</h1>
  <p>A Node JSON searching application</p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#before-we-get-started">Before we get started</a></li>
    <li><a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#testing">Testing</a></li>
    <li><a href="#quality">Quality</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
    <li><a href="#troubleshooting">Troubleshooting</a></li>
  </ol>
</details>

## Before we get started

### Why the name?

A quick search for 'Zen' revealed that "Zen emphasizes rigorous self-restraint, meditation-practice, _insight_ into the nature of mind"... sounded like a cool name for a searching app too so I thought, why not! 😉

### Design

I've documented my design choices over in [DESIGN.md](DESIGN.md)

## Getting Started

👋 Hi Zendesk devs 😊

First up, we need to make sure your chosen environment is setup correctly and the correct software is installed 👌
NOTE: The following instructions will assume that you are on Mac OS or a flavour of Linux such as Ubuntu.

### Prerequisites

#### Node (via nvm)

I recommend using [Node Version Manager (nvm)][nvm] for greater control over your Node and npm versions for this application, and so as to not affect any other applications which use Node on your machine. To install nvm, please follow [these instructions][installing-nvm] for your operating system.

Alternateively, you may [install Node and npm globally](#installing-node-and-npm-globally) if you do not wish to use nvm.

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/doylem/insight-cli.git
   ```

1. Change directory to root of the project

   ```sh
   cd insight-cli
   ```

1. Install Node and npm

   ```sh
   $ nvm install

   Found '~/src/insight-cli/.nvmrc' with version <14.15.5>
   Downloading and installing node v14.15.5...
   (...)
   Now using node v14.15.5 (npm v6.14.11)
   ```

   An `.nvmrc` file exists in the root of the project to ensure that the correct version is installed.

1. Install dependencies

   ```sh
   npm install
   ```

## Usage

1. Build and run the application

   ```sh
   npm start
   ```

1. Follow the prompts to search the data files

- (S)earch:

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

- (H)elp:
  Displays this message

- (E)xit:
  Will exit this program

## Testing

To run the tests for the application, execute:

```sh
npm run test
```

To watch files for changes and re-run the tests, execute:

```sh
npm run test:watch
```

## Quality

We rely on eslint and prettier to ensure high code quailty and consistency. To lint this app, execute:

```sh
npm run lint
```

## Acknowledgements

### Dependencies

Some third party dependencies were chosen where implementing this myself would have been cumbersome our out of scope for the purposes of this code challenge. The third party dependencies used have been justified below.

- [Chalk](https://github.com/chalk/chalk)
  - A much nicer experience for full colour rich text on the command line
  - I started out doing this the manual way with octal commands and it looked super ugly and unreadable
- [Columnify](https://github.com/timoxley/columnify)
  - Neater presentation of tabular like data
- [Lodash.filter](https://www.npmjs.com/package/lodash.filter)
  - For easier object filtering logic
  - Note: This is only the filter package from lodash, and not the entire suite of tools which i did not need
- [Ora](https://github.com/sindresorhus/ora)
  - Elegant terminal spinners to display visual feedback when loading large files in to memory
- [readline-sync](https://github.com/anseki/readline-sync)
  - Synchronous-like Readline rather than having nested callbacks
  - Nicer to work with and easier to read & understand than the native `fs.readline`
- [search-query-parser](https://github.com/nepsilon/search-query-parser)
  - A parsing tool which enabled more advanced search query syntax such as `isEmpty:key` and a nice way to standardise and tokenise search parameters
  - Allows for flexibility for future potential searching requirements

## Troubleshooting

### Installing Node and npm globally

- #### Node installation on MacOS via Homebrew

```sh
$ brew update && brew install node@14.15.5
```

NOTE: npm will be installed as part of this process.

- #### Node installation on Ubuntu

```sh
$ sudo apt install nodejs
$ sudo apt install npm
```

#### Confirmation

Once Node and npm are installed, you should be able to verify which versions are you currently on via the following commands:

```sh
$ node -v
14.15.5

$ npm -v
6.14.11
```

<!-- LINKS -->

[nvm]: https://github.com/nvm-sh/nvm
[installing-nvm]: https://github.com/nvm-sh/nvm#installing-and-updating
