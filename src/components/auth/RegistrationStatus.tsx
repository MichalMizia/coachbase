"use client";

import { classNames } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface RegistrationStatusProps {
  isFormInInitialState: boolean;
  className?: string;
  onSecondButtonClick: () => void;
  onFirstButtonClick: () => void;
}

const RegistrationStatus = ({
  isFormInInitialState,
  onSecondButtonClick,
  onFirstButtonClick,
  className,
}: RegistrationStatusProps) => {
  return (
    <div
      className={classNames(
        "flex items-center justify-center px-8",
        className!
      )}
    >
      <button
        type="button"
        className={classNames(
          "flex h-10 w-10 items-center justify-center rounded-full border-2 border-white  font-semibold transition-all",
          !isFormInInitialState
            ? "bg-gray-300 text-black"
            : "bg-blue-600 text-white"
        )}
        onClick={onFirstButtonClick}
      >
        1
      </button>
      <div
        className={classNames(
          "relative mx-2.5 h-2 w-full flex-1 overflow-hidden rounded-xl bg-gray-300 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:-translate-x-1/2 after:bg-blue-600 after:transition-all",
          isFormInInitialState ? "" : "after:-translate-x-0"
        )}
      />
      <button
        // type="button"
        className={classNames(
          "flex h-10 w-10 items-center justify-center rounded-full border-2 border-white  font-semibold transition-all",
          isFormInInitialState
            ? "bg-gray-300 text-black"
            : "bg-blue-600 text-white"
        )}
        // onClick={onSecondButtonClick}
      >
        2
      </button>
    </div>
  );
};

export default RegistrationStatus;
