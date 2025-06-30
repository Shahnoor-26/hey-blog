import { useNavigate, useParams } from "react-router-dom";
import { Container, MetaForm } from "../components";
import { useEffect, useState } from "react";
import { Service } from "../appwrite/configuration.js";

const EditArticle = () => {
  const [article, updateArticle] = useState(null);
  const documentId = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (documentId) {
      Service.findDocument(documentId)
        .then((document) => {
          if (document) updateArticle(document);
        })
        .catch((error) => console.log("Unable To Find Article! ", error));
    } else navigate("/");
  }, [documentId, navigate]);

  return (
    article && (
      <Container>
        <MetaForm article={article} />
      </Container>
    )
  );
};

export default EditArticle;
