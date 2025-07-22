import { Link } from "react-router-dom";
import { Service } from "../appwrite/configuration.js";
import { converter } from "./utilities.js";

const Card = ({ $id, title, picture, content }) => {
  const source = picture ? Service.fileView(picture) : null;
  const plaintext = content ? converter(content) : "No Data Found!";

  return (
    <Link
      to={`/article/${$id}`}
      className="h-full w-full block p-2 truncate outline-none"
      tabIndex={-1}
    >
      <div className="h-44 md:h-48 xl:h-52 w-full">
        <img
          src={source}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div>
        <h3 className="px-2 py-1 text-base md:text-lg xl:text-xl text-center truncate">
          {title}
        </h3>
        <div className="px-2 truncate opacity-80">{plaintext}</div>
      </div>
    </Link>
  );
};

export default Card;
