import React, { useState } from 'react';
import { ModalBody, SignupButton, ErrMsg } from './styled';
import { showConfiltModal, showSignupModal } from '../../store/modal-slice';
import { useDispatch } from 'react-redux';
import CheckBox from './CheckBox';
import axios from 'axios';
import { REACT_APP_API_URL } from 'config';
import { showMiniMoal, insertText } from 'store/modal-slice';
interface SignupInfo {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupInput = () => {
  const dispatch = useDispatch();

  const [signupInfo, setSignupInfo] = useState<SignupInfo>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [checkState, setCheckState] = useState<boolean>(false);
  const [nameErr, setNameErr] = useState<string>('hidden');
  const [emailErr, setEmailErr] = useState<string>('hidden');
  const [passwordErr, setPasswordErr] = useState<string>('hidden');
  const [confirmPasswordErr, setConfirmPasswordErr] =
    useState<string>('hidden');
  const { name, email, password, confirmPassword }: SignupInfo = signupInfo;

  const handleInputValue =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = { ...signupInfo, [key]: e.target.value };
      setSignupInfo(next);
      isAllValid(next);
    };

  const isAllValid = (signupInfo: SignupInfo): boolean => {
    const { name, email, password, confirmPassword }: SignupInfo = signupInfo;

    const isNameValid = checkName(name);
    const isEmailValid = checkEmail(email);
    const isPasswordValid = checkPassword(password);
    const isConfirmPasswordValid = checkConfirmPassword(
      password,
      confirmPassword
    );

    return isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isNameValid
      ? true
      : false;
  };

  const resetInfo = () => {
    setSignupInfo({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setNameErr('');
    setEmailErr('');
    setPasswordErr('');
    setConfirmPasswordErr('');
  };

  const isExist = () => {
    const { name, email, password, confirmPassword }: SignupInfo = signupInfo;

    checkExist(name, '?????????') &&
    checkExist(email, '????????????') &&
    checkExist(password, '???????????????') &&
    checkExist(confirmPassword, '???????????? ?????????')
      ? true
      : false;

    return checkExist;
  };

  const checkExist = (value: string, input: string): boolean => {
    if (value === '') {
      dispatch(showMiniMoal(true));
      dispatch(insertText(input + ' ??????????????????!'));
      return false;
    }
    return true;
  };

  const checkName = (name: string): boolean => {
    let nameExp = /^[???-???]{2,6}$/;
    if (name === '') {
      setNameErr('hidden');
      return false;
    }
    if (!nameExp.test(name)) {
      setNameErr('');
      return false;
    }
    setNameErr('hidden');
    return true;
  };

  const checkEmail = (email: string): boolean => {
    let emailExp =
      /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (email === '') {
      setEmailErr('hidden');
      return false;
    }
    if (!emailExp.test(email)) {
      setEmailErr('');
      return false;
    }
    setEmailErr('hidden');
    return true;
  };

  const checkPassword = (password: string): boolean => {
    let passwordExp = /^[a-zA-z0-9]{6,12}$/;
    if (password === '') {
      setPasswordErr('hidden');
      return false;
    }
    if (!passwordExp.test(password)) {
      setPasswordErr('');
      return false;
    }
    setPasswordErr('hidden');
    return true;
  };

  const checkConfirmPassword = (
    password: string,
    confirmPassword: string
  ): boolean => {
    if (confirmPassword === '') {
      setConfirmPasswordErr('hidden');
      return false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordErr('');
      return false;
    }
    setConfirmPasswordErr('hidden');
    return true;
  };

  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isExist() && isAllValid(signupInfo)) {
      try {
        if (!checkState) {
          dispatch(showMiniMoal(true));
          dispatch(insertText('?????? ?????????????????? ???????????? ????????? ???????????????.'));
          return;
        }
        await axios.post(
          `${REACT_APP_API_URL}/signup`,
          { name, email, password },
          { withCredentials: true }
        );
        resetInfo();
        dispatch(showConfiltModal(true));
        dispatch(showSignupModal(false));
      } catch (err) {
        console.log(err);
        dispatch(showMiniMoal(true));
        dispatch(insertText('??????????????? ?????????????????????. ?????? ??????????????????????'));
      }
    }
  };

  return (
    <ModalBody>
      <form>
        <label htmlFor="name">??????</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={handleInputValue('name')}
        />
        <ErrMsg className={nameErr === 'hidden' ? 'hidden' : 'errMsg'}>
          <span>????????? ?????? ?????? ??? ?????? ??????????????? ?????????.</span>
        </ErrMsg>
        <label htmlFor="email">?????????</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleInputValue('email')}
        />
        <ErrMsg className={emailErr === 'hidden' ? 'hidden' : 'errMsg'}>
          <span>???????????? ?????? ????????? ???????????????.</span>
        </ErrMsg>
        <label htmlFor="password">????????????</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handleInputValue('password')}
        />
        <ErrMsg className={passwordErr === 'hidden' ? 'hidden' : 'errMsg'}>
          <span>
            ??????????????? ?????? ??????????????? ?????? 6~12????????? ?????????????????????.
          </span>
        </ErrMsg>
        <label htmlFor="confirm-password">???????????? ??????</label>
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={handleInputValue('confirmPassword')}
        />
        <ErrMsg
          className={confirmPasswordErr === 'hidden' ? 'hidden' : 'errMsg'}
        >
          <span>??????????????? ???????????? ????????????.</span>
        </ErrMsg>
        <CheckBox setCheckState={setCheckState} />
        <SignupButton onClick={handleSignup}>????????????</SignupButton>
      </form>
    </ModalBody>
  );
};

export default SignupInput;
