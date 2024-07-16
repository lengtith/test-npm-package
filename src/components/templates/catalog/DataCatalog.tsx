import { Icon } from "../../../components";
import { IconName } from "../../atoms/icon/Icon";
import React, { ReactNode, useEffect, useRef, useState } from "react";

interface SortData {
  field: string;
  sort: null | "ASC" | "DESC";
}

interface Layout {
  name: string;
  viewAs: (
    data: any[],
    loading: boolean,
    onItemClick: (itemData: any) => void,
    onSort: (sortData: SortData) => void
  ) => ReactNode;
  iconName: IconName;
}

interface Filter {
  name: string;
  component: (onChange: (value: string) => void) => ReactNode;
}

interface DataCatalogProps {
  data: any[];
  loading: boolean;
  layouts: Layout[];
  filters: Filter[];
  onScroll(): void;
  onItemClick: (itemData: any) => void;
  onSort: (sortData: SortData) => void;
  onFilter: ({ name, value }: any) => void;
  onFetchMoreData?: () => void;
}

const DataCatalog: React.FC<DataCatalogProps> = ({
  data,
  loading,
  layouts,
  filters,
  onSort,
  onFilter,
  onItemClick,
  onFetchMoreData,
}) => {
  const defaultLayoutName = layouts[0].name;

  const [currentLayoutName, setCurrentLayoutName] = useState<string>(() => {
    return localStorage.getItem("currentLayoutName") || defaultLayoutName;
  });

  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer.observe && elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [data, loading]);

  const onIntersection = (entries: any) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting) {
      onFetchMoreData && onFetchMoreData();
    }
  };

  useEffect(() => {
    localStorage.setItem("currentLayoutName", currentLayoutName);
  }, [currentLayoutName]);

  const currentLayout =
    layouts.find((layout) => layout.name === currentLayoutName) || layouts[0];

  const handleLayoutChange = (layout: Layout) => {
    setCurrentLayoutName(layout.name);
  };

  return (
    <div
      className={`w-full min-h-screen ${currentLayout.name == "item" ? "bg-[#F5F5F5]" : ""
        }`}
    >
      {/* header */}
      <div className="flex justify-between items-center px-8 py-6">
        {/* select */}
        <div className="flex gap-5">
          {filters.map((item: any, index) => {
            return (
              <div key={index}>
                {item.component((value: string) =>
                  onFilter({ name: item.name, value })
                )}
              </div>
            );
          })}
        </div>
        {/* icon change layout */}
        <div className="flex gap-5">
          {layouts.map((item, index) => {
            return (
              <Icon
                key={index}
                icon={item.iconName}
                className={`w-6 h-6 cursor-pointer ${currentLayout.name == item.name ? "text-[#2B2F7E]" : ""
                  }`}
                onClick={() => handleLayoutChange(item)}
              />
            );
          })}
        </div>
      </div>
      {/* body */}
      <div>{currentLayout.viewAs(data, loading, onSort, onItemClick)}</div>
      <div ref={elementRef} className="w-full h-1" />
    </div>
  );
};

export default DataCatalog;
