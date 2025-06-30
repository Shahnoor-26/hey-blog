import { useEffect, useState } from "react";
import { Service } from "../appwrite/configuration.js";
import { Card, Container } from "../components";

const Home = () => {
  const [list, updateList] = useState([]);

  useEffect(() => {
    Service.findDocuments()
      .then((collection) => {
        if (collection) updateList(collection.documents);
      })
      .catch((error) => console.log("Unable To Find Articles! ", error));
  }, []);

  if (list && list.length > 0) {
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
  } else {
    return (
      <Container>
        <div>
          <h1>Login to read articles</h1>
        </div>
      </Container>
    );
  }
};

export default Home;
