import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import './DetailsNews.css';
import { useForm } from "react-hook-form";
import { REACT_API_URL } from '../../../Utils';

const DetailsNews = () => {
    const [detailsNews, setDetailsNews] = useState({});
    const [comment, setComment] = useState("");
    const { newsId } = useParams();

    useEffect(() => {
        fetch(`${REACT_API_URL}/news`)
            .then(res => res.json())
            .then(data => setDetailsNews(data.data.find(news => news._id === newsId)));
    }, [newsId]);

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        setComment(data.comment);
        reset();
    };


    return (
        <div>
            <Header />
            <div className='detail__content'>
                <div className='details__header'>
                    <h1>{detailsNews.headLine}</h1>
                    <p> Author: {detailsNews.author}</p>
                    <span>Published: {detailsNews.publishedDate}</span>
                </div>
                <div className='details_image'>
                    <img src={detailsNews.photoUrl} alt="News banner" />
                </div>
                <div className='detail__description'>
                    <p>{detailsNews.description}</p>
                </div>
            </div>
            <div className='comment__section'>
                <div className='comment__form'>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <textarea placeholder='Write your comment' {...register("comment", { required: true })} required /> <br />

                        <input type="submit" value="Comment" />
                    </form>
                </div>
                <hr />
            </div>

            <div className='users__comment'>
                <p> Your Comment: {comment}</p>
            </div>
            <Footer />
        </div>
    );
};

export default DetailsNews;