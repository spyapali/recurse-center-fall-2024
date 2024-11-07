import { useState, useRef, useCallback } from 'react';
import './App.css';
import useGifSearch from './useGifSearch';

const LIMIT = 50

function App() {
  const [paginationOffset, setPaginationOffset] = useState(0);
  const observer = useRef()

  const { images, hasMore, loading, error } = useGifSearch(paginationOffset)

  const lastImageElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(images => {
      if (images[0].isIntersecting && hasMore) {
        setPaginationOffset(prevPaginationOffset => prevPaginationOffset + LIMIT)
      }
    })
    if (node) observer.current.observe(node)
  }, [hasMore, loading])


  return (
    <div className="bg-black p-20">
      <div className="max-w-screen-2xl mx-auto">
        <div className="text-center mb-4 text-4xl text-white font-bold">Home Sweet Home 🏠</div>
        <div className="columns-4">
          {images.map((image, index) => {
            console.log("hey")
            if (images.length !== index + 1) {
              return <img className="border-yellow-600 mb-2 border-2 rounded-md" alt="home" width={400} key={image} src={image} />
            } else {
              return <img ref={lastImageElementRef} className="border-yellow-600 mb-2 border-2 rounded-md" alt="home" width={400} key={image} src={image} />

            }
          })}
        </div>
        <div>{loading && "Loading..."}</div>
        <div>{error && "Error..."}</div>
      </div>
    </div>
  );
}

export default App;
