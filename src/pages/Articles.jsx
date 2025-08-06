import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initStore } from "../store/draftSlice.js";
import { Service } from "../appwrite/configuration.js";
import { Container, Card, Button, Spin } from "../components/index.js";

const LIMIT = 8;

const Articles = () => {
  const [list, updateList] = useState([]);
  const [spin, updateSpin] = useState(true);
  const [total, updateTotal] = useState(LIMIT);

  const dispatch = useDispatch();

  const documents = useSelector((state) => state.draft.documents);
  const inactive = documents.filter((doc) => doc.status === "inactive") || [];

  useEffect(() => {
    if (inactive.length > 0) {
      updateList(documents);
      updateSpin(false);
    } else {
      Service.findDocuments([])
        .then((collection) => {
          if (collection.documents) {
            updateList(collection.documents);
            dispatch(initStore({ documents: collection.documents }));
          }
        })
        .catch((error) =>
          console.log(`website service error: ${error.message}`)
        )
        .finally(() => updateSpin(false));
    }
  }, [documents]);

  const handlePush = () => {
    updateTotal((prev) => Math.min(prev + LIMIT, list.length));
  };

  const results = list.slice(0, total);

  return (
    <Container
      className={
        "min-h-screen w-full bg-secondary-color text-primary-text font-semibold antialiased select-none"
      }
    >
      {spin && <Spin />}
      <section className="h-full w-full p-2 flex justify-center text-xs md:text-sm xl:text-base">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-8">
          {results?.map((data) => (
            <li
              key={data.$id}
              className="m-2 bg-primary-color border-secondary-accent border md:border-2 transition-all duration-200 ease-in-out hover:ring-primary-accent hover:ring-1 md:hover:ring-2 hover:scale-105"
            >
              <Card {...data} />
            </li>
          ))}
        </ul>
      </section>
      {total < list.length && (
        <section className="w-full px-2 py-4 bg-primary-color flex justify-center border-secondary-accent border-t md:border-t-2 text-base md:text-lg xl:text-xl">
          <Button
            className="min-h-fit w-4/5 md:w-2/5 xl:w-1/4 px-2 md:px-4 py-1 md:py-2 bg-secondary-color border-secondary-accent border md:border-2 rounded transition-all duration-200 ease-in-out cursor-pointer outline-none focus:ring-primary-accent focus:ring-1 md:focus:ring-2 hover:ring-primary-accent hover:ring-1 md:hover:ring-2 hover:scale-105"
            onClick={handlePush}
            children={"Discover More"}
          />
        </section>
      )}
    </Container>
  );
};

export default Articles;
