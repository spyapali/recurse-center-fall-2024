import { useState, useRef, useCallback } from 'react';
import './App.css';
import { ReactComponent as MagnifyingGlass } from "./magnifying-glass.svg"
import axios from 'axios';


function App() {
  const [paginationOffset, setPaginationOffset] = useState(0);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null)
  const observer = useRef()

  const getGifs = useCallback(async (paginationOffset) => {
    setLoading(true)
    setError(false)
    try {
      const res = await axios({
        method: 'GET',
        url: "https://api.giphy.com/v1/gifs/search",
        params: { q: content, offset: paginationOffset, api_key: "kW78yTaEPgpkR20P6mUjbAQ92oQo3lUw" }
      });
      setImages(images => {
        return [...new Set([...images, ...res.data.data.map((image) => image.images.original.url)])];
      });
      setLoading(false);
      if (res.data.pagination.count === 0) {
        setHasMore(false)
      }
      return res.data.pagination.count + paginationOffset
    } catch (e) {
      setError(e.message);
    }
  }, [content])

  const search = async () => {
    setImages([])
    setPaginationOffset(0)
    const offset = await getGifs(paginationOffset)
    setPaginationOffset(offset)
  }

  const lastImageElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(async (images) => {
      if (images[0].isIntersecting && hasMore) {
        const offset = await getGifs(paginationOffset)
        setPaginationOffset(offset)
      }
    })
    if (node) observer.current.observe(node)
  }, [getGifs, hasMore, loading, paginationOffset])


  return (
    <div className="bg-black p-20">
      <div className="mx-auto w-fit">
        <div className="flex mb-5">
          <div className="flex mx-auto">
            <input className="rounded-l-lg p-5 text-2xl w-[150px] md:w-[500px] lg:w-[1050px] font-normal" value={content} onChange={(e) => setContent(e.target.value)} />
            <button className="p-5 rounded-r-lg border-x-from-purple-500 bg-gradient-to-r from-purple-500 to-pink-500" onClick={search}><MagnifyingGlass className="w-14 h-14" /></button>
          </div>
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
