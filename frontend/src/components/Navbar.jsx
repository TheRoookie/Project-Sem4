import React, { Fragment, useState } from 'react';
import { Link, useNavigate,Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import '../style/nav.css';
import { ShoppingCart, Heart, User } from 'lucide-react';


const Navbar = ({ logout, isAuthenticated }) => {
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    const logoutUser = () => {
        logout();
        navigate('/login');// Set redirect state to true
    };

    const guestLinks = () => (
        <Fragment>
            <li className='nav-item'>
                <Link className='nav-link' to='/login'>Login</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/signup'>Sign Up</Link>
            </li>
        </Fragment>
    );

    const authLinks = () => (
        <li className='nav-item'>
            <button className='nav-link btn btn-link' style={{color:'#0c0c62' }} onClick={logoutUser}>Logout</button>
        </li>
    );

    

    return (
        <Fragment>
            <div className="navbar">
                <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                {/* <li><Link to="/Dashboard">Dashboard</Link></li> */}
                <li><Link to="/projects">Projects</Link></li>
                    <li className="nav-item dropdown" style={{color:'orange'}}>
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" style={{color:'#0c0c62'}} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <User size={25} strokeWidth={3} /> Profile 
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li><Link className="dropdown-item" to="/Dashboard"><i className="fa fa-user"></i>Wallet</Link></li>
                                                <li><Link className="dropdown-item" to="/order"><i className="fa fa-list"></i> My Orders</Link></li>
                                                <li><Link className="dropdown-item" to="#"> My Wishlist</Link></li>
                                                <li><Link className="dropdown-item" to="/cart"> My Cart</Link></li>
                                                <li><button className="dropdown-item" onClick={logoutUser}><i className="fa fa-sign-out"></i> Logout</button></li>
                                            </ul>
                                        </li>
                    {isAuthenticated ? authLinks() : guestLinks()}
                        </ul>
            </div>
        </Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);
