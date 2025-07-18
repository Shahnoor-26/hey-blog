import { useState, useEffect } from "react";
import { Service } from "../appwrite/configuration.js";
import { Container, Card, Button } from "../components/index.js";

const LIMIT = 8;

const Articles = () => {
  const [list, updateList] = useState([]);
  const [total, updateTotal] = useState(LIMIT);

  useEffect(() => {
    Service.findDocuments([])
      .then((collection) => {
        if (collection) updateList(collection.documents);
      })
      .catch((error) => console.log("Unable to find articles: ", error));
  }, []);

  const handleLoad = () => {
    updateTotal((prev) => Math.min(prev + LIMIT, list.length));
  };

  const results = list.slice(0, total);

  return (
    <Container
      className={"min-h-screen w-full font-semibold antialiased select-none"}
    >
      <section className="h-full w-full p-2 flex justify-center text-xs md:text-sm xl:text-base">
        <ul className="h-auto w-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-8">
          {results?.map((data) => (
            <li
              key={data.$id}
              className="h-auto w-auto m-2 p-2 border md:border-2 transition-all duration-200 ease-in-out hover:scale-105 focus:ring-1 md:focus:ring-2"
            >
              <Card {...data} />
            </li>
          ))}
        </ul>
      </section>
      {total < list.length && (
        <section className="h-auto w-full px-2 py-4 flex justify-center border-t md:border-t-2 text-base md:text-lg xl:text-xl">
          <Button
            className="h-auto w-4/5 md:w-2/5 xl:w-1/4 p-2 border md:border-2 rounded md:rounded-md transition-all duration-200 ease-in-out cursor-pointer hover:scale-105 focus:ring-1 md:focus:ring-2"
            onClick={handleLoad}
          >
            Discover More
          </Button>
        </section>
      )}
    </Container>
  );
};

export default Articles;
