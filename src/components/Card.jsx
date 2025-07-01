import { Link } from "react-router-dom";
import { Service } from "../appwrite/configuration.js";

const Card = ({ $id, title, picture }) => {
  return (
    <Link to={`/article/${$id}`}>
      <div>
        <div>
          <img src={Service.fileView(picture)} alt={title} className="" />
        </div>
        <h3>{title}</h3>
      </div>
    </Link>
  );
};

export default Card;
