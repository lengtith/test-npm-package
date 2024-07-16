import React, { useState } from "react";
import { Modal } from "../../../components";

type ModalDeleteProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleDelete: () => void;
};

const ModalDelete: React.FC<ModalDeleteProps> = ({
  isOpen,
  setIsOpen,
  handleDelete,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <Modal open={isOpen} size="2xl">
      <form
        onSubmit={handleDelete}
        className="flex flex-col gap-5 p-6 bg-white"
      >
        <div className="flex space-x-4 items-center">
          <div className="p-2.5 bg-red-100 text-red-500 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold">Confirm Delete</h3>
        </div>
        <p className="text-gray-500">
          Are you sure you want to delete this course? All of your data will be{" "}
          <span className="text-red-600 font-medium">permanently</span> removed
          from our servers forever. This action cannot be undone. Type "
          <span className="font-medium">Confirm Delete</span>" to enable the
          delete button.
        </p>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:border-blue-500 outline-none transition-colors duration-200 ease-in-out"
          placeholder="Type here..."
        />
        <div className="flex justify-end gap-2">
          <button
            className="border border-gray-300 px-4 py-2.5 rounded-xl"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            disabled={inputValue !== "Confirm Delete"}
            className={`text-white px-4 py-2.5 rounded-xl ${
              inputValue === "Confirm Delete" ? "bg-red-600" : "bg-red-400"
            }`}
          >
            Permanently Delete
          </button>
        </div>
      </form>
    </Modal>
  );
};

export { ModalDelete };
