import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  startIcon?: ReactElement;
  text: string;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantClass = {
  // primary: "bg-[#7E1891] text-white",
  primary: "bg-blue-600 text-white",
  secondary: "bg-[#d9ddee] text-[#7164c0]",
};

const defaultStyles =
  "rounded-md font-semibold px-5 py-2.5 flex justify-center items-center cursor-pointer";

export function Button({
  onClick,
  variant,
  text,
  startIcon,
  fullWidth,
  loading,
}: ButtonProps) {
  return (
    <>
      <button
        disabled={loading}
        onClick={onClick}
        className={`${variantClass[variant]} ${defaultStyles} ${
          fullWidth ? "w-full" : ""
        } ${loading ? "opacity-50" : ""}`}
      >
        <div className="pr-3">{startIcon}</div>
        {text}
      </button>
    </>
  );
}

// gray:{
//   100 : #eeeeef,
//   200 : #9492db,
//   600 : #95989c
// }
// purple:{
//   200 : #d9ddee,
//   500 : #9492db,
//   600 : #7164c0
// }
