import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Service } from "../appwrite/configuration.js";
import { Button, Container } from "../components";
import parser from "html-react-parser";

const Article = () => {
  const [article, updateArticle] = useState(null);
  const documentId = useParams();

  const navigate = useNavigate();

  const userdata = useSelector((state) => state.auth.userdata);

  useEffect(() => {
    if (documentId) {
      Service.findDocument(documentId.documentId)
        .then((document) => {
          if (document) updateArticle(document);
        })
        .catch((error) => console.log("Unable To Find Article! ", error));
    } else navigate("/");
  }, [documentId.documentId, navigate]);

  const isAuthor =
    article && userdata ? article.userId === userdata.$id : false;

  const kill = () => {
    try {
      Service.documentDelete(documentId.documentId).then((status) => {
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
      <Container className={"font-semibold antialiased select-none"}>
        <div className="h-screen min-h-fit w-full p-2">
          <section className="h-2/5 md:h-1/2 xl:h-3/5 w-full md:w-4/5 mx-auto">
            <img
              src={Service.fileView(article.picture) || null}
              alt={article.title || "Not Available"}
              className="h-full w-full border md:border-2 object-cover object-center"
            />
          </section>
          <section className="h-auto w-full md:w-4/5 mx-auto my-2 flex justify-between items-center gap-2.5">
            <Button className="h-auto w-auto px-2 md:px-4 py-1 md:py-2 border md:border-2 rounded md:rounded-md transition-all duration-200 ease-in-out cursor-pointer focus:ring-1 md:focus:ring-2">
              Share
            </Button>
            {isAuthor && (
              <div className="h-auto w-auto flex gap-2.5">
                <Link
                  to={`/edit-article/${article.$id}`}
                  className="h-auto w-auto px-2 md:px-4 py-1 md:py-2 block border md:border-2 rounded md:rounded-md transition-all duration-200 ease-in-out cursor-pointer focus:ring-1 md:focus:ring-2"
                >
                  Edit
                </Link>
                <Button
                  className="h-auto w-auto px-2 md:px-4 py-1 md:py-2 border md:border-2 rounded md:rounded-md transition-all duration-200 ease-in-out cursor-pointer focus:ring-1 md:focus:ring-2"
                  onClick={kill}
                >
                  Delete
                </Button>
              </div>
            )}
          </section>
          <section className="min-h-fit w-full p-2">
            <h1 className="text-xl md:text-2xl xl:text-3xl text-center">
              {parser(article.title) || "Not Available"}
            </h1>
            <div className="text-base md:text-lg xl:text-xl">
              {parser(article.content) || "Not Available"}
            </div>
          </section>
        </div>
      </Container>
    )
  );
};

export default Article;
