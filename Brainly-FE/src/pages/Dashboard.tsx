import { useState } from "react";
import { Button } from "../components/Button";
import Card from "../components/Card";
import CreateContentModel from "../components/CreateContentModel";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import Sidebar from "../components/Sidebar";
import { UseContent } from "../hooks/UseContentHook";

function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const contents = UseContent();
  return (
    <>
      <Sidebar />

      <div className="p-4 lg:ml-72 md:ml-52 bg-[#F8FAFC] min-h-screen">
        <CreateContentModel
          open={modelOpen}
          onClose={() => {
            setModelOpen(false);
          }}
        />
        <div className="flex justify-end gap-4 mt-2 ">
          <Button
            onClick={() => {
              setModelOpen(true);
            }}
            text="Add Link"
            variant="primary"
            startIcon={<PlusIcon />}
          />
          <Button
            text="Share Brain"
            variant="secondary"
            startIcon={<ShareIcon />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
          {/* {JSON.stringify(contents)} */}
          {contents.map(({ title, link, type }) => {
            return <Card title={title} link={link} type={type} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
