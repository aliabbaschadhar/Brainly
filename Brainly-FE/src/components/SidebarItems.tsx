import { ReactElement } from "react";

export function SidebarItem({ text, icon }: itemProps) {
  return (
    <>
      <div className="flex justify-start items-center py-2 cursor-pointer hover:bg-gray-200 rounded max-w-60 pl-4 transition-all duration-400">
        <div className="pr-4">{icon}</div>
        <div className="font-medium">{text}</div>
      </div>
    </>
  );
}

interface itemProps {
  text: string;
  icon: ReactElement;
}
