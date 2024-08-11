import React from "react";
import { Avatar, Icon, Menu } from "./../../../components";

export interface NavbarProps {
  expand?: boolean;
  toggleSidebar: () => void;
}


const Navbar: React.FC<NavbarProps> = ({ expand, toggleSidebar }) => {

  const menuItems = [
    {
      label: <div className="w-max flex-none p-2 flex items-center space-x-2">
        <Avatar
          name="Avatar"
          radius="full"
          size="md"
          src="https://api.dicebear.com/9.x/adventurer/svg?seed=Cookie"
        />
        <div className="flex items-start flex-col justify-start">
          <p className="text-sm">Nita</p>
          <p className="text-xs text-blue-500">nita@gmail.com</p>
        </div>
      </div>,
    },
    {
      label: <div className="p-2 flex items-center space-x-2 text-gray-900 hover:bg-gray-100">
        <Icon icon="logout" size={16} />
        <p>Logout</p>
      </div>,
    }
  ];

  return (
    <div className="h-[64px] w-full py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center px-4">
          <div className="flex items-center space-x-4">
            {/* Sidebar Toggle */}
            <div onClick={toggleSidebar} aria-label="toggle-sidebar">
              {expand ? (
                <Icon icon="cancel" size={25} className="cursor-pointer" />
              ) : (
                <Icon icon="menu" size={25} className="cursor-pointer" />
              )}
            </div>

            {/* Logo and Title */}
            <img src="./images/logo.png" alt="logo" className="w-10 h-10 rounded-full" />
            <h1 className="text-gray-800 font-semibold text-[26px]">
              SabaiCode
            </h1>
          </div>

          {/* Search Input */}
          <div className="relative flex-grow max-w-[568px] ml-[85px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Icon icon="search" size={25} className="text-gray-500" />
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-[568px] h-[44px] pl-10 pr-3 text-md text-gray-900 bg-white border border-gray-300 rounded-[10px] shadow-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search"
              required
            />
          </div>
        </div>
        <div className="px-8">
          <Menu
            buttonContent={<Avatar
              name="Avatar"
              radius="full"
              size="md"
              src="https://api.dicebear.com/9.x/adventurer/svg?seed=Cookie"
            />}
            items={menuItems} />
        </div>
      </div>
    </div>
  );
};

export { Navbar };
