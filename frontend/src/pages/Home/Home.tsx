// import { useEffect, useState } from "react";
import { useState } from "react";
import RandomQuote from "./RandomQuote";
import Feed from "./Feed";
import Categories from "./Categories";
import Modal from "../../components/Modal";
import BookSearch from "../SearchResults/BookSearch";

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <main id="home">
      <div className="background" id="background"></div>
      <div className="flex flex-col gap-10 align-middle mt-10 md:mt-0">
        <RandomQuote />

        <div className="w-full mx-auto sm:max-w-[500px] relative">
          <input
            placeholder="Book Search"
            onClick={() => setModalOpen(true)}
            className="input w-full "
          />
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <div className="mt-14">
            <BookSearch />
          </div>
        </Modal>
      </div>
      <Categories />
      <Feed />
    </main>
  );
};

export default Home;
