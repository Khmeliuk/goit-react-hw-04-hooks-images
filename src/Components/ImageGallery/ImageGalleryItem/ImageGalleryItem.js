import s from "./ImageGalleryItem.module.css";
import PropTypes from "prop-types";

export default function ImageGalleryItem({ img, onClick }) {
  const handlerOnClick = () => {
    onClick(img.largeImageURL);
  };
  return (
    <li className={s.ImageGalleryItem}>
      <img
        onClick={handlerOnClick}
        bigimg={img.largeImageURL}
        src={img.webformatURL}
        alt={img.tag}
        className={s.ImageGalleryItem_image}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  img: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tag: PropTypes.array,
  }),
};
