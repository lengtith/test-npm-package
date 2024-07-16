// Layout.tsx
import React, { ReactNode, useState } from "react";
import { Navbar, Sidebar } from "./../../organisms";

interface SidebarItem {
  icon: string;
  text: string;
  path: string;
  disabled?: boolean;
}

export interface LayoutProps {
  children: ReactNode;
  items: SidebarItem[];
  onSelectItem: (item: SidebarItem) => void;
  activeItem: SidebarItem;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  items,
  onSelectItem,
  activeItem,
}) => {
  const [expand, setExpand] = useState(
    localStorage.getItem("sidebarOpen") === "true"
  );

  const toggleExpand = () => {
    const updatedExpand = !expand;
    setExpand(updatedExpand);
    localStorage.setItem("sidebarOpen", updatedExpand.toString());
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar expand={expand} toggleSidebar={toggleExpand} />
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar
          expand={expand}
          items={items}
          activeItem={activeItem}
          onSelectItem={onSelectItem}
        />
        <div className="flex flex-1 rounded-t-3xl overflow-auto bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export { Layout };
