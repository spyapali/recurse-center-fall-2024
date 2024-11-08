import { useState, useRef, useCallback } from 'react';
import './App.css';
import useGifSearch from './useGifSearch';
import { ReactComponent as MagnifyingGlass } from "./magnifying-glass.svg"

const LIMIT = 50

function App() {
  const [paginationOffset, setPaginationOffset] = useState(0);
  const [content, setContent] = useState("");
  const observer = useRef()

  const { images, loading, error } = useGifSearch(content, paginationOffset)

  const lastImageElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(images => {
      if (images[0].isIntersecting) {
        setPaginationOffset(prevPaginationOffset => prevPaginationOffset + LIMIT)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading])


  return (
    <div className="bg-black p-20">
      <div className="mx-auto w-fit">
        {/* <div className="text-center mb-8 text-4xl text-white font-bold">Home Sweet Home 🏠</div> */}

        <div className="flex">
          <input className="rounded-l-lg text-center text-2xl w-[150px] md:w-[500px] lg:w-[1000px] text-white font-bold" />
          <button className="p-5 rounded-r-lg border-x-from-purple-500 bg-gradient-to-r from-purple-500 to-pink-500"><MagnifyingGlass className="w-14 h-14" /></button>
        </div>
        <div className="columns-4">
          {images.map((image, index) => {
            if (images.length === index + 1) {
              return <img ref={lastImageElementRef} className="border-yellow-600 mb-2 border-2 rounded-md" alt="home" width={400} key={image} src={image} />
            } else {
              return <img className="border-yellow-600 mb-2 border-2 rounded-md" alt="home" width={400} key={image} src={image} />
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
