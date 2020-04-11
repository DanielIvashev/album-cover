import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useMessage} from "../hooks/message.hook";
import {useHttp} from "../hooks/http.hook";
import {useHistory} from 'react-router-dom'
import {CSSTransition} from "react-transition-group";

export const AuthPage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const message = useMessage();
    const [alert, setAlert] = useState(null);
    const {loading, error, request} = useHttp();
    const [show, setShow] = useState(false);

    const [form, setForm] = useState({
        login: '',
        password: ''
    });

    useEffect(() => {
        setAlert(message(error));
        setShow(true)
    }, [error, message]);

    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    };

    const registerHandler = async () => {
        try {
            const data = await request('/auth/register', 'POST', {...form});
            setAlert(message(data.message));
        } catch (e) {
        }
    };

    const loginHandler = async () => {
        try {
            const data = await request('/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId, data.userName);
            history.push(`/create`)
        } catch (e) {}
    };

    return (
        <CSSTransition
            classNames='item'
            in={show}
            timeout={1000}
            mountOnEnter
            unmountOnExit
        >
        <div className='container-fluid d-flex flex-column text-center'>
            <div className="row">
                <h2 className="pb-5 pt-5 col-12">AUTHORIZATION</h2>
                        <form className='m-auto pb-5 col-12 col-sm-10 col-md-6 col-lg-6 col-xl-6'>
                            <div className="form-group">
                                <label htmlFor="login">login</label>
                                <input type="login"
                                       className="form-control"
                                       id="login"
                                       aria-describedby="emailHelp"
                                       name="login"
                                       onChange={changeHandler}
                                       value={form.login}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">password</label>
                                <input type="password"
                                       className="form-control"
                                       id="password"
                                       name="password"
                                       onChange={changeHandler}
                                       value={form.password}
                                />
                            </div>

                                <div className='mb-3'>{alert}</div>

                            <button className="btn btn-dark mb-2"
                                    style={{width: '100%'}}
                                    disabled={loading}
                                    onClick={loginHandler}
                            >
                                sign in
                            </button>
                            <button
                                className="btn btn-light"
                                style={{width: '100%'}}
                                onClick={registerHandler}
                                disabled={loading}
                            >
                                sign up
                            </button>
                        </form>
                    </div>
                </div>
        </CSSTransition>
    )
};