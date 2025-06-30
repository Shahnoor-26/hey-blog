import { useEffect, useState } from "react";
import { Card, Container } from "../components";
import { Service } from "../appwrite/configuration.js";

const Articles = () => {
  const [list, updateList] = useState([]);

  useEffect(() => {
    Service.findDocuments([])
      .then((collection) => {
        if (collection) updateList(collection.documents);
      })
      .catch((error) => console.log("Unable To Find Articles! ", error));
  }, []);
  return (
    <Container>
      <ul>
        {list.map((item) => (
          <li key={item.$id}>
            <Card {...item} />
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Articles;
