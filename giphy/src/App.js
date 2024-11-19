import { useState, useRef, useCallback } from 'react';
import './App.css';
import { ReactComponent as MagnifyingGlass } from "./magnifying-glass.svg"
import axios from 'axios';
import ImageLoader from './ImageLoader';
import clsx from "clsx";

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
        params: { q: content, offset: paginationOffset, api_key: "ukwRl9rXa8ROYBQMW1EGPkyZdIY4HQ31" }
      });
      setImages(images => {
        const newImages = res.data.data.map((image) => ({
          url: image.images.original.url,
          height: image.images.original.height
        }));
        const allImages = [...images, ...newImages];
        return allImages.filter((image, index, self) =>
          index === self.findIndex((img) => img.url === image.url)
        );
      });
      setLoading(false);
      if (res.data.pagination.count === 0 && hasMore) {
        setHasMore(false)
      }
      return res.data.pagination.count + paginationOffset
    } catch (e) {
      setError(e.message);
    }
  }, [content, hasMore])


  const search = async () => {
    setImages([])
    setHasMore(true)
    const offset = await getGifs(0)
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


  const contentAvailable = images.length > 0;
  const GiphyImage = (
    <div className={clsx(contentAvailable ? "text-3xl" : "text-7xl", "mx-auto mb-2 rounded-full flex items-center justify-center font-bold")}>
      <span className="animate-gradient bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto]">
        YIPPY
      </span>
    </div>
  )

  return (
    <div className={clsx({ "flex flex-col justify-center": !contentAvailable }, "bg-black min-h-screen px-20")}>
      <div className="mx-auto w-fit">
        {!contentAvailable ? GiphyImage : null}
        <div className="flex py-5 sticky top-0 bg-black">
          <div className="flex mx-auto">
            <input className="rounded-l-lg p-5 text-2xl w-[150px] md:w-[500px] lg:w-[1050px] font-normal" value={content} onChange={(e) => setContent(e.target.value)} />
            <button className="p-5 rounded-r-lg border-x-from-purple-500 bg-gradient-to-r from-purple-500 to-pink-500" onClick={search}><MagnifyingGlass className="w-14 h-14" /></button>
          </div>
        </div>
        <div className="columns-4 bg-black">
          {images.map((image, index) => {
            if (images.length === index + 1) {
              console.log({ height: image.height })
              return <ImageLoader reference={lastImageElementRef} alt="home" height={image.height} key={image.url} src={image.url} />
            } else {
              return <ImageLoader alt="home" height={image.height} key={image.url} src={image.url} />
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
