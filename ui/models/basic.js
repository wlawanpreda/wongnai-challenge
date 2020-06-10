import axios from 'axios';
import { message } from "antd";

const url = `http://localhost:5556`;

export const urlGeneratorQuery = (query, type) => {
    if(query && type==="keyword") {
        return `${url}/reviews?query=${query}`;
    }
    if(query && type==="id") {
        return `${url}/reviews/${query}`;
    }
    return null;
}

export const updateReview = async review => {
    try {
        const url = urlGeneratorQuery(review.reviewID, "id")
        return await axios.put(url, review);
    } catch(err) {
        message.error("something wrong");
    }
}