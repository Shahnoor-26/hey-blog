import parser from "html-react-parser";
import { Link } from "react-router-dom";
import { Service } from "../appwrite/configuration.js";

const textConverter = (htmlStr) => {
  try {
    if (!htmlStr) return "";
    const reader = new DOMParser();
    const document = reader.parseFromString(htmlStr, "text/html");
    return document.body.textContent || "";
  } catch (error) {
    console.log("Text Converter error", error);
  }
};

const Card = ({ $id, title, picture, content }) => {
  const element = parser(content) || <span>No Data Found</span>;
  const plaintext = textConverter(content);

  return (
    <Link to={`/article/${$id}`} className="h-auto w-auto">
      <div className="h-44 md:h-48 xl:h-52 w-full">
        <img
          src={picture ? Service.fileView(picture) : ""}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="h-auto w-full">
        <h3 className="text-base md:text-lg xl:text-xl text-center truncate">
          {title}
        </h3>
        <div className="truncate opacity-80">{plaintext}</div>
      </div>
    </Link>
  );
};

export default Card;
