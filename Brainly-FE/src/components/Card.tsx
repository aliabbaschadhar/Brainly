import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "linkedin" | "facebook" | "instagram";
}

function Card({ title, link, type }: CardProps) {
  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 max-w-md mx-auto">
    
      <div className="flex justify-between items-center mb-4 min-h-20">
        <div className="flex items-center text-lg font-semibold text-gray-800">
          <ShareIcon />
          <div className="text-start ml-5"> {title}</div>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden bg-gray-100">
        {type === "twitter" && (
          <blockquote className="twitter-tweet px-4 py-2">
            <p lang="zxx" dir="ltr">
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </p>
          </blockquote>
        )}

        {type === "youtube" && (
          <iframe
            className="w-full h-56"
            src={link.replace("watch?v=", "embed/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}

        {type === "facebook" && (
          <iframe
            className="w-full h-56"
            src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(
              link
            )}&width=500`}
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}

        {type === "instagram" && (
          <iframe
            className="w-full h-56"
            src={`${link}/embed`}
            frameBorder="0"
            allowTransparency={true}
            allow="encrypted-media"
            allowFullScreen
          ></iframe>
        )}

        {type === "linkedin" && (
          <iframe
            className="w-full h-56"
            src={`https://www.linkedin.com/embed/feed/update/${encodeURIComponent(
              link
            )}`}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
}

export default Card;
