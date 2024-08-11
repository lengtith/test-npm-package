import React, { useState } from "react"
import { Button, Drawer, DrawerHeader, Input, LoadingModal, Modal, Select, Switch, Textarea } from "./components";

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
      <Select multiple onChange={() => { }} value={selectedItem} items={sampleItems}></Select>
    </div>
  )
}

export default App