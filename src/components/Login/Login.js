import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT') {
    return { value: action.payload, isValid: action.payload.includes('@') }
  }

  if(action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@')}
  }

  return { value: '', isValid: false }
}


const passwordReducer = (state, action) => {
  if(action.type === 'PASSWORD_INPUT') {
    return { value: action.payload, isValid: action.payload.trim().length > 6 }
  }

  if(action.type === 'PASSWORD_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6}
  }

  return { value: '', isValid: false }
}


const Login = (props) => {

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

 // the first argument is a reducer function, second is the initial state
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     //console.log('validity check');
  //     setFormIsValid(
  //       enteredEmail.value.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500)

  //   return () => { 
  //     //console.log('Cleaning up');
  //     clearTimeout(identifier);
  //   }
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', payload: event.target.value});

    setFormIsValid(
      event.target.value.includes('@') && passwordState.value.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'PASSWORD_INPUT', payload: event.target.value});

    setFormIsValid(
      emailState.value.includes('@') && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'PASSWORD_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
