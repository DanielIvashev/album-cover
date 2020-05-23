import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {Link, useParams} from 'react-router-dom';
import {Loader} from "../components/loader";
import {CSSTransition} from "react-transition-group";
import '../components/coverList.css'

export const DetailPage = () => {

    const [show, setShow] = useState(false);
    const {token} = useContext(AuthContext);
    const {request, loading} = useHttp();
    const [cover, setCover] = useState(null);
    const coverId = useParams().id;

    const getCover = useCallback(async () => {
        try {

            const fetched = await request(`/api/covers/${coverId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });


            await setCover(fetched);
            setShow(true)
        } catch (e) {
        }
    }, [token, coverId, request]);


    useEffect(() => {
        getCover();
    }, [getCover]);


    if (loading) {
        return (
            <div className='vh-100 d-flex align-items-center'>
                <Loader/>
            </div>
        )
    }


    return (
        <CSSTransition
            classNames='item'
            in={show}
            timeout={1000}
            mountOnEnter
            unmountOnExit
        >
            <div className='container-fluid item'>
                <Link to='/covers' type="button" className="btn btn-link text-dark">
                    <svg className="bi bi-arrow-left-short" width="1em" height="1em" viewBox="0 0 16 16"
                         fill="currentColor"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M7.854 4.646a.5.5 0 010 .708L5.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z"
                              clipRule="evenodd"/>
                        <path fillRule="evenodd" d="M4.5 8a.5.5 0 01.5-.5h6.5a.5.5 0 010 1H5a.5.5 0 01-.5-.5z"
                              clipRule="evenodd"/>
                    </svg>

                    go to the covers list
                </Link>
                {
                    !loading && !!cover
                    &&

                    <div className="jumbotron">
                        <img src={cover.filedataName}
                             className='mw-100 bord'
                             style={{borderRadius: '.3rem'}}
                             alt=""/>
                        <hr/>
                        <h1 className="display-4">author: {cover.author}</h1>
                        <hr/>
                        <p className="lead">label: {cover.label}</p>
                        <p>genre: {cover.genre}</p>
                        <p>date: {cover.date}</p>
                    </div>
                }
            </div>
        </CSSTransition>
    )
};