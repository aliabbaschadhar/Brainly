import { ForwardedRef } from "react";

interface InputProps {
  placeholder: string;
  ref?: ForwardedRef<HTMLInputElement>;
}

export function Input({ placeholder, ref }: InputProps) {
  return (
    <>
      <div className="p-3">
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          className="w-full px-4 py-1.5 border-2 border-gray-700 rounded-md text-white font-semibold bg-gray-700 focus:outline-none  focus:border-gray-400 shadow-sm hover:shadow-lg transition ease-in-out duration-200 placeholder-gray-400"
        />
      </div>
    </>
  );
}
