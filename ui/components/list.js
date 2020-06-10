import { useEffect, useState } from "react";
import { List, Typography } from "antd";
import Link from 'next/link';

import axios from 'axios';
import useSWR from 'swr';
import * as parse from 'html-react-parser';

import SearchInput from "./searchInput";
import { urlGeneratorQuery } from "../models/basic";


const { Paragraph } = Typography;


export default props => {
    const [search, setSearch] = useState();
    const [searchOption, setSearchOption] = useState("keyword");


    useEffect(() => { setSearch() }, [searchOption]);

    const url = urlGeneratorQuery(search, searchOption);
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
            footer={search && searchOption ? <small>filter "{search}"  by {searchOption} method</small> : ``}
            bordered
            loading={search && searchOption && !reviews ? true : false} 
            dataSource={reviews ? reviews.data : []}
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