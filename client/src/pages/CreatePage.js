import React, {useContext, useEffect, useReducer, useState} from "react";
import {Link, useHistory} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import bsCustomFileInput from "bs-custom-file-input";
import {useAuth} from "../hooks/auth.hook";
import {useMessage} from "../hooks/message.hook";
import {CSSTransition} from "react-transition-group";

export const CreatePage = () => {
    const history = useHistory();
    const {isAuthenticated, logout} = useAuth();
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const [alert, setAlert] = useState(null);
    const message = useMessage();
    const [show, setShow] = useState(false);

    const [fileInputIsEmpty, setFileInputIsEmpty] = useState(true)

    const [cover, setCover] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            author: '',
            label: '',
            date: '',
            genre: '',
        }
    );

    const [coverImage, setCoverImage] = useState({});

    const availableButton =
        cover.author &&
        cover.label &&
        cover.date &&
        cover.genre && !fileInputIsEmpty;



    const changeHandler = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setCover({[name]: newValue})

    };

    useEffect(() => {
        bsCustomFileInput.init();
        setShow(true)
    }, []);

    const submitHandler = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('author', `${cover.author}`);
        formData.append('label', `${cover.label}`);
        formData.append('date', `${cover.date}`);
        formData.append('genre', `${cover.genre}`);
        formData.append('filedata', coverImage);
        try {
            const data = await request('/covers/create', 'POST', formData, {
                Authorization: `Bearer ${auth.token}`
            }, true);

            switch (data.message) {
                case 'no authorization':
                    setAlert(message(data.message));
                    setTimeout(() => {
                        logout();
                        history.push(`/`)
                    }, 7000);
                    break;
                case 'wrong mimetype':
                    setAlert(message(data.message));
                    break;
                default:
            }


            history.push(`/detail/${data.cover._id}`)

        } catch (e) {
        }
    };

    if (isAuthenticated) {
        logout();
        history.push(`/`)
    }

    return (
        <CSSTransition
            classNames='item'
            in={show}
            timeout={1000}
            mountOnEnter
            unmountOnExit
        >
        <div className='container-fluid d-flex flex-column text-center'>
            <Link to='/covers' type="button" className="btn btn-link text-dark text-left">
                <svg className="bi bi-arrow-left-short" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M7.854 4.646a.5.5 0 010 .708L5.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z"
                          clipRule="evenodd"/>
                    <path fillRule="evenodd" d="M4.5 8a.5.5 0 01.5-.5h6.5a.5.5 0 010 1H5a.5.5 0 01-.5-.5z"
                          clipRule="evenodd"/>
                </svg>

                go to the covers list
            </Link>
            <div className="row">
                <h2 className='p-5 col-12'>CREATE A NEW COVER</h2>
                <form
                    onSubmit={submitHandler}
                    className='m-auto pb-5 col-12 col-sm-10 col-md-6 col-lg-6 col-xl-6'
                    encType="multipart/form-data"
                >
                    <div className="form-group">
                        <label htmlFor="author">author</label>
                        <input type="text"
                               className="form-control"
                               id="author"
                               aria-describedby="emailHelp"
                               value={cover.author}
                               name='author'
                               onChange={changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="label">label</label>
                        <input type="text"
                               className="form-control"
                               id="label"
                               aria-describedby="emailHelp"
                               value={cover.label}
                               name='label'
                               onChange={changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">date</label>
                        <input type="text"
                               className="form-control"
                               id="date"
                               aria-describedby="emailHelp"
                               value={cover.date}
                               name='date'
                               onChange={changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="genre">genre</label>
                        <input type="text"
                               className="form-control"
                               id="genre"
                               aria-describedby="emailHelp"
                               value={cover.genre}
                               name='genre'
                               onChange={changeHandler}
                        />
                    </div>

                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="customFile"
                               name='filedata'
                               onChange={e => {
                                   if (e.target.value.length > 0) {
                                       setCoverImage(e.target.files[0]);
                                       setFileInputIsEmpty(false);
                                   } else if (e.target.value.length === 0) {
                                       setFileInputIsEmpty(true)
                                   }

                               }
                               }/>
                        <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                    </div>
                    <div className="form-group mt-4">
                        {
                            alert
                        }
                    </div>
                    <button
                        type='submit'
                        disabled={!availableButton}
                        className='btn btn-outline-dark mt-5'
                        style={{transition: '0.3s', bottom: '1rem'}}
                    >
                        submit
                    </button>
                </form>
            </div>
        </div>
        </CSSTransition>
    )
};