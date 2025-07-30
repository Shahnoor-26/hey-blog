import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Service } from "../appwrite/configuration.js";
import { Container, MetaForm, Spin } from "../components";

const EditArticle = () => {
  const [spin, updateSpin] = useState(true);
  const [article, updateArticle] = useState(null);

  const documentId = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (documentId.documentId) {
      Service.findDocument(documentId.documentId)
        .then((document) => document && updateArticle(document))
        .catch((error) => console.log(error))
        .finally(() => updateSpin(false));
    } else navigate("/");
  }, [documentId.documentId, navigate]);

  if (spin) {
    return (
      <Container
        children={<Spin />}
        className={"h-screen w-full bg-secondary-color"}
      />
    );
  } else {
    return <MetaForm article={article && article} />;
  }
};

export default EditArticle;
