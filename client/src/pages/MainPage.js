import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import {useAuth} from "../hooks/auth.hook";
import {CSSTransition} from "react-transition-group";

export const MainPage = () => {
    const [show, setShow] = useState(false);
    const {token} = useAuth();


    useEffect(() => {
        setShow(show => true)
    }, []);


    return (
        <CSSTransition
            classNames='item'
            in={show}
            timeout={1000}
            mountOnEnter
            unmountOnExit
        >
            <div className='container-fluid vh-100 d-flex justify-content-center align-items-center flex-column'>
                <h1 className='mb-0 text-center'>to see the covers, click here</h1>
                <svg className="bi bi-arrow-down" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M4.646 9.646a.5.5 0 01.708 0L8 12.293l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z"
                          clipRule="evenodd"/>
                    <path fillRule="evenodd" d="M8 2.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V3a.5.5 0 01.5-.5z"
                          clipRule="evenodd"/>
                </svg>
                <Link to='/covers'
                      type='button'
                      className='btn btn-outline-dark mt-5 '
                      style={{transition: '0.3s'}}

                >
                    see
                </Link>
                {
                    !!token ? <Link to='/create'
                                    type='button'
                                    className='btn btn-outline-dark position-fixed align-self-end'
                                    style={{transition: '0.3s', bottom: '1rem'}}

                        >
                            create
                        </Link>
                        :
                        <Link to='/auth'
                              type='button'
                              className='btn btn-outline-dark position-fixed align-self-end'
                              style={{transition: '0.3s', bottom: '1rem'}}

                        >
                            authorization
                        </Link>
                }

            </div>
        </CSSTransition>
    )
};