import { TwitterIcon } from "../icons/TwitterIcon";
import { Logo } from "../icons/Logo";
import { SidebarItem } from "./SidebarItems";
import { VideoIcon } from "../icons/VideoIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { TagIcon } from "../icons/TagIcon";

function Sidebar() {
  return (
    <>
      <div className="h-screen lg:w-72 w-52 bg-white fixed border-r-2 border-slate-200 left-0 top-0 ">
        <div className="flex items-center text-3xl font-semibold pt-3 pl-1 ">
          <div className="text-blue-600 h-13 w-13">
            <Logo />
          </div>
          Second Brain
        </div>
        <div className="pt-12 pl-6 flex flex-col gap-4">
          <SidebarItem text="Tweets" icon={<TwitterIcon />} />
          <SidebarItem text="Videos" icon={<VideoIcon />} />
          <SidebarItem text="Documents" icon={<DocumentIcon />} />
          <SidebarItem text="Links" icon={<LinkIcon />} />
          <SidebarItem text="Tags" icon={<TagIcon />} />
        </div>
      </div>
    </>
  );
}

export default Sidebar;
