import {
  MobileNavWrap,
  MobileNavBar,
  NavbarR,
  NavbarL,
  NavButton,
  MobileNavIcon,
  Menubox,
  MenuboxOverlay,
  SearchBoxWrap
} from './styled';
import Search from 'images/icons/search-icon.png';
import Menubar from 'images/icons/menubar.png';
import Cancelbar from 'images/icons/cancelIcon.png';
import BellIcon from 'images/icons/bell-icon.png';
import UserIcon from 'images/icons/user-icon.png';
import Logo from 'images/logo-color.png';
import XIcon from 'images/icons/search-x-icon.png';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showLoginModal, showSignupModal } from 'store/modal-slice';
import { searchContent } from '../../store/headerSearch-slice';
import { RootState } from 'index';

interface showProps {
  showMenuBox: () => void;
  showNoticeMenuBox: () => void;
}

const MobileNav = ({ showMenuBox, showNoticeMenuBox }: showProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [search, setSearch] = useState<string>('');
  const [searchHeader, setSearchHeader] = useState<boolean>(false);
  const [clickedMenu, setClickedMenu] = useState<boolean>(false);

  const loggedIn = useSelector((state: RootState) => state.login);
  const { isLogin } = loggedIn;

  const menubarHandler = () => {
    setClickedMenu(!clickedMenu);
  };

  //검색어 인풋값을 받아오는 함수
  const searchHandle = (e: any) => {
    setSearch(e.target.value);
  };

  //검색어 버튼 클릭시 입력창을 불러오는 함수
  const searchBtnClick = () => {
    setSearchHeader(!searchHeader);
  };

  //검색된 입력어로 보드 페이지로 이동하여 검색을 실행하는 함수
  const moveBoardPageFn = (e: any) => {
    if (e.key === 'Enter' || e.target.localName === 'span') {
      dispatch(searchContent(search));
      history.push({ pathname: '/board', state: { search } });
      setSearchHeader(false);
      setSearch('');
    }
  };

  return (
    <>
      {clickedMenu && (
        <>
          <MenuboxOverlay onClick={menubarHandler} />
          <Menubox>
            <img src={Logo} alt="logo-image" />
            <NavbarL>
              <Link to="/board">
                <span>모든 프로젝트</span>
              </Link>
              <Link to="/start">
                <span>프로젝트 시작하기</span>
              </Link>
              <Link to="/about">
                <span>서비스 소개</span>
              </Link>
            </NavbarL>
          </Menubox>
        </>
      )}
      <MobileNavWrap>
        <MobileNavBar searchHeader={searchHeader}>
          <div>
            {isLogin ? (
              <>
                <MobileNavIcon>
                  {!clickedMenu ? (
                    <button className="menu" onClick={menubarHandler}>
                      <img src={Menubar} alt="menu-bar" />
                    </button>
                  ) : (
                    <button className="cancel">
                      <img
                        src={Cancelbar}
                        alt="menu-bar"
                        onClick={menubarHandler}
                      />
                    </button>
                  )}
                </MobileNavIcon>
                <NavbarR>
                  <button>
                    <img
                      src={UserIcon}
                      alt="search-icon"
                      className="userIcon"
                      onClick={showMenuBox}
                    />
                  </button>
                  <button>
                    <img
                      src={BellIcon}
                      alt="notification-icon"
                      className="noticeIcon"
                      onClick={showNoticeMenuBox}
                    />
                  </button>
                  <button>
                    <img
                      src={Search}
                      alt="search-icon"
                      onClick={searchBtnClick}
                    />
                  </button>
                </NavbarR>
              </>
            ) : (
              <>
                <MobileNavIcon>
                  {!clickedMenu ? (
                    <button className="menu" onClick={menubarHandler}>
                      <img src={Menubar} alt="menu-bar" />
                    </button>
                  ) : (
                    <button className="cancel">
                      <img
                        src={Cancelbar}
                        alt="menu-bar"
                        onClick={menubarHandler}
                      />
                    </button>
                  )}
                </MobileNavIcon>
                <NavbarR>
                  <NavButton onClick={() => dispatch(showLoginModal(true))}>
                    로그인
                  </NavButton>
                  <NavButton onClick={() => dispatch(showSignupModal(true))}>
                    회원가입
                  </NavButton>
                  <button>
                    <img
                      src={Search}
                      alt="search-icon"
                      onClick={searchBtnClick}
                    />
                  </button>
                </NavbarR>
              </>
            )}
          </div>
        </MobileNavBar>
        <SearchBoxWrap searchHeader={searchHeader}>
          <label>
            <input
              value={search}
              placeholder="검색어를 입력하세요."
              onChange={(e) => searchHandle(e)}
              onKeyPress={(e) => moveBoardPageFn(e)}
            />
            <span onClick={(e) => moveBoardPageFn(e)}>검색</span>
          </label>
          <img src={XIcon} alt="search-icon" onClick={searchBtnClick} />
        </SearchBoxWrap>
      </MobileNavWrap>
    </>
  );
};

export default MobileNav;
