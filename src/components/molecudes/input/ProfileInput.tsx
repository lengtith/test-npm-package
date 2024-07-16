import { Icon } from "../../../components";
import React from "react";

interface ProfileInputProps {
  file?: File;
  url?: string;
  onFileSelect: (file: File) => void;
}

const ProfileInput: React.FC<ProfileInputProps> = ({
  file,
  url,
  onFileSelect,
}) => {
  const guestProfile =
    "https://secure.gravatar.com/avatar/15f8001624bd5b624aa2c00d0d25b1f4?s=168&d=mm&r=g";
  return (
    <div className="w-max flex flex-col gap-2.5 items-center">
      {!file && (
        <img
          src={url || guestProfile}
          alt="user profile"
          className="size-16 object-cover object-center rounded-full"
        />
      )}
      {file && (
        <img
          src={file && URL.createObjectURL(file)}
          alt="user profile"
          className="size-16 object-cover object-center rounded-full"
        />
      )}
      <label htmlFor="selected-user-profile" className="cursor-pointer">
        <div className="flex gap-3.5 items-end">
          <Icon icon="arrow-up-tray" className="size-4" />
          <p className="text-sm">upload profile</p>
        </div>
      </label>
      <input
        hidden
        id="selected-user-profile"
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file: any = e.target.files && e.target.files[0];
          onFileSelect(file);
        }}
      />
    </div>
  );
};

export { ProfileInput };
