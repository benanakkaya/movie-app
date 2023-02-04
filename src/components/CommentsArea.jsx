import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getMovieComments, setMovieComment, setNewComment, updateList } from '../redux/movies/moviesSlice';
import * as yup from "yup";
import { nanoid } from '@reduxjs/toolkit';
import { toast, ToastContainer } from 'react-toastify';

function CommentsArea({ movie }) {

    const dispatch = useDispatch();
    const movieComments = useSelector((state) => state.movies.movieComments);
    const username = JSON.parse(localStorage.getItem("username"));
    const [commentAuthor, setCommentAuthor] = useState(username);
    const loginState = useSelector((state) => state.users.login);


    console.log(movieComments)

    useEffect(() => {
        dispatch(getMovieComments(movie));
    }, [movie])

    const formik = useFormik({
        initialValues: {
            id: nanoid(),
            author: commentAuthor,
            comment: "",
            date: String(new Date())
        },
        onSubmit: (values) => {
            if (loginState === true) {
                values.id = nanoid();
                values.date = String(new Date());
                dispatch(setMovieComment(values));
                dispatch(updateList({ id: movie[0].id, changes: { comments: [...movie[0].comments, values] } }))
                dispatch(setNewComment([movie[0].id, movieComments, values]));
                formik.resetForm();

                //For toast

                toast.success('Yorumunuz başarıyla eklendi...', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            else {
                window.alert("Yorum yapmak için, giriş yapmalısın.")
            }
        },
        validationSchema: yup.object({
            comment: yup.string().required("Yorum kısmı boş kalamaz...").min(10, "Yorumunuz çok kısa...").max(100, "Yorumunuz çok uzun...")
        })
    })


    return (
        <div className='conrainer comments-area'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                className="custom-toast"
            />
            <div className='comments-write-header p-3 ps-5 pt-4 mb-1'>
                <h6 className='cat-head'><i className="fa-solid fa-bookmark bookmark me-2"></i>Yorum Yap</h6>
            </div>
            <div className='comment-write ps-5 pe-5 pb-3'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='row'>
                        <textarea name='comment' value={formik.values.comment} onChange={formik.handleChange} onBlur={formik.handleBlur} className='col comment-textarea p-3'></textarea>
                        {formik.touched.comment && formik.errors.comment ? <small style={{ color: "red" }}>{formik.errors.comment}</small> : null}
                    </div>
                    <div className='mt-3 d-flex align-items-center justify-content-end'>
                        <input name='author' onChange={(e) => e.target.checked === true ? formik.values.author = "Anonymous" : formik.values.author = username} type="checkbox" className='ms-2' ></input>
                        <label htmlFor='author' className='ms-2 me-2'>Kullanıcı Adımı Gizle</label>
                        <button type='submit' className='btn btn-primary'>Yorum Ekle</button>
                    </div>
                </form>
            </div>


            {/* COMMENT LIST */}

            <div className='comment-list-header p-3 ps-5 mb-1'>
                <h6 className='cat-head'><i className="fa-solid fa-bookmark bookmark me-2"></i>Yorumlar</h6>
            </div>

            <div className='comments ps-5 pe-5 pb-3'>
                {movieComments.length === 0 ?
                    <div class="alert alert-warning " role="alert">
                        Henüz bu film için hiçbir yorum yapılmadı.
                    </div>

                    :
                    <div className='comment-list'>
                        {movieComments.map((com) => (
                            <div key={com.id}>
                                <div className='d-flex p-2'>
                                    <div className='comment-avatar'>
                                        <img className='avatar' src={require("../images/avatar.png")} alt="avatar" />
                                    </div>

                                    <div className='comment-body d-flex flex-column ms-2'>
                                        <h6 className='comment-head ms-4 d-flex'><span className='comment-author'>{com.author}</span> <span className='comment-date ms-2 d-none d-md-block'>● {com.date.slice(4, 21)}</span></h6>
                                        <p className='comment-text ms-4'>{com.comment}</p>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        ))}
                    </div>
                }
            </div>

        </div>
    )
}


export default CommentsArea;