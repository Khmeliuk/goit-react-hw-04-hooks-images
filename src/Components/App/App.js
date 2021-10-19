import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Modal from "../Modal/Modal";
import s from "./App.module.css";

export default function App() {
  const [search, setsearch] = useState(null);

  const [showModal, setshowModal] = useState(false);
  const [modalImg, setmodalimg] = useState(null);

  function handlerImgsName(value) {
    setsearch(value);
  }

  function handlerImg(url) {
    setmodalimg(url);
  }

  function toggleModal() {
    setshowModal((prevState) => !prevState);
  }

  return (
    <div className={s.App}>
      <SearchBar onSubmit={handlerImgsName} />
      <ToastContainer autoClose={5000} position="top-center" />
      <ImageGallery
        search={search}
        onShowModal={toggleModal}
        modalImg={handlerImg}
      />

      {showModal && (
        <Modal close={toggleModal}>
          <img src={modalImg} alt="" />
        </Modal>
      )}
    </div>
  );
}
