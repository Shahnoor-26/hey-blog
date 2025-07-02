import { useEffect, useState } from "react";
import { Button, Card, Container } from "../components";
import { Service } from "../appwrite/configuration.js";
import { useSelector } from "react-redux";

const LIMIT = 5;

const Home = () => {
  const [list, updateList] = useState([]);
  const [total, updateTotal] = useState(LIMIT);

  const status = useSelector((state) => state.auth.status);

  useEffect(() => {
    Service.findDocuments()
      .then((collection) => {
        if (collection) updateList(collection.documents);
      })
      .catch((error) => console.log("Unable to find articles: ", error));
  }, []);

  const handleLoad = () => {
    updateTotal((prev) => Math.min(prev + LIMIT, list.length));
  };

  const results = list.slice(0, total);

  if (status) {
    return (
      <Container>
        <ul>
          {results.map((value) => (
            <li key={value.$id}>
              <Card {...value} />
            </li>
          ))}
          {total < list.length && (
            <div>
              <Button children={"Load More"} onClick={handleLoad} />
            </div>
          )}
        </ul>
      </Container>
    );
  } else {
    return (
      <Container>
        <div>
          <h1>Login to read posts</h1>
        </div>
      </Container>
    );
  }
};

export default Home;
