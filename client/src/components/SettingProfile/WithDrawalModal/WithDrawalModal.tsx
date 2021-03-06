import React from 'react';
import { MiniModalBack, MiniModalContainer } from 'components/Modal/styled';
import { WithDrawalText, ButtonGroup } from './styled';
import { useDispatch } from 'react-redux';
import { showWithDrawalModal } from 'store/modal-slice';
import { logout } from 'store/login-slice';
import { showMiniMoal, insertText } from 'store/modal-slice';
import { useHistory } from 'react-router';
import { REACT_APP_API_URL } from 'config';
import axios from 'axios';

function WithDrawalModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleWithDrawal = async () => {
    await axios.delete(`${REACT_APP_API_URL}/users/me/`, {
      withCredentials: true
    });
    dispatch(logout());
    history.push('/');
    dispatch(showWithDrawalModal(false));
    dispatch(showMiniMoal(true));
    dispatch(insertText('그동안 지식스폰서를 이용해주셔서 감사합니다.'));
  };
  return (
    <div>
      <MiniModalBack onClick={() => dispatch(showWithDrawalModal(false))} />
      <MiniModalContainer>
        <WithDrawalText>
          <span onClick={() => dispatch(showWithDrawalModal(false))}>
            &times;
          </span>
          <h2>정말 회원탈퇴 하시겠습니까?</h2>
          <p>
            회원탈퇴를 하셔도 기존에 작성한 댓글, 게시글은 삭제되지 않습니다.
          </p>
          <ButtonGroup>
            <button onClick={() => dispatch(showWithDrawalModal(false))}>
              취소
            </button>
            <button onClick={handleWithDrawal}>회원탈퇴</button>
          </ButtonGroup>
        </WithDrawalText>
      </MiniModalContainer>
    </div>
  );
}

export default WithDrawalModal;
