import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {handleUserLogin} from '../../Redux/ReduxSlice'

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');
    const name = urlParams.get('name');
    const userType = urlParams.get('userType');

    if (token && email && name && userType) {
      // Dispatch the action to store user details in Redux
      dispatch(handleUserLogin({ token, email, name, userType }));

      // Store token in localStorage
      localStorage.setItem('token', token);

      // Redirect to the appropriate route
      navigate('/');
    }
  }, [dispatch, location.search, navigate]);

  return <div>Loading...</div>;
};

export default GoogleCallback;
