import { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [images, setImages] = useState(true);
  const [paginationOffset, setPaginationOffset] = useState(0);


  const loadImages = useCallback(async () => {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?q=home&api_key=ukwRl9rXa8ROYBQMW1EGPkyZdIY4HQ31&offset=${paginationOffset}`
    );
    const data = await response.json()
    setImages(data.data)
    console.log({ data: data.data })
    setPaginationOffset(data.pagination.offset)
  }, [paginationOffset])

  useEffect(() => {
    loadImages()
  }, [loadImages])

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= docHeight - 2) {
      // User has scrolled to the bottom
      console.log('Reached the bottom!');
      // Call a function to load more images
      loadImages()

    };
  }, [loadImages])

  useEffect(() => {
    handleScroll()
  }, [handleScroll]);


  return (
    <div className="bg-black p-20">
      <div className="max-w-screen-2xl mx-auto">
        <div className="text-center mb-4 text-4xl text-white font-bold">Home Sweet Home 🏠</div>
        <div className="columns-4">
          {images.map((image, index) => {
            return <img className="border-yellow-600 mb-2 border-2 rounded-md" alt="home" width={400} key={index} src={image.images.original.url} />
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
