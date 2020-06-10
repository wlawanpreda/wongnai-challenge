import axios from 'axios';

const url = `http://localhost:5556`;

export const urlGenerator = (search, searchOption) => {
    if(search && searchOption==="keyword") {
        return `${url}/reviews?query=${search}`;
    }
    if(search && searchOption==="id") {
        return `${url}/reviews/${search}`;
    }
    return null;
}