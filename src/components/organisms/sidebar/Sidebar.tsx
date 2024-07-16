// Sidebar.tsx
import React from "react";
import { Icon } from "./../../../components";
import { IconName } from "../../atoms/icon/Icon";

interface SidebarItem {
  icon: string;
  text: string;
  path: string;
  disabled?: boolean;
}

interface SidebarProps {
  expand: boolean;
  items: SidebarItem[];
  onSelectItem: (item: SidebarItem) => void;
  activeItem: SidebarItem;
}

const Sidebar: React.FC<SidebarProps> = ({
  expand,
  items,
  activeItem,
  onSelectItem,
}) => {
  const isActive = (path: string) => {
    return activeItem?.path === path ? "bg-blue-900 text-white" : "";
  };

  const renderIcon = (icon: IconName, path: string) => (
    <Icon icon={icon} size={25} className={`w-6 h-6 ${isActive(path)}`} />
  );

  const handleItemSelect = (item: SidebarItem) => {
    if (!item.disabled && onSelectItem) {
      onSelectItem(item);
    }
  };

  return (
    <div
      data-testid="sidebar"
      className={`px-2.5 py-5 h-full overflow-x-hidden overflow-y-auto transition-width duration-300 ${
        expand ? "w-[250px]" : "w-[85px]"
      }`}
    >
      <div className="h-full flex flex-col gap-1">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => handleItemSelect(item)}
            className={` flex rounded-lg gap-4 items-center justify-start px-5 h-10 ${
              item.disabled ? "opacity-50 cursor-default" : "cursor-pointer"
            } ${isActive(item.path)}`}
          >
            <div>{renderIcon(item.icon as IconName, item.path)}</div>
            <h1
              className={`font-semibold ${expand ? "" : "hidden"} `}
            >
              {item.text}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Sidebar };
