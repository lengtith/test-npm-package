   # Sabai UI

[![npm version](https://badge.fury.io/js/sabai-ui-dev.svg)][npm_url]
[![downloads](https://img.shields.io/npm/dt/sabai-ui-dev.svg)][npm_url]
[![license](https://img.shields.io/npm/l/sabai-ui-dev.svg)][npm_url]


[npm_url]: https://www.npmjs.org/package/sabai-ui-dev



## Installation

With Yarn:

```bash
yarn add sabai-ui-dev
```

With npm:

```bash
npm install --save sabai-ui-dev
```

## Usage

Some component has their own default properties. You can overwrite the defaults by passing props into the components.

### Example

```tsx
import React from 'react';
import { Button } from "sabai-ui-dev";

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