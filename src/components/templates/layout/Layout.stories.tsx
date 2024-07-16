import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, within, expect } from "@storybook/test";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Layout } from "./Layout";

interface SidebarItem {
  icon: string;
  text: string;
  path: string;
  disabled?: boolean;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    icon: "dashboard",
    text: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: "contact",
    text: "Contact",
    path: "/contacts",
    disabled: true,
  },
  {
    icon: "invoice",
    text: "Invoice",
    path: "/invoices",
    disabled: true,
  },

  {
    icon: "course",
    text: "Course",
    path: "/courses",
  },
  {
    icon: "class",
    text: "Class",
    path: "/classes",
  },
  {
    icon: "scholarship",
    text: "Scholarship",
    path: "/scholarships",
  },
  {
    icon: "material",
    text: "Material",
    path: "/materials",
  },
  {
    icon: "student",
    text: "Student",
    path: "/students",
  },
  {
    icon: "coach",
    text: "Coach",
    path: "/coaches",
  },
  {
    icon: "report",
    text: "Report",
    path: "/reports",
    disabled: true,
  },
];

const meta: Meta<typeof Layout> = {
  title: "Sabaicode/Templates/Layout",
  component: Layout,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/proto/1ck3QkLujqYR52ayf0evpX/Sabaicode-Admin-App?page-id=0%3A1&node-id=2669-2874&viewport=-20508%2C-98%2C1.17&t=KqAgOeh9JYJCuVvW-1&scaling=min-zoom&starting-point-node-id=2634%3A3107&show-proto-sidebar=1",
    },
  },
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof Layout> = {
  render: (args) => (
    <Router>
      <LayoutWrapper {...args} />
    </Router>
  ),
  args: {
    children: <div data-testid="content-area">Content goes here</div>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test for sidebar item click
    const itemsToSelect = ["Course", "Class"];
    for (const itemText of itemsToSelect) {
      const sidebarItem = await canvas.findByText(itemText);
      await userEvent.click(sidebarItem);

      // Wait for the class to be applied
      await waitFor(() => {
        expect(sidebarItem).toHaveClass("text-[16px] font-semibold");
      });
    }

    // Test for sidebar toggle
    const toggleButton = await canvas.findByLabelText("toggle-sidebar");
    await userEvent.click(toggleButton);

    // Wait for the sidebar width to change
    await waitFor(() => {
      const sidebarElement = canvas.getByTestId("sidebar");
      expect(sidebarElement.className.includes("w-[85px]")).toBe(true);
    });

    await userEvent.click(toggleButton);
    await waitFor(() => {
      const sidebarElement = canvas.getByTestId("sidebar");
      expect(sidebarElement.className.includes("w-[250px]")).toBe(true);
    });
  },
};

const LayoutWrapper = ({ children }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<SidebarItem>({
    icon: "dashboard",
    text: "Dashboard",
    path: "/dashboard",
  });

  const handleItemClick = (item: SidebarItem) => {
    navigate(item.path);
  };

  useEffect(() => {
    const item = SIDEBAR_ITEMS.find((item) =>
      location.pathname.startsWith(item.path)
    );
    if (item) {
      setActiveItem(item);
    }
  }, [location]);

  return (
    <Layout
      items={SIDEBAR_ITEMS}
      onSelectItem={handleItemClick}
      activeItem={activeItem}
    >
      <div className="p-10">{children}</div>
    </Layout>
  );
};
