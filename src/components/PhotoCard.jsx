import PropTypes from 'prop-types';
import { useState } from 'react';
import ImageModal from './ImageModal';

const PhotoCard = ({ photo }) => {
  const { urls, user } = photo;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div
      onClick={openModal}
      className="h-[400px] relative bg-cover bg-center flex items-end justify-start overflow-hidden rounded-lg cursor-pointer"
      style={{ backgroundImage: `url(${urls.small})` }}>
      <div className="overlay absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative text-white p-2  text-sm">
        <p>{user?.name}</p>
        {user?.location && <p>{user?.location}</p>}
      </div>
      <ImageModal photo={photo} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
PhotoCard.propTypes = {
  photo: PropTypes.shape({
    urls: PropTypes.shape({
      small: PropTypes.string.isRequired,
    }).isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
export default PhotoCard;
