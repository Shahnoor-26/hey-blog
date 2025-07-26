import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Service } from "../appwrite/configuration.js";
import { capitalize, updateISO } from "../components/utilities.js";
import { Button, Container } from "../components";
import parser from "html-react-parser";

const Article = () => {
  const [article, updateArticle] = useState(null);
  const navigate = useNavigate();
  const documentId = useParams();
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
          <section className="h-1/4 md:h-1/2 xl:h-3/4 w-full md:w-4/5 mx-auto p-2">
            <img
              src={Service.fileView(article.picture) || null}
              alt={article.title || "Not Available"}
              className="h-full w-full border md:border-2 object-cover object-center rounded"
            />
          </section>
          <section className="w-full md:w-4/5 mx-auto p-2 flex justify-between items-center gap-2.5">
            <div className="flex gap-2.5">
              <button
                className={`min-h-fit min-w-fit px-2 md:px-4 py-1 md:py-2 border md:border-2 rounded transition-all duration-200 ease-in-out cursor-pointer outline-none focus:ring-1 md:focus:ring-2 ${
                  article.status === "active"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {capitalize(article.status)}
              </button>
              <button className="min-h-fit min-w-fit px-2 md:px-4 py-1 md:py-2 border md:border-2 rounded transition-all duration-200 ease-in-out cursor-pointer outline-none focus:ring-1 md:focus:ring-2">
                Share
              </button>
            </div>
            {isAuthor && (
              <div className="flex gap-2.5">
                <Link
                  to={`/edit-article/${article.$id}`}
                  className="min-h-fit min-w-fit px-2 md:px-4 py-1 md:py-2 border md:border-2 rounded transition-all duration-200 ease-in-out cursor-pointer outline-none focus:ring-1 md:focus:ring-2"
                >
                  Edit
                </Link>
                <Button
                  onClick={kill}
                  className="min-h-fit min-w-fit px-2 md:px-4 py-1 md:py-2 border md:border-2 rounded transition-all duration-200 ease-in-out cursor-pointer outline-none focus:ring-1 md:focus:ring-2"
                >
                  Delete
                </Button>
              </div>
            )}
          </section>
          <section className="min-h-fit w-full md:w-11/12 mx-auto p-2 space-y-2 text-wrap">
            <h1 className="p-2 border md:border-2 rounded text-xl md:text-2xl xl:text-3xl font-bold text-center">
              {parser(article.title) || "Not Available"}
            </h1>
            <div className="p-2 text-base md:text-lg xl:text-xl font-normal">
              {parser(article.content) || "Not Available"}
            </div>
          </section>
          <section className="min-h-fit w-full md:w-11/12 mx-auto p-2 flex justify-between items-center gap-2.5 text-sm md:text-base xl:text-lg">
            <p className="p-2">Author: {article.$id}</p>
            <p className="p-2">Date: {updateISO(article.$createdAt)}</p>
          </section>
        </div>
      </Container>
    )
  );
};

export default Article;
