import React from 'react'
import {Link} from "react-router-dom";
import './coverList.css'
import {CSSTransition, TransitionGroup} from "react-transition-group";


export const CoverList = ({covers}) => (
    <TransitionGroup component={'div'} className='row align-items-center '>
        {covers.map((cover, index) => (
            <CSSTransition
                timeout={1000}
                classNames="item"
                key={index}
            >
                <div className="col-8 col-sm-8 col-md-4 col-lg-4 col-xl-2 p-4">
                    <Link className='text-dark' to={`/detail/${cover._id}`}>
                        <div className="card" style={{cursor: 'pointer'}}>
                            <div className="card-body">
                                <img src={cover.filedataName} className="card-img-top" alt={cover.author}/>
                            </div>
                        </div>
                    </Link>
                </div>
            </CSSTransition>
        ))
        }
    </TransitionGroup>
);


