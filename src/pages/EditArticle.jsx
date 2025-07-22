import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Service } from "../appwrite/configuration.js";
import { MetaForm } from "../components";

const EditArticle = () => {
  const [article, updateArticle] = useState(null);
  const navigate = useNavigate();
  const documentId = useParams();

  useEffect(() => {
    if (documentId) {
      Service.findDocument(documentId.documentId)
        .then((document) => {
          if (document) updateArticle(document);
        })
        .catch((error) => console.log("Unable To Find Article! ", error));
    } else navigate("/");
  }, [documentId.documentId, navigate]);

  return article && <MetaForm article={article} />;
};

export default EditArticle;
