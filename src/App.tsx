import React, { useState } from "react"

interface Item {
  id: number | string;
  name: string;
}

const App = () => {
  const [selectedItem, setSelectedItem] = useState([]);
  const sampleItems: Item[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];

  return (
    <div className="container mx-auto p-20">
      App
    </div>
  )
}

export default App