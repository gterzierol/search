import React, { ReactNode } from "react";

interface InputProps {
  type?: string;
  handleSearchTermChange: (value: string) => void;
  searchTerm?: string;
  Icon?: ReactNode;
  label?: string;
  id: string;
}
const Input = ({
  type = "text",
  handleSearchTermChange,
  Icon,
  label,
  id = "input",
  searchTerm,
}: InputProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleSearchTermChange(value);
  };
  return (
    <div className=" w-full h-[66px] flex justify-center content-center bg-white text-dark-100">
      {Icon && <span className="flex items-center justify-center">{Icon}</span>}
      <div className="relative">
        <input
          type={type}
          onChange={onChange}
          id={id}
          className="block rounded-sm px-2.5 pb-2.5 pt-5 w-full h-full text-sm text-gray-900  focus:outline-none appearance-none peer"
          placeholder=" "
          value={searchTerm}
        />
        {label && (
          <label
            htmlFor={id}
            className="absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 right-0 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 "
          >
            {label}
          </label>
        )}
      </div>
    </div>
  );
};

export default Input;
