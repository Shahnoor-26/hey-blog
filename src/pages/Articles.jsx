import { useState, useEffect } from "react";
import { Button, Card, Container } from "../components";
import { Service } from "../appwrite/configuration.js";

const LIMIT = 5;

const Articles = () => {
  const [list, updateList] = useState([]);
  const [total, updateTotal] = useState(LIMIT);

  useEffect(() => {
    Service.findDocuments([])
      .then((collection) => {
        if (collection) {
          updateList(collection.documents);
        }
      })
      .catch((error) => console.log("Unable to find articles: ", error));
  }, []);

  const handleLoad = () => {
    updateTotal((prev) => Math.min(prev + LIMIT, list.length));
  };

  const results = list.slice(0, total);

  return (
    <Container>
      <ul>
        {results.map((value) => (
          <li key={value.$id}>
            <Card {...value} />
          </li>
        ))}
      </ul>
      {total < list.length && (
        <div>
          <Button children={"Load More"} onClick={handleLoad} />
        </div>
      )}
    </Container>
  );
};

export default Articles;
