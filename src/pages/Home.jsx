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
      <Container className={"bg-primary font-semibold antialiased select-none"}>
        <section className="h-80 flex flex-col justify-center items-center border-b-2 border-border">
          <div className="text-text-secondary text-center truncate">
            <h2 className="p-2 text-4xl truncate font-bold">
              Welcome to HeyBlog
            </h2>
            <p className="p-2 text-xl truncate opacity-75">
              Your Space to Learn, Share, and Grow
            </p>
          </div>
          <div className="p-2 space-x-5 text-text-primary">
            <button
              type="button"
              className="px-5 py-2.5 bg-secondary border-2 border-border rounded-lg focus:ring-2 focus:ring-accent-primary"
            >
              Discover Blogs
            </button>
            <button
              type="button"
              className="px-5 py-2.5 bg-secondary border-2 border-border rounded-lg focus:ring-2 focus:ring-accent-primary"
            >
              Create An Account
            </button>
          </div>
        </section>

        <section className="h-80 flex flex-col justify-center items-center border-b-2 border-border text-text-secondary text-center truncate">
          <h2 className="p-2 text-4xl truncate font-bold">Our Mission</h2>
          <p className="w-3/4 p-2 text-lg text-wrap opacity-75">
            HeyBlog is a simple and user-friendly platform designed for
            students, educators, and lifelong learners to write and read
            educational articles. Whether you're sharing knowledge or exploring
            new topics, HeyBlog makes learning more accessible for everyone.
          </p>
          <p className="w-3/4 p-2 text-lg text-wrap opacity-75">
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
