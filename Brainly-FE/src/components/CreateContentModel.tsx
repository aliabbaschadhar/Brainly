import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Instagram = "instagram",
  Facebook = "facebook",
  LinkedIn = "linkedin",
}

function CreateContentModel({ open, onClose }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const validateTags = (tags: string): boolean => {
    const tagsArray = tags.split(",").map((tag) => tag.trim());
    if (tagsArray.length < 3 || tagsArray.length > 5) {
      setErrorMessage("Please provide 3 to 5 tags.");
      return false;
    }
    return true;
  };

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const tags = tagRef.current?.value;

    if (!title || !link || !tags) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (!validateTags(tags)) {
      return;
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim());

    const payload = { title, link, type, tags: tagsArray };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("Authorization token is missing.");
        return;
      }

      await axios.post(`${BACKEND_URL}/api/v1/content`, payload, {
        headers: { Authorization: token },
      });
      alert("Content added successfully!");
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error adding content:", error);
      setErrorMessage("Failed to add content. Please try again.");
    }
  }

  return (
    <>
      <div>
        {open && (
          <div className="bg-slate-900 fixed top-0 left-0 w-screen h-screen opacity-98 flex justify-center items-center">
            <span className="bg-white opacity-100 p-4 w-full max-w-sm h-4/6 rounded-lg text-lg font-bold">
              <div className="flex justify-end mb-1">
                <div onClick={onClose}>
                  <CrossIcon />
                </div>
              </div>

              <div className="mt-2">
                <Input ref={titleRef} placeholder="Title" />
                <Input ref={linkRef} placeholder="Link" />
                <Input ref={tagRef} placeholder="Tags (comma-separated)" />
              </div>

              <div className="flex flex-col justify-center items-center gap-2">
                <h1 className="font-semibold mt-7 text-xl ">
                  Select the type :
                </h1>
                <div className="grid grid-cols-3 lg:grid-cols-2 gap-4 mt-4">
                  {Object.values(ContentType).map((contentType) => (
                    <Button
                      key={contentType}
                      onClick={() => setType(contentType)}
                      text={
                        contentType.charAt(0).toUpperCase() +
                        contentType.slice(1)
                      }
                      variant={type === contentType ? "primary" : "secondary"}
                    />
                  ))}
                </div>
              </div>

              {errorMessage && (
                <div className="text-red-500 mt-2">{errorMessage}</div>
              )}

              <div className="flex justify-center mt-12 px-7">
                <Button
                  onClick={addContent}
                  fullWidth={true}
                  text="Submit"
                  variant="primary"
                />
              </div>
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default CreateContentModel;
