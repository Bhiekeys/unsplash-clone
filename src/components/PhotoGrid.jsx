import PropTypes from 'prop-types';
import PhotoCard from './PhotoCard';
import LoadingPlaceholder from './LoadingPlaceholder';

const PhotoGrid = ({ isLoading, photos }) => {
  return (
    <div className="grid md:grid-cols-3 gap-4 p-5 pt-60 ">
      {photos?.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
      {isLoading &&
        Array.from({ length: 8 }).map((_, index) => (
          <LoadingPlaceholder key={index} />
        ))}
    </div>
  );
};

PhotoGrid.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
};

export default PhotoGrid;
