import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleUserLogin } from '../../Redux/ReduxSlice';

const LinkedInCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const email = params.get('email');
    const name = params.get('name');
    const userType = params.get('userType');

    if (token && email && name && userType) {
      dispatch(handleUserLogin({ token, email, name, userType }));
      navigate('/');
    } else {
      console.error('LinkedIn login failed');
    }
  }, [dispatch, location, navigate]);

  return <div>Loading...</div>;
};

export default LinkedInCallback;
