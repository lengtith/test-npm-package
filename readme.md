1. npm init -y
2. npm install react react-dom
3. npm install --save-dev @babel/core @babel/cli @babel/preset-typescript @babel/preset-react babel-loader webpack webpack-cli webpack-dev-server typescript ts-loader @types/react @types/react-dom style-loader css-loader
4. npx tsc -init
5. npm install html-webpack-plugin
6. npx storybook@latest init
7. npm install tailwindcss postcss autoprefixer postcss-loader
   npx tailwindcss init -p

   # Sabai UI

[![npm version](https://badge.fury.io/js/react-spinners.svg)][npm_url]
[![downloads](https://img.shields.io/npm/dt/react-spinners.svg)][npm_url]
[![license](https://img.shields.io/npm/l/react-spinners.svg)][npm_url]

<!-- [![next version](https://badgen.net/npm/v/react-spinners/next)](https://www.npmjs.com/package/react-spinners/v/next) -->

[![Coverage Status](https://coveralls.io/repos/github/davidhu2000/react-spinners/badge.svg?branch=main)](https://coveralls.io/github/davidhu2000/react-spinners?branch=master)
![Dependency Count](https://badgen.net/bundlephobia/dependency-count/react-spinners)
![Types Included](https://badgen.net/npm/types/react-spinners)
![Tree Shaking Supported](https://badgen.net/bundlephobia/tree-shaking/react-spinners)

[npm_url]: https://www.npmjs.org/package/react-spinners



## Installation

With Yarn:

```bash
yarn add admin-ui-tith
```

With npm:

```bash
npm install --save admin-ui-tith
```

## Usage

Some component has their own default properties. You can overwrite the defaults by passing props into the components.

### Example

```tsx
import React from 'react';
import { Button} from "admin-ui-tith";

const App = () => {
  return (
    <div className="container mx-auto bg-white">
      <div className="px-20 py-20 flex flex-col gap-4">
        <Button colorScheme="secondary" variant="solid" icon="student" iconSize={24}>Sample Button</Button>
      </div>
    </div>
  )
}

export default App;