import React from "react";
import { ButtonUpload, Icon } from "../../../components";

interface ThumbnailInputProps {
  file: File;
  onFileSelect: (file: File) => void;
  onRemoveFile: () => void;
  url?: string;
  errorMessage?: string;
}

const ArrowPathRoundedSquareIcon: React.FC<{ className: string }> = ({
  className,
}) => {
  return (
    <svg
      fill="none"
      strokeWidth={1.5}
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
      />
    </svg>
  );
};

const ThumbnailInput: React.FC<ThumbnailInputProps> = ({
  file,
  onFileSelect,
  onRemoveFile,
  url,
  errorMessage,
}) => {
  return (
    <div>
      {url && !file && (
        <label
          htmlFor="selected-exist"
          className="w-full h-[220px] relative group"
        >
          <div className="relative w-full h-full">
            <img
              className="object-cover w-full h-full rounded-lg"
              src={url}
              alt="Preview"
            />
          </div>
          <div className="absolute top-0 right-0 w-full h-full rounded-lg bg-black/50 justify-center items-center hidden cursor-pointer group-hover:flex">
            <ArrowPathRoundedSquareIcon className="w-8 h-8 text-gray-400" />
          </div>
          <input
            hidden
            id="selected-exist"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file: any = e.target.files && e.target.files[0];
              onFileSelect(file);
            }}
          />
        </label>
      )}

      {file && (
        <div className="w-full h-[220px] relative ">
          <div className="relative w-full h-full">
            <img
              className="object-cover w-full h-full rounded-lg"
              src={URL.createObjectURL(file)}
              alt={file.name}
            />
            <div className="absolute rounded-full -top-3 -right-3 w-7 h-7 flex justify-center items-center bg-[#D9D9D9]">
              <button onClick={onRemoveFile}>
                <Icon icon="cancel" className="text-gray-800" size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
      {!url && !file && (
        <div>
          <ButtonUpload
            size="md"
            variant="outline"
            colorScheme="primary"
            className={`w-full h-[220px] bg-gray-50 focus:border-[#2B2F7E] ${
              !url && errorMessage ? "border-red-500" : "border-gray-300"
            }`}
            topIcon={<Icon icon="add" size={24} />}
            onFileSelect={onFileSelect}
            accept="image/*"
          >
            Upload
          </ButtonUpload>
        </div>
      )}
      {!url && errorMessage && (
        <span className="text-red-500 text-sm">{errorMessage}</span>
      )}
    </div>
  );
};

export { ThumbnailInput };
