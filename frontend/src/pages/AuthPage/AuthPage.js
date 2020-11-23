import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from "react-router-dom";
import device from '../../common/deviceSizes';
import MainPage from '../../components/MainPage/MainPage';
import styled from 'styled-components';
import Calculator from '../../components/Calculator/Calculator';
import action from '../../redux/actions/authAction'
import Modal from '../../components/Modal/Modal';
import { useDispatch } from 'react-redux';
import GiftCompleting from '../../components/GiftCompleting/GiftCompleting';

const AuthPage = () => {
  const [isShowRegistration, setIsShowRegistration] = useState(false);
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

   useEffect(() => {
     const token = new URLSearchParams(location.search).get("token")
    dispatch(action.loginSuccess({token}))

    console.log(Location,"location.pathname")
  }, [location.search]);


  // const showModalAuth = e => {
  //   e.target.innerText === 'Рeгистрация'
  //     ? setIsShowRegistration(true)
  //     : setIsShowLogin(true);
  // };

  const showCalculatorHandler = () => {
    setShowCalculator(!showCalculator);
  };

  const closeRegistration = () => {
    setIsShowRegistration(prev => !prev);
    // setIsShowLogin(prev => !prev);
  };

  const closeLogin = () => {
    setIsShowLogin(prev => !prev);
  };

  const isOnBigDevice = useMediaQuery({
    query: device.largeDevice,
  });
  return (
    <>
      {/* {isOnBigDevice && (
        <>
          <Button type="button" onClick={e => showModalAuth(e)}>
            Рeгистрация
          </Button>
          <Button type="button" onClick={e => showModalAuth(e)}>
            Вход
          </Button>
        </>
      )} */}
      {/* <button type="button" onClick={() => showCalculatorHandler()}>
        calculator
      </button>
      {showCalculator && <Calculator />} */}
      {/* {isShowRegistration && (
        <Modal closeModal={closeRegistration}>
          <Registration closeModal={closeRegistration} />
        </Modal>
      )}
      {isShowLogin && (
        <Modal closeModal={closeLogin}>
          <Login closeModal={closeLogin} />
        </Modal>
      )} */}
      <MainPage />
    </>
  );
};

const Button = styled.button`
  margin: 10px;
  padding: 10px;
`;

export default AuthPage;
