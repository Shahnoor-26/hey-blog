import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
        className={
          "min-h-screen w-full bg-secondary-color text-primary-text font-semibold antialiased select-none"
        }
      >
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
              onClick={handleLoad}
              className="min-h-fit w-4/5 md:w-2/5 xl:w-1/4 px-2 md:px-4 py-1 md:py-2 bg-secondary-color border-secondary-accent border md:border-2 rounded transition-all duration-200 ease-in-out cursor-pointer outline-none focus:ring-primary-accent focus:ring-1 md:focus:ring-2 hover:ring-primary-accent hover:ring-1 md:hover:ring-2 hover:scale-105"
            >
              Discover More
            </Button>
          </section>
        )}
      </Container>
    );
  } else {
    return (
      <Container
        className={
          "bg-secondary-color text-primary-text font-semibold antialiased select-none"
        }
      >
        <section className="min-h-[500px] w-full p-2 flex flex-col justify-center items-center border-secondary-accent border-b md:border-b-2 text-base md:text-lg xl:text-xl">
          <h2 className="text-primary-accent text-xl md:text-2xl xl:text-3xl font-bold">
            Welcome To HeyBlog
          </h2>
          <p className="m-2 md:m-4">Your Space to Learn, Share, and Grow</p>
          <div className="flex justify-center items-center gap-2.5">
            <Link
              to={"/login"}
              className="min-h-fit min-w-fit px-2 md:px-4 py-1 md:py-2 bg-primary-color border-secondary-accent border md:border-2 rounded transition-all duration-200 ease-in-out cursor-pointer outline-none focus:ring-primary-accent focus:ring-1 md:focus:ring-2"
            >
              Discover More
            </Link>
            <Link
              to={"/signup"}
              className="min-h-fit min-w-fit px-2 md:px-4 py-1 md:py-2 bg-primary-color border-secondary-accent border md:border-2 rounded transition-all duration-200 ease-in-out cursor-pointer outline-none focus:ring-primary-accent focus:ring-1 md:focus:ring-2"
            >
              Create Account
            </Link>
          </div>
        </section>
        <section className="min-h-[500px] w-full p-2 space-y-4 flex flex-col justify-center items-center text-base md:text-lg xl:text-xl text-center">
          <h2 className="text-primary-accent text-xl md:text-2xl xl:text-3xl font-bold">
            Our Mission
          </h2>
          <p className="w-full md:w-3/4">
            HeyBlog is a simple and user-friendly platform designed for
            students, educators, and lifelong learners to write and read
            educational articles. Whether you're sharing knowledge or exploring
            new topics, HeyBlog makes learning more accessible for everyone.
          </p>
          <p className="w-full md:w-3/4">
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
