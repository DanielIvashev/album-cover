import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/loader";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {CoverList} from "../components/CoverList";
import {Link} from "react-router-dom";
import {CSSTransition} from "react-transition-group";


export const CoversPage = () => {
    const [covers, setCovers] = useState([]);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);
    const [skip, setSkip] = useState(0);
    const message = useMessage();
    const [alert, setAlert] = useState(null);
    const [shouldHideButton, setShouldHideButton] = useState(false);
    const [show, setShow] = useState(false);

    const fetchCovers = useCallback(async () => {
        try {
            const fetched = await request('/api/covers', 'GET', null, {
                Authorization: `Bearer ${token}`,
                skip: `${skip}`
            });

            if (fetched.length === 0) {
                setShouldHideButton(true);
                return setAlert(message('there are no more covers here'))
            }
            setCovers(covers => [...covers, ...fetched]);
            setShow(true)

        } catch (e) {
        }

    }, [token, request, skip, message]);


    useEffect(() => {
        fetchCovers();
    }, [fetchCovers]);


    if (covers.length === 0) {
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
            <div>
                <Link to='/' type="button" className="btn btn-link text-dark text-left">
                    <svg className="bi bi-arrow-left-short" width="1em" height="1em" viewBox="0 0 16 16"
                         fill="currentColor"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M7.854 4.646a.5.5 0 010 .708L5.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z"
                              clipRule="evenodd"/>
                        <path fillRule="evenodd" d="M4.5 8a.5.5 0 01.5-.5h6.5a.5.5 0 010 1H5a.5.5 0 01-.5-.5z"
                              clipRule="evenodd"/>
                    </svg>

                    go to the main page
                </Link>
                <div className='container-fluid d-flex flex-wrap flex-column justify-content-center pb-5'
                     style={{minHeight: "100vh", textAlign: 'center'}}
                >

                    <CoverList covers={covers}/>
                    {
                        loading ?
                            <Loader/>
                            : null
                    }

                    {
                        alert
                    }
                    {
                        shouldHideButton ? null :
                            <button onClick={() => setSkip(skip + 1)}
                                    type='button'
                                    className='btn btn-outline-dark mt-5 '
                                    style={{transition: '0.3s'}}
                            >
                                click
                            </button>
                    }

                </div>
            </div>
        </CSSTransition>
    )
};