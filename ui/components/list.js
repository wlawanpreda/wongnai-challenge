import { useEffect, useState } from "react";
import { List, Typography, Tag, message } from "antd";
import Link from 'next/link';

import axios from 'axios';
import * as parse from 'html-react-parser';

import SearchInput from "./searchInput";
import { urlGeneratorQuery } from "../models/basic";


const { Paragraph } = Typography;


export default props => {
    const [search, setSearch] = useState();
    const [searchOption, setSearchOption] = useState("keyword");
    const [reviews, setReviews] = useState();

    useEffect(() => { setSearch() }, [searchOption]);

    useEffect(() => {
        async function fetch() {
            const url = urlGeneratorQuery(search, searchOption);
            try {
                const { data } = await axios.get(url);
                setReviews(
                    searchOption === "id"
                        ? [data]
                        : data
                );
            } catch (error) {
                setReviews([]);
                message.error(`something wrong!`);
            }
        }
        if(search && searchOption) 
            fetch();
    }, [search])
    
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
            footer={search && searchOption ? <small><Tag>{searchOption} filter</Tag> "{search}"</small> : ``}
            bordered
            loading={search && searchOption && !reviews ? true : false} 
            dataSource={reviews ? reviews : []}
            renderItem={({ reviewID, review, version }) => (
                <List.Item
                    actions={[
                        <Link href="/edit/[id]" as={`/edit/${reviewID}`}><a>Edit</a></Link>
                    ]}
                    >

                    <Paragraph>
                        {parse(review.replace(/\n/g, '<br/>'), { trim: true })}
                    </Paragraph>
                </List.Item>
            )}
        />
    )
}