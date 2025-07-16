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
      <Container
        className={"h-auto w-full font-semibold antialiased select-none"}
      >
        <section className="min-h-80 w-full px-4 py-8 flex flex-col justify-center items-center gap-4 border-b md:border-b-2">
          <div className="space-y-2 text-base md:text-lg xl:text-xl text-center text-wrap">
            <h2 className="text-xl md:text-2xl xl:text-3xl font-bold">
              Welcome to HeyBlog
            </h2>
            <p>Your Space to Learn, Share, and Grow</p>
          </div>
          <div className="space-x-2.5">
            <Button className="px-2 md:px-4 py-1 md:py-2 border md:border-2 rounded md:rounded-md cursor-pointer focus:ring-1 md:focus:ring-2">
              Discover More
            </Button>
            <Button className="px-2 md:px-4 py-1 md:py-2 border md:border-2 rounded md:rounded-md cursor-pointer focus:ring-1 md:focus:ring-2">
              Create Account
            </Button>
          </div>
        </section>
        <section className="min-h-80 w-full px-4 py-8 flex flex-col justify-center items-center gap-4 text-base md:text-lg xl:text-xl text-center text-wrap">
          <h2 className="text-xl md:text-2xl xl:text-3xl font-bold">
            Our Mission
          </h2>
          <p className="h-auto w-full md:w-3/4">
            HeyBlog is a simple and user-friendly platform designed for
            students, educators, and lifelong learners to write and read
            educational articles. Whether you're sharing knowledge or exploring
            new topics, HeyBlog makes learning more accessible for everyone.
          </p>
          <p className="h-auto w-full md:w-3/4">
            Our mission is to encourage open learning and self-expression
            through writing. Start your blog today, connect with curious minds,
            and contribute to a growing library of knowledge.
          </p>
        </section>
      </Container>
    );
  }
};

export default Home;
