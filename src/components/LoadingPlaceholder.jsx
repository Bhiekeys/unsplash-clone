const LoadingPlaceholder = () => {
  return (
    <div className="relative bg-gray-300 animate-pulse h-[400px] w-full flex items-end justify-start overflow-hidden rounded-lg">
      <div className="overlay absolute inset-0 bg-gray-400 opacity-40"></div>
      <div className="relative text-gray-700 p-2 z-20 text-sm">
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPlaceholder;
