import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/tools'>
          <i className='fas fa-tools' aria-hidden='true'></i>
          <span className='hide-sm'>Tools</span>
        </Link>
      </li>
      <li>
        <Link to='/profiles'>
          <i className='fa fa-users' aria-hidden='true'></i>
          <span className='hide-sm'>Users</span>
        </Link>
      </li>
      <li>
        <Link to='/posts'>
          <i className='fas fa-comments' aria-hidden='true'></i>
          <span className='hide-sm'>Posts</span>
        </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fa fa-id-card' aria-hidden='true'></i>
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to='#!'>
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'>Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          <i className='fa fa-users' aria-hidden='true'></i>
          <span className='hide-sm'>Users</span>
        </Link>
      </li>
      <li>
        <Link to='/register'>
          <i className='fa fa-user-plus' aria-hidden='true'></i>
          <span className='hide-sm'>Register</span>
        </Link>
      </li>
      <li>
        <Link to='/login'>
          <i className='fa fa-sign-in' aria-hidden='true'></i>
          <span className='hide-sm'>Login</span>
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> Macon Moves
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStatToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStatToProps, { logout })(Navbar);
