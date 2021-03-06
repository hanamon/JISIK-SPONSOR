import { useState, useEffect } from 'react';
import IntroNotYet from '../../components/DetailedProject/IntroSection/IntroNotYet';
import ProjectContent from 'components/DetailedProject/ProjectContent/ProjectContent';
import Profile from 'components/DetailedProject/Profile/Profile';
import Comments from 'components/DetailedProject/Comments/Comments';
import Sponsors from 'components/DetailedProject/Sponsors/Sponsors';
import TabButton from 'components/DetailedProject/TabButton/TabButton';
import TopButton from '../../images/icons/gotop-icon.png';
import { GoTopButton, ProjectContainer, Section, Wrapper } from './styled';
import { getProjectId } from 'store/projectState-slice';
import { useDispatch, useSelector } from 'react-redux';
import { UserInfoProps } from 'store/userInfo-slice';
import { getUserInfo } from 'store/userInfo-slice';
import { REACT_APP_API_URL } from 'config';
import { useHistory } from 'react-router';
import { RootState } from 'index';
import { Data, ProjectTeamMember } from './type';
import { RootObject } from '../../components/DetailedProject/Sponsors/type';
import axios from 'axios';
import IntroFinished from 'components/DetailedProject/IntroSection/IntroFinished';
import IntroAlready from 'components/DetailedProject/IntroSection/IntroAlready';

const DetailedProject = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const detailTab = useSelector((state: RootState) => state.detailPage);
  const isLogin = useSelector((state: RootState) => state.login.isLogin);
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);
  const { id } = userInfo;

  const [project, setProject] = useState<any>({});
  const [teams, setTeams] = useState<any>({});
  const [teamMember, setTeamMember] = useState<ProjectTeamMember[]>([]);
  const [isUserSponsor, setIsUserSponsor] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');
  const [author, setAuthor] = useState<any>({});
  const [sponsors, setSponsors] = useState<any>([]);
  const [count, setCount] = useState<number>(0);

  // ?????? ??????????????? ???????????? ???????????? ??????
  const getProjects = async () => {
    try {
      const url = window.location.pathname.slice(18);
      const response = await axios.get<Data>(
        `${REACT_APP_API_URL}/projects/single?slug=${url}`,
        { withCredentials: true }
      );
      const { projects } = response.data;
      const { id, status } = response.data.projects;
      setAuthor(projects.author);
      setProject(projects);
      setStatus(status);
      setTeams(projects.project_teams[0]);
      setTeamMember(projects.project_team_members);
      dispatch(getProjectId(id));
    } catch (err) {
      console.log(err);
      history.push('/404');
    }
  };

  // ?????? ????????? ????????? ?????? ???????????? ??????
  const getSponsors = async () => {
    try {
      const response = await axios.get<RootObject>(
        `${REACT_APP_API_URL}/projects/${project.id}/sponsors`,
        { withCredentials: true }
      );
      setCount(response.data.sponsors.count);
      setSponsors(response.data.sponsors.rows);
    } catch (err) {
      console.log(err);
    }
  };

  // ???????????? ????????? ????????? ???????????? ??????
  const fetchUserInfo = async () => {
    try {
      const url = `${REACT_APP_API_URL}/users/me`;
      const config = { withCredentials: true };
      const response = await axios.get<UserInfoProps>(url, config);
      dispatch(getUserInfo(response.data));
    } catch (err) {
      console.log(err);
    }
  };

  // ?????? ????????? ??? ?????? ??????????????? ???????????? ???????????? ?????? ??????
  useEffect(() => {
    window.scrollTo(0, 0);
    if (isLogin) {
      fetchUserInfo();
    }
    getProjects();
  }, [id]);

  // ???????????? ????????? ?????? ????????? ?????? ???????????? ?????? ??????
  useEffect(() => {
    if (project.id) getSponsors();
  }, [project]);

  //???????????? ???????????? ?????? ???????????? ???????????? setState????????? ??????
  useEffect(() => {
    // ??????????????? ????????? ????????? ????????????????????? ????????? ??????
    sponsors.map((el: any) => {
      if (el.user_id === id) {
        setIsUserSponsor(true);
      }
    });
  }, [sponsors]);

  return (
    <ProjectContainer>
      {isLogin ? (
        <>
          {status === 'draft' && (
            <IntroNotYet setIsUserSponsor={setIsUserSponsor} />
          )}
          {status === 'submitted' && (
            <IntroNotYet setIsUserSponsor={setIsUserSponsor} />
          )}
          {status === 'inprogress' &&
            (isUserSponsor ? (
              <IntroAlready />
            ) : (
              <IntroNotYet setIsUserSponsor={setIsUserSponsor} />
            ))}
        </>
      ) : (
        <>
          {status === 'inprogress' && (
            <IntroNotYet setIsUserSponsor={setIsUserSponsor} />
          )}
        </>
      )}
      {status === 'approved' && (
        <IntroNotYet setIsUserSponsor={setIsUserSponsor} />
      )}
      {status === 'achieved' && <IntroFinished />}
      <TabButton project={project} />
      {detailTab.overview && (
        <>
          <ProjectContent project={project} />
          {teams && (
            <Profile teams={teams} teamMember={teamMember} author={author} />
          )}
          <Comments project={project} setProject={setProject} />
          <Sponsors sponsors={sponsors} count={count} />
          <GoTopButton href="#">
            <img src={TopButton} alt="Top-button" />
          </GoTopButton>
        </>
      )}
      {detailTab.labnote && (
        <Section>
          <Wrapper>?????? ??? ????????? ?????? ??????????????????.</Wrapper>
        </Section>
      )}
    </ProjectContainer>
  );
};

export default DetailedProject;
