<p align="center">
  <img src="https://cdn.iconscout.com/icon/free/png-256/zendesk-282559.png" alt="Logo" width="80" height="80">
  <h1 align="center">insight-cli</h1>
  <p>A simple JSON searching application</p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#assumptions">Assumptions</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
    <li><a href="#troubleshooting">Troubleshooting</a></li>
  </ol>
</details>

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

1. Build the application

   ```sh
   npm run build
   ```

## Usage

TBD

## Testing

To run the tests for the application, execute:

```sh
npm run test
```

To watch files for changes and re-run the tests, execute:

```sh
npm run test:watch
```

## Assumptions

TBD

## Acknowledgements

TBD

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
