import { useEffect, useState } from "react";
import { List, Typography, Input, Select, AutoComplete } from "antd";
import useSWR from 'swr';

import { axiosGraphqlKeywords } from "../models/graphql";

const { Search } = Input;
const { Option } = Select;


const SearchInput = props => {
    
    const { setSearch, searchOption, setSearchOption } = props;

    const [query, setQuery] = useState()
    const [keywords, setKeywords] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        async function fetch() {
            const dataKeywords = await axiosGraphqlKeywords();
             setKeywords( dataKeywords ? dataKeywords : [])
        }
        fetch();
    }, [])

    // .map(value => ({ value }))
    useEffect(() => {
        setOptions( keywords.filter(v => v.includes(query)).map(value => ({ value })) )
    }, [query])


    return (
        <Input.Group>
            <Select defaultValue={searchOption} onChange={setSearchOption}>
                <Option value="keyword">By Keyword</Option>
                <Option value="id">By ID</Option>
            </Select>
            {searchOption==="keyword" &&
                <AutoComplete
                    options={options}
                    onSelect={setSearch}
                    onSearch={setQuery}
                >
                    <Search onSearch={setSearch} placeholder="input search text"/>
                </AutoComplete>}

            {searchOption==="id" &&
                <Search style={{ width: "300px" }} onSearch={setSearch} placeholder="input search text"/>}
        </Input.Group>
    )
}


export default SearchInput;