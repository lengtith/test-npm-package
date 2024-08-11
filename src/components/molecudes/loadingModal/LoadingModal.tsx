import { Modal, Button, ButtonIcon } from "../../../components";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

interface LoadingModalProps {
  loading: boolean;
  progress?: number | null;
  error: boolean;
  delay?: number;
}

const LoadingModal: React.FC<LoadingModalProps> = ({
  loading,
  progress,
  error = false,
  delay = 3000,
}) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(
    loading || error || isSuccess
  );
  const [isError, setIsError] = useState<boolean>(error);
  const isProgress =
    progress != undefined &&
    progress != null &&
    progress >= 0 &&
    progress < 100;

  useEffect(() => {
    if (!loading && !error) {
      setIsSuccess(true);
      const timer = setTimeout(() => {
        setIsSuccess(false);
        setIsLoading(false);
        setIsError(false);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(() => loading || error || isSuccess);
      setIsError(() => error);
    }
  }, [loading, error]);

  const handleClose = () => {
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isLoading} onClose={handleClose}>
      <div className="relative p-14 w-full h-fit flex flex-col items-center gap-10 justify-center">
        {isError && (
          <>
            <img
              src="./images/failed.png"
              alt="failed"
              className="w-[60px] h-[60px] object-center"
            />
            <p className="w-[250px] text-xl font-medium text-center">
              Your data upload encountered an error. Please try again!
            </p>
          </>
        )}
        {!isError && isProgress && !isSuccess && (
          <>
            <p className="text-xl font-medium">Your Data is Uploading...</p>
            <ClipLoader size={50} color="#2B2F7E" loading={true} />
            <div className="w-full h-4 bg-[#D9D9D9] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2B2F7E] rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xl">Please wait, {progress}% complete</p>
          </>
        )}
        {!isError && !isProgress && !isSuccess && (
          <>
            <p className="text-xl font-medium">Your Data has Uploaded</p>
            <ClipLoader size={50} color="#2B2F7E" loading={true} />
            <p className="text-xl">Please wait!</p>
          </>
        )}
        {!isError && !isProgress && isSuccess && (
          <>
            <img
              src="./images/success.png"
              alt="success"
              className="w-[60px] h-[60px] object-center"
            />
            <p className="w-[250px] text-xl font-medium text-center">
              Your data has been uploaded successfully!
            </p>
          </>
        )}
      </div>
    </Modal>
  );
};

export { LoadingModal };
