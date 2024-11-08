import { useEffect, useState } from "react";
import axios from 'axios';

export default function useGifSearch(content, offset) {
    const [error, setError] = useState(null)
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        console.log("I'm triggering!")
        setLoading(true)
        setError(false)
        axios({
            method: 'GET',
            url: "https://api.giphy.com/v1/gifs/search",
            params: { q: content, offset, api_key: "ukwRl9rXa8ROYBQMW1EGPkyZdIY4HQ31" }
        }).then((res) => {
            setImages(images => {
                return [...new Set([...images, ...res.data.data.map((image) => image.images.original.url)])]
            })
            setHasMore(res.data.data.length > 0)
            setLoading(false)
        }).catch((e) => {
            setError(e.message)
        })
    }, [content, offset])
    return { error, images, loading, hasMore }
}
