import { useEffect } from "react";
import axios from 'axios';

export default function useGifSearch(offset) {
    const [error, setError] = useState(false)
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios({
            method: 'GET',
            url: "https://api.giphy.com/v1/gifs/search",
            params: { q: "home", offset: offset, api_key: "ukwRl9rXa8ROYBQMW1EGPkyZdIY4HQ31" }
        }).then((res) => {
            console.log(res.data)
        })
    }, [offset])
}
