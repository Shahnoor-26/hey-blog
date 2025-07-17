import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Service } from "../appwrite/configuration.js";
import { Button, Card, Container } from "../components";

const LIMIT = 8;

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
      <Container
        className={"min-h-screen w-full font-semibold antialiased select-none"}
      >
        <section className="h-full w-full p-2 flex justify-center text-xs md:text-sm xl:text-base">
          <ul className="h-auto w-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-8">
            {results?.map((data) => (
              <li
                key={data.$id}
                className="h-auto w-auto m-2 p-2 border md:border-2"
              >
                <Card {...data} />
              </li>
            ))}
          </ul>
        </section>
        <section className="h-auto w-full px-2 py-4 flex justify-center text-base md:text-lg xl:text-xl">
          {total < list.length && (
            <Button
              className="h-auto w-4/5 md:w-2/5 xl:w-1/4 p-2 border md:border-2 rounded md:rounded-md transition-all duration-200 ease-in-out cursor-pointer"
              onClick={handleLoad}
            >
              Discover More
            </Button>
          )}
        </section>
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
          <div className="flex justify-between items-center gap-2.5">
            <Link
              to={"/login"}
              className="px-2 md:px-4 py-1 md:py-2 border md:border-2 rounded md:rounded-md cursor-pointer focus:ring-1 md:focus:ring-2"
            >
              Discover More
            </Link>
            <Link
              to={"/signup"}
              className="px-2 md:px-4 py-1 md:py-2 border md:border-2 rounded md:rounded-md cursor-pointer focus:ring-1 md:focus:ring-2"
            >
              Create Account
            </Link>
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
