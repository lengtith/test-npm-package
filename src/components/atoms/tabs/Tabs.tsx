import React, { useState, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TabItem {
  id: string | number;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  "aria-label": string;
  selecteTab?: string | number;
  items: TabItem[];
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  className?: string;
  children: (item: TabItem) => ReactNode;
}

interface TabProps {
  title: string;
  className?: string;
  children: ReactNode;
}

const Tab: React.FC<TabProps> = ({ children, className }) => {
  return <div className={twMerge("h-full p-5", className)}>
    {children}
  </div>;
};

const Tabs: React.FC<TabsProps> = ({ "aria-label": ariaLabel,
  selecteTab,
  items,
  rounded = "full",
  className,
  children }) => {
  const [selectedTab, setSelectedTab] = useState<string | number>(selecteTab || items[0]?.id);

  const roundedClass = `rounded-${rounded}`;

  const handleTabClick = (id: string | number) => {
    setSelectedTab(id);
  };

  return (
    <div className={twMerge("flex flex-col", className)}>
      <div role="tablist" aria-label={ariaLabel} className="flex-none flex bg-gray-100 rounded-full">
        {items.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={selectedTab === item.id}
            onClick={() => handleTabClick(item.id)}
            className={`w-full px-4 py-2 ${selectedTab === item.id ? "bg-blue-500 text-white " : ""} ${roundedClass}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="flex-grow">
        {items.map((item) => (
          <div
            key={item.id}
            role="tabpanel"
            hidden={selectedTab !== item.id}
          >
            {selectedTab === item.id && children(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export { Tabs, Tab };
