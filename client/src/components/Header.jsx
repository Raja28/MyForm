

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import my_form_logo from "../assets/My-form.png"

export const Header = () => {

    const { token, user } = useSelector(state => state.user);

    useEffect(() => {

    }, []);

// console.log(user);

    return (
        <header className='border border-bottom '>
            <nav className=" navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <Link to={"/"} className="navbar-brand rounded  p-0" style={{ maxWidth: "7rem", overflow: "hidden" }} href="/dashboard" >
                        <img src={my_form_logo}
                            alt="my form logo image"
                            className='w-100 h-100 rounded img-fluid '
                        />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel" style={{ maxWidth: "8rem" }}>
                                <Link to="/" className="navbar-brand rounded  p-0" style={{ maxWidth: "8.5rem", overflow: "hidden" }} >
                                    <img src={my_form_logo}
                                        alt="my form logo image"
                                        className='w-100 h-100 rounded img-fluid '
                                    />
                                </Link>
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <div className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                {
                                    token !== null && user ? (<div className=''>
                                        <div className=''>
                                            <Link to={"/"}  >

                                                <div className='rounded-circle border ' style={{ maxWidth: "2.5rem" }}>

                                                    <img
                                                        src={`https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
                                                        className="rounded-circle border w-100 h-100 object-fit-cover "
                                                        alt="user profile image"

                                                    />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>) :
                                        (
                                            <div className='d-flex gap-3'>
                                                {/* <div>
                                                    <Link href={"/login"} className='btn fw-semibold btn-outline-dark'>
                                                        Login
                                                    </Link>
                                                </div> */}
                                            </div>
                                        )
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}