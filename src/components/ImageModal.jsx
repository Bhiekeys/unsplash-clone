import { useEffect } from 'react';
import { CloseCircle } from 'iconsax-react';
import PropTypes from 'prop-types';

const ImageModal = ({ photo, isOpen, onClose }) => {
  const { urls, user} = photo;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && event.target.classList.contains('modal-overlay')) {
        onClose();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center modal-overlay bg-black bg-opacity-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white p-2 mx-5 rounded-lg overflow-hidden w-full max-w-4xl  shadow-lg">
        <button
          onClick={() => onClose()}
          type="button"
          className="absolute top-4 right-4 bg-white rounded-full p-2 z-50">
          <CloseCircle size="30" color="#000" />
        </button>
        <img
          src={urls?.regular}
          alt={user?.name}
          className="w-full h-[350px] md:h-[450px] object-cover"
        />

        <div className="p-4 bg-white">
          <h2 className="text-lg font-semibold">{user?.name}</h2>
          {user?.location && <p className="text-sm">{user?.location}</p>}
        </div>
      </div>
    </div>
  );
};
ImageModal.propTypes = {
  photo: PropTypes.shape({
    urls: PropTypes.shape({
      regular: PropTypes.string.isRequired,
    }).isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    }).isRequired,
   
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default ImageModal;
