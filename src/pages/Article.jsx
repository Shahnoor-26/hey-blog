import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Service } from "../appwrite/configuration.js";
import { capitalize, updateISO } from "../components/utilities.js";
import { Button, Container, Spin } from "../components";
import parser from "html-react-parser";

const Article = () => {
  const [spin, updateSpin] = useState(true);
  const [article, updateArticle] = useState(null);

  const documentId = useParams();
  const userdata = useSelector((state) => state.auth.userdata);

  const navigate = useNavigate();

  useEffect(() => {
    if (documentId.documentId) {
      Service.findDocument(documentId.documentId)
        .then((document) => document && updateArticle(document))
        .catch((error) =>
          console.log(`website service error: ${error.message}`)
        )
        .finally(() => updateSpin(false));
    } else navigate("/");
  }, [documentId.documentId, navigate]);

  const isAuthor =
    article && userdata ? article.userId === userdata.$id : false;

  const discard = () => {
    if (documentId.documentId) {
      updateSpin(true);
      Service.documentDelete(documentId.documentId)
        .then((status) => {
          if (status) Service.fileDelete(article.picture);
          navigate("/");
        })
        .catch((error) =>
          console.log(`website service error: ${error.message}`)
        )
        .finally(() => updateSpin(false));
    }
  };

  const share = async () => {
    try {
      updateSpin(true);
      const data = {
        title: "Discover Draftoria",
        text: "Explore this unique platform — I think you'll enjoy it!",
        url: window.location.href,
      };

      if (navigator.share) {
        updateSpin(false);
        await navigator.share(data);
      } else {
        updateSpin(false);
        await navigator.clipboard.writeText(data.url);
        alert("Sharing not supported. Link copied to clipboard.");
      }
    } catch (error) {
      console.log(`website service error: ${error.message}`);
    }
  };

  if (spin) {
    return (
      <Container
        children={<Spin />}
        className={"h-screen w-full bg-secondary-color"}
      />
    );
  } else if (article) {
    return (
      <Container
        className={
          "bg-secondary-color text-primary-text font-semibold antialiased select-none"
        }
      >
        <div className="h-screen min-h-fit w-full p-2">
          <section className="h-1/4 md:h-1/2 xl:h-3/4 w-full md:w-4/5 mx-auto p-2">
            <img
              src={Service.fileView(article.picture) || null}
              alt={article.title || "Not Available"}
              className="h-full w-full border-secondary-accent border md:border-2 object-cover object-center rounded"
              loading="lazy"
            />
          </section>
          <section className="w-full md:w-4/5 mx-auto p-2 flex justify-between items-center gap-2.5">
            <div className="flex gap-2.5">
              <button
                className={`min-h-fit min-w-fit px-2 md:px-4 py-1 md:py-2 bg-primary-color border-secondary-accent border md:border-2 rounded transition-all duration-200 ease-in-out cursor-pointer outline-none focus:ring-primary-accent focus:ring-1 md:focus:ring-2 ${
                  article.status === "active"
                    ? "text-primary-accent"
                    : "text-secondary-accent"
                }`}
              >
                {capitalize(article.status)}
              </button>
              <button
                className="min-h-fit min-w-fit px-2 md:px-4 py-1 md:py-2 bg-primary-color border-secondary-accent border md:border-2 rounded transition-all duration-200 ease-in-out cursor-pointer outline-none focus:ring-primary-accent focus:ring-1 md:focus:ring-2"
                onClick={share}
              >
                Share
              </button>
            </div>
            {isAuthor && (
              <div className="flex gap-2.5">
                <Link
                  to={`/edit-article/${article.$id}`}
                  className="min-h-fit min-w-fit px-2 md:px-4 py-1 md:py-2 bg-primary-color border-secondary-accent border md:border-2 rounded transition-all duration-200 ease-in-out cursor-pointer outline-none focus:ring-primary-accent focus:ring-1 md:focus:ring-2"
                >
                  Edit
                </Link>
                <Button
                  onClick={discard}
                  className="min-h-fit min-w-fit px-2 md:px-4 py-1 md:py-2 bg-primary-color border-secondary-accent border md:border-2 rounded transition-all duration-200 ease-in-out cursor-pointer outline-none focus:ring-primary-accent focus:ring-1 md:focus:ring-2"
                >
                  Delete
                </Button>
              </div>
            )}
          </section>
          <section className="min-h-fit w-full md:w-11/12 mx-auto p-2 space-y-2 text-wrap">
            <h1 className="p-2 border-secondary-accent border md:border-2 rounded text-xl md:text-2xl xl:text-3xl font-bold text-center">
              {parser(article.title) || "Not Available"}
            </h1>
            <div className="p-2 text-secondary-text text-base md:text-lg xl:text-xl font-normal">
              {parser(article.content) || "Not Available"}
            </div>
          </section>
          <section className="min-h-fit w-full md:w-11/12 mx-auto p-2 flex justify-between items-center gap-2.5 text-sm md:text-base xl:text-lg">
            <p className="p-2">
              <span className="text-secondary-accent">AUTHOR: </span>
              <span className="text-secondary-text">
                {article.$id || "Unknown"}
              </span>
            </p>
            <p className="p-2">
              <span className="text-secondary-accent">DATE: </span>
              <span className="text-secondary-text">
                {updateISO(article.$createdAt)}
              </span>
            </p>
          </section>
        </div>
      </Container>
    );
  } else navigate("/");
};

export default Article;
