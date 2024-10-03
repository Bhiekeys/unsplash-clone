import { SearchNormal1 } from 'iconsax-react';
import { useState, useEffect } from 'react';
import PhotoGrid from './PhotoGrid';
import axios from 'axios';
import Lottie from 'lottie-react';
import sorry from '../assets/sorry.json';
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('african');
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [displayedSearchTerm, setDisplayedSearchTerm] = useState('african');
  const [noResults, setNoResults] = useState(false);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const API_URL = 'https://api.unsplash.com/search/photos';
  const IMAGE_PER_PAGE = 2;

  const fetchImages = async (isInitialLoad = false) => {
    if (!hasMore && !isInitialLoad && loading) return;

    setLoading(true);
    try {
       const searchQuery = searchTerm ? searchTerm : displayedSearchTerm;
      const { data } = await axios.get(
        `${API_URL}?query=${searchQuery}&page=${page}&per_page=${IMAGE_PER_PAGE}&client_id=${
          import.meta.env.VITE_API_KEY
        }`
      );

      if (data.results.length < IMAGE_PER_PAGE) {
        setHasMore(false);
      }
      if (isInitialLoad && data.results.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setErrorMessage('');
      setSearchTerm('');
      if (isInitialLoad) {
        setPhotos(data.results);
      } else {
        setPhotos((prevPhotos) => [...prevPhotos, ...data.results]);
      }
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
      setTimeout(() => {
        window.scrollTo({ top: window.scrollY - 20, behavior: 'auto' });
      }, 200);
    } catch (error) {
      console.log(error);
      setErrorMessage(
        'An error occurred while fetching images. Please try again later.'
      );

      setLoading(false);
      setTimeout(() => {
        window.scrollTo({ top: window.scrollY - 100, behavior: 'auto' });
      }, 200);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setHasMore(true);
    setPhotos([]);
    setDisplayedSearchTerm(searchTerm);
    setSearchTerm('');
    fetchImages(true);
    setShow(true);

  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
      !loading &&
      hasMore
    ) {
      fetchImages();
    }
  };
  useEffect(() => {
    fetchImages(true);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, displayedSearchTerm]);

  return (
    <div>
      <div className="bg-slate-200 py-3 flex justify-center font-sora fixed w-full z-10  ">
        <div>
          <form
            onSubmit={handleSubmit}
            className="search-bar flex items-center justify-center mt-20 bg-[#fff]   w-fit rounded-xl ">
            <div className="flex items-center px-5">
              <SearchNormal1 size="24" color="#2b211e" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search photos/illustrations"
                className={`p-4 text-base w-[150px] md:w-[320px] outline-none `}
              />
            </div>
            <button
              type="submit"
              disabled={!searchTerm}
              className={`p-4 w-18 md:w-32 text-white bg-slate-900 hover:bg-slate-900 cursor-pointer border-0 rounded-r-xl ${
                !searchTerm && 'bg-slate-700 cursor-not-allowed'
              }`}>
              Search
            </button>
          </form>

          <h2
            className={`text-center mt-6 text-lg font-light ${
              !show && 'text-transparent'
            }`}>
            {` Search result for '${displayedSearchTerm}'`}
          </h2>
        </div>
      </div>
      {noResults && (
        <div className="pt-72 flex flex-col items-center justify-center ">
          <Lottie animationData={sorry} loop={true} className="h-[230px]" />
          <div className="text-center max-w-[350px] pb-10 text-lg font-light ">
            {`No results found for '${displayedSearchTerm}'`}
          </div>
        </div>
      )}
      {errorMessage ? (
        <div className="pt-72 flex flex-col items-center justify-center ">
          <Lottie animationData={sorry} loop={true} className="h-[230px]" />
          <div className="text-center max-w-[350px] pb-10 text-lg font-light ">
            {errorMessage}
          </div>
        </div>
      ) : (
        <PhotoGrid isLoading={loading} photos={photos} />
      )}
    </div>
  );
};

export default SearchBar;
