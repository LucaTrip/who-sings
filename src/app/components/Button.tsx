import React from "react";

type Props = {
  text: string;
  buttonTypology: string;
  onHandleClick?: () => void;
};

const Button: React.FC<Props> = ({ text, buttonTypology, onHandleClick }) => {
  return (
    <>
      {buttonTypology === "single" ? (
        <button
          className="bg-blue-500 rounded-lg text-white font-semibold text-xl py-2 px-4"
          onClick={onHandleClick}
        >
          {text}
        </button>
      ) : (
        <button
          className="bg-blue-500 rounded-lg text-white font-semibold text-xl py-2 px-4 m-4 w-52"
          onClick={onHandleClick}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
