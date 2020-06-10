import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { PageHeader, Form, Input, Button, message } from "antd";

import axios from 'axios';

import { urlGeneratorQuery, updateReview } from "../models/basic";


const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

// https://stackoverflow.com/questions/38037163/how-to-highlight-the-difference-of-two-texts-with-css
function highlight(newText, oldText){ 
    const text = '';

    newText.split('').forEach(function(val, i){
        if (val != oldText.charAt(i))
            text += "<span class='highlight'>"+val+"</span>";  
        else
            text += val;            
    });
    newElem.html(text); 
}
  
export default props => {
    const { id } = props;
    const [form] = Form.useForm();

    const router = useRouter();

    const [reviewDB, setReviewDB] = useState();
    const [formInput, setFormInput] = useState();
    const [err, setErr] = useState();

    useEffect(() => {
        async function fetch() {
            const url = urlGeneratorQuery(id, "id");
            const { data } = await axios(url);
            setReviewDB(data);

            if(err) {
                form.setFieldsValue(data);
                message.success('review changed!!');
                setErr(false);
            }
        }
        fetch();
    }, [err])

    useEffect(() => {

        if(!formInput) return ;
        const newReview = reviewDB; 
        newReview.review = formInput.review;

        async function update() {
            try{
                const { data } = await updateReview(newReview);
                if(data){
                    setReviewDB(data);
                    message.success('updated');
                }
            } catch(err) {
                setErr(true);
            }
        }
        update();

    }, [formInput])

    if(!reviewDB) return 'loading...'
    
    return (
       <PageHeader
            style={{ minWidth: "800px" }}
            onBack={() => router.push('/')}
            title="Edit"
            >

            <Form form={form} {...layout} name="nest-messages" onFinish={setFormInput}>
                <Form.Item initialValue={reviewDB.review} name={"review"} label="Review">
                    <Input.TextArea  rows={12} />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
            
        </PageHeader>
    )
}