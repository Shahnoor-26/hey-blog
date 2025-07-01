import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Service } from "../appwrite/configuration.js";
import { Button, Container } from "../components";
import parse from "html-react-parser";

const Article = () => {
  const [article, updateArticle] = useState(null);
  const documentId = useParams();
  const navigate = useNavigate();

  const userdata = useSelector((state) => state.auth.userdata.userdata);

  const isAuthor =
    article && userdata ? article.userId === userdata.$id : false;

  useEffect(() => {
    if (documentId) {
      Service.findDocument(documentId)
        .then((document) => {
          if (document) updateArticle(document);
        })
        .catch((error) => console.log("Unable To Find Article! ", error));
    } else navigate("/");
  }, [documentId, navigate]);

  const kill = () => {
    try {
      Service.documentDelete(documentId).then((status) => {
        if (status) {
          Service.fileDelete(article.picture);
          navigate("/");
        }
      });
    } catch (error) {
      console.log("Unable To Delete Article! ", error);
    }
  };

  return (
    article && (
      <Container>
        <div>
          <img src={Service.filePreview(article.picture)} alt={article.title} />
        </div>
        {isAuthor && (
          <div>
            <Link to={`/edit-article/${article.$id}`}>
              <Button children={"Edit"} />
            </Link>
            <Button children={"Delete"} onClick={kill} />
          </div>
        )}
        <div>
          <h1>{parse(article.title)}</h1>
        </div>
        <div>
          <p>{parse(article.content)}</p>
        </div>
      </Container>
    )
  );
};

export default Article;
