/*eslint-disable*/
import styled from 'styled-components';
import cloud from '../../images/cloud.png';

interface SectionProps {
  background: string;
}

interface QuestionSectionProps {
  deraction: string;
}

export const Section = styled.section<SectionProps>`
  padding: 60px 0;
  background-color: ${(props) =>
    props.background !== 'image' ? props.background : '#f1f3f5'};
  background-image: ${(props) =>
    props.background === 'image' && `url(${cloud})`};
  background-repeat: ${(props) => props.background === 'image' && 'none'};
  background-size: ${(props) => props.background === 'image' && 'cover'};
  @media all and (max-width: 620px) {
    padding: 40px 0;
  }
`;

export const Wrap = styled.div`
  width: 100%;
  max-width: 960px;
  padding: 0 30px;
  margin: 0 auto;
  @media all and (max-width: 620px) {
    padding: 0 15px;
  }
`;

export const BannerSection = styled.div`
  text-align: center;
  word-break: keep-all;
  & > h1 {
    font-size: 31.25px;
    color: #212529;
    font-weight: 500;
    line-height: 140%;
    margin-bottom: 20px;
  }
  & > p {
    font-size: 25px;
    color: #495057;
    line-height: 140%;
  }
  & > p > strong {
    color: #7950f2;
    font-weight: 600;
  }
  @media all and (max-width: 620px) {
    & > h1 {
      font-size: 25px;
    }
    & > p {
      font-size: 20px;
    }
  }
`;

export const QuestionSection = styled.div<QuestionSectionProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  direction: ${(props) => props.deraction === 'right' && 'rtl'};
  & div:nth-child(1) {
    width: 55%;
    padding: ${(props) => (props.deraction === 'right' ? '0 0 0 15px' : '0')};
    direction: ${(props) => props.deraction === 'right' && 'initial'};
  }
  & div:nth-child(2) {
    width: 45%;
    padding: ${(props) =>
      props.deraction === 'right' ? '0 60px 0 0' : '0 0 0 15px'};
  }
  @media all and (max-width: 620px) {
    display: block;
    & div:nth-child(1) {
      width: 100%;
      text-align: center;
      margin-bottom: 20px;
    }
    & div:nth-child(2) {
      width: 100%;
      max-width: 300px;
      padding: 0;
      margin: 0 auto;
    }
  }
`;

export const ImageWrap = styled.div`
  & > img {
    width: 100%;
  }
`;

export const SecondImageWrap = styled.div`
  & > img {
    width: 100%;
  }
`;

export const TextBoxWrap = styled.div`
  word-break: keep-all;
  & > h2 {
    font-size: 25px;
    color: #343a40;
    font-weight: 500;
    line-height: 140%;
    margin-bottom: 20px;
  }
  & > p {
    font-size: 16px;
    color: #495057;
    line-height: 160%;
  }
  @media all and (max-width: 620px) {
    & > h2 {
      font-size: 20px;
    }
  }
`;

export const StartProjectSection = styled.div`
  text-align: center;
  & > h2 {
    font-size: 25px;
    color: #f8f9fa;
    line-height: 140%;
    margin-bottom: 30px;
  }
  & > div {
    z-index: 1;
    position: relative;
    display: inline-block;
  }
  & > div > a {
    z-index: 1;
    position: relative;
    display: inline-block;
    font-size: 25px;
    color: #343a40;
    font-weight: 500;
    padding: 25px 60px;
    border-radius: 10px;
    border: 3px solid #343a40;
    background-color: #f8f9fa;
    transition: 0.2s;
  }
  & > div > span {
    z-index: -1;
    position: absolute;
    top: 10px;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    content: '';
    clear: both;
    border-radius: 10px;
    background-color: #343a40;
  }
  & div:hover a {
    transform: translateY(5px);
  }
  @media all and (max-width: 620px) {
    & h2 {
      font-size: 16px;
    }
    & > div > a {
      font-size: 20px;
      padding: 20px 30px;
    }
  }
`;
