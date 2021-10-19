import { useState, useEffect } from "react";
import api from "../../service/api";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import s from "./ImageGallery.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Button from "../Button/Button";
import p from "../../img/Nothing.jpg";
import PropTypes from "prop-types";

export default function ImageGallery({ search, onShowModal, modalImg }) {
  const [imgName, setimgName] = useState([]);
  const [error, seterror] = useState("");
  const [status, setstatus] = useState("idle");
  const [page, setpage] = useState(1);

  function loadMore() {
    setpage((prevState) => prevState + 1);
  }

  function handlerClick(largeImg) {
    if (largeImg) {
      onShowModal();
      modalImg(largeImg);
    }
  }

  useEffect(() => {
    if (search === null) {
      return;
    }
    setstatus("pending");
    api(search)
      .then((res) => {
        return res.hits;
      })
      .then((imgs) => {
        setimgName(imgs);
        setstatus("resolved");
      })
      .catch((err) => {
        seterror(err);
        setstatus("reject");
      });
  }, [search]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    setstatus("pending");
    api(search, page)
      .then((res) => {
        return res.hits;
      })
      .then((imgName) => {
        setimgName((prevState) => [...prevState, ...imgName]);
        setstatus("resolved");
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
  }, [page, search]);

  if (status === "idle") return <img src={p} alt="nothing" width="100%" />;

  if (status === "pending")
    return (
      <div>
        {imgName && (
          <ul className={s.ImageGallery}>
            {imgName.map((img) => (
              <ImageGalleryItem onClick={handlerClick} img={img} key={img.id} />
            ))}
          </ul>
        )}

        <Loader
          type="Grid"
          color="#00BFFF"
          height={100}
          width={100}
          className={s.loader}
        />
      </div>
    );
  if (status === "rejected") return <p>{error}</p>;
  if (status === "resolved")
    return (
      <div>
        {imgName.length > 0 ? (
          <ul className={s.ImageGallery}>
            {imgName.map((img) => (
              <ImageGalleryItem onClick={handlerClick} img={img} key={img.id} />
            ))}
          </ul>
        ) : (
          <img src={p} alt="nothing" width="100%" />
        )}

        {imgName.length >= 12 && <Button onSubmit={loadMore} />}
      </div>
    );
}

// export default class ImageGallery extends PureComponent {
//   state = {
//     imgName: null,
//     error: "",
//     status: "idle",
//     page: 1,
//   };
//   componentDidUpdate(prevProps, prevState) {
//     const { search } = this.props;
//     const { page } = this.state;
//     if (prevProps.search !== search) {
//       this.setState({ status: "pending" });
//       api(search)
//         .then((res) => {
//           return res.hits;
//         })
//         .then((imgName) => this.setState({ imgName, status: "resolved" }))
//         .catch((err) => this.setState({ err, status: "reject" }));
//     }
//     if (prevState.page !== page && page !== 1) {
//       this.setState({ status: "pending" });
//       api(search, page)
//         .then((res) => {
//           return res.hits;
//         })
//         .then((imgName) =>
//           this.setState((prevState) => ({
//             imgName: [...prevState.imgName, ...imgName],
//             status: "resolved",
//           }))
//         )
//         .catch((err) => this.setState({ err, status: "reject" }));
//     }
// window.scrollTo({
//   top: document.documentElement.scrollHeight,
//   behavior: "smooth",
// });
//   }

//   loadMore = () => {
//     this.setState((prevState) => ({
//       page: prevState.page + 1,
//     }));
//   };

//   handlerClick = (e) => {
//     if (e.target.attributes.bigimg) {
//       this.props.onShowModal();
//       this.props.modalImg(e.target.attributes.bigimg.value);
//     }
//   };
//   render() {
//     const { imgName, error, status } = this.state;

//     if (status === "idle") return <img src={p} alt="nothing" width="100%" />;
//     if (status === "pending")
//       return (
//         <div>
//           {imgName && (
//             <ul onClick={this.handlerClick} className={s.ImageGallery}>
//               {imgName.map((img) => (
//                 <ImageGalleryItem img={img} key={img.id} />
//               ))}
//             </ul>
//           )}

//           <Loader
//             type="Grid"
//             color="#00BFFF"
//             height={100}
//             width={100}
//             className={s.loader}
//           />
//         </div>
//       );
//     if (status === "rejected") return <p>{error.message}</p>;
//     if (status === "resolved")
//       return (
//         <div>
//           {imgName.length > 0 ? (
//             <ul onClick={this.handlerClick} className={s.ImageGallery}>
//               {imgName.map((img) => (
//                 <ImageGalleryItem img={img} key={img.id} />
//               ))}
//             </ul>
//           ) : (
//             <img src={p} alt="nothing" width="100%" />
//           )}

//           {imgName.length >= 12 && <Button onSubmit={this.loadMore} />}
//         </div>
//       );
//   }
// }

ImageGallery.protoType = {
  search: PropTypes.string.isRequired,
  onShowModal: PropTypes.func.isRequired,
  modalImg: PropTypes.func.isRequired,
};
