import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from 'store/userInfo-slice';
import { showMiniMoal, insertText } from 'store/modal-slice';
import {
  SettingNickName,
  ChangeButton,
  SettingImg,
  SettingSelfIntroduction
} from './styled';
import { ProjectBody, Container } from 'components/StartProject/commonStyled';
import { UserInfoData } from 'components/Modal/type';
import userImg from 'images/icons/user-icon.png';
import { RootState } from 'index';
import { REACT_APP_API_URL } from 'config';
import { useHistory } from 'react-router';

interface profileProps {
  name: string;
  bio: string;
}

interface imageProps {
  profile_url: string;
}
function ProfileSetting() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);
  const [profileContent, setProfileContent] = useState<profileProps>({
    name: '',
    bio: ''
  });
  const { name, bio } = profileContent;
  const [isNameVaild, setIsNameVild] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string | undefined>(
    userInfo.profile_url || ''
  );
  // const [image, setImage] = useState<string>(userImg);

  useEffect(() => {
    axios
      .get<UserInfoData>(`${REACT_APP_API_URL}/users/me`, {
        withCredentials: true
      })
      .then((res) => {
        dispatch(getUserInfo(res.data));
      });
  }, []);

  useEffect(() => {
    setImgSrc(userInfo.profile_url);
    setProfileContent({
      name: userInfo.nickname || '',
      bio: userInfo.bio || ''
    });
  }, [userInfo]);

  const handleInput =
    (key: string) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setIsNameVild(false);
      setProfileContent({
        ...profileContent,
        [key]: e?.target.value
      });
    };

  const changeNickname = async () => {
    try {
      await axios.patch(
        `${REACT_APP_API_URL}/users/me`,
        { nickname: name },
        { withCredentials: true }
      );
      dispatch(showMiniMoal(true));
      dispatch(insertText('???????????? ??????????????? ?????????????????????.'));
    } catch (err) {
      console.log(err);
      setIsNameVild(true);
    }
  };

  const handleBio = async () => {
    await axios.patch(
      `${REACT_APP_API_URL}/users/me`,
      { bio },
      { withCredentials: true }
    );

    dispatch(showMiniMoal(true));
    dispatch(insertText('??????????????? ??????????????? ?????????????????????.'));
  };

  const handleProfileIma = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imageFile = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imageFile);
      fileReader.onload = (e: any) => {
        setImgSrc(e.target.result);
      };

      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await axios.post<imageProps>(
        `${REACT_APP_API_URL}/users/profile`,
        formData,
        {
          withCredentials: true
        }
      );
      setImgSrc(response.data.profile_url);
      dispatch(showMiniMoal(true));
      dispatch(insertText('????????? ???????????? ??????????????? ?????????????????????.'));
      history.go(0);
    }
  };
  return (
    <Container>
      <ProjectBody>
        <h2>????????? ??????</h2>
        <p>?????? ?????? ?????? ??????????????? ???????????????.</p>

        <SettingNickName>
          <h3>?????????</h3>
          <input onChange={handleInput('name')} value={profileContent.name} />
          <ChangeButton onClick={changeNickname}>??????</ChangeButton>
          {isNameVaild && <p>?????? ???????????? ??????????????????.</p>}
        </SettingNickName>

        <SettingSelfIntroduction>
          <h3>????????????</h3>
          <textarea onChange={handleInput('bio')} value={profileContent.bio} />
          <ChangeButton onClick={handleBio}>??????</ChangeButton>
        </SettingSelfIntroduction>

        {imgSrc ? (
          <SettingImg>
            <h3>????????? ?????????</h3>
            <p>???????????? ???????????? ???????????????.</p>
            <label htmlFor="TeamImg">
              <img src={`https://jisiksponsor.com${imgSrc}`} />
            </label>
            <input type="file" id="TeamImg" onChange={handleProfileIma} />
          </SettingImg>
        ) : (
          <SettingImg>
            <h3>????????? ?????????</h3>
            <p>???????????? ???????????? ???????????????.</p>
            <label htmlFor="TeamImg">
              <img src={userImg} />
            </label>
            <input type="file" id="TeamImg" onChange={handleProfileIma} />
          </SettingImg>
        )}
      </ProjectBody>
    </Container>
  );
}

export default ProfileSetting;
