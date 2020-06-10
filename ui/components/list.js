import { useEffect, useState } from "react";
import axios from 'axios';
import useSWR from 'swr';
import * as parse from 'html-react-parser';

import SearchInput from "./SearchInput";

import { List, Typography, Input } from "antd";
const { Paragraph } = Typography;
const { Search } = Input;

const apiDomain = `http://localhost:5556`;

const urlGenerator = (search, searchOption) => {
    if(search && searchOption==="keyword") {
        return `${apiDomain}/reviews?query=${search}`;
    }
    if(search && searchOption==="id") {
        return `${apiDomain}/reviews/${search}`;
    }
    return null;
}

export default props => {
    const [search, setSearch] = useState();
    const [searchOption, setSearchOption] = useState("keyword");
    console.log("PJ-LOG: searchOption", search, ' ', searchOption)

    useEffect(() => { setSearch() }, [searchOption])

    const url = urlGenerator(search, searchOption);
    const { data:reviews, error } = useSWR(url, axios);

    if(reviews && search && searchOption === "id")
        reviews.data = reviews.data ? [ reviews.data ] : [];
    
    return (
        <List
            header={
                <SearchInput 
                    search={search} 
                    setSearch={setSearch} 
                    searchOption={searchOption}
                    setSearchOption={setSearchOption}
                />
            }
            footer={search && searchOption ? `filter by ${search} (${searchOption})` : ``}
            bordered
            loading={search && searchOption && !reviews ? true : false} 
            dataSource={reviews ? reviews.data : []}
            renderItem={({review}) => (
                <List.Item>
                    <Paragraph>
                        {parse(review.replace(/\n/g, '<br/>'), { trim: true })}
                    </Paragraph>
                </List.Item>
            )}
        />
    )
}