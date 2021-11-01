import Select from 'react-select';
import styled, { css } from 'styled-components';
import { SubTitleCss, ProjectCoverImage } from '../commonStyled';
interface FoucsProps {
  showMemo: boolean;
}
// 프로젝트 제목
export const ProjectTitle = styled.div<FoucsProps>`
  margin-top: 40px;
  position: relative;
  > h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1.45em;
    color: #495057;
  }

  > input {
    width: 560px;
    background: #ffffff;
    border: 2px solid #e9ecef;
    border-radius: 5px;
    margin-top: 10px;
    height: 40px;
  }

  p {
    ${(props) =>
      props.showMemo
        ? css`
            display: block;
          `
        : css`
            display: none;
          `}
  }
`;

// 프로젝트 카테고리
export const ProjectCategory = styled.div`
  margin-top: 40px;

  > h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1.45em;
    color: #495057;
  }

  > p {
    font-size: 12.8px;
    font-weight: 400;
    line-height: 1.45em;
    color: ${({ theme }) => theme.colors.suppotWord};
    margin-top: 10px;
  }
`;

// 프로젝트 해시태그
export const ProjectHashTag = styled(SubTitleCss)`
  > input {
    width: 300px;
    background: #ffffff;
    border: 2px solid #e9ecef;
    border-radius: 5px;
    margin-top: 20px;
    margin-right: 15px;
    height: 40px;
  }

  ul {
    margin-top: 20px;
    display: flex;

    > li {
      font-size: 12.8px;
      font-weight: 700;
      line-height: 1.4em;
      color: #fff;
      background: ${({ theme }) => theme.colors.orange};
      padding: 5px 10px;
      margin-right: 5px;
      text-align: center;
      border-radius: 3px;

      > span:first-child {
        margin-right: 3px;
      }

      > span:last-child {
        cursor: pointer;
      }
    }
  }
`;

// 프로젝트 펀딩기간
export const ProjectFundingPeriod = styled(SubTitleCss)<FoucsProps>`
  position: relative;

  > div {
    margin-top: 10px;
    width: 160px;
  }

  > p {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.45em;
    color: #495057;
    margin-top: 10px;

    ${(props) =>
      props.showMemo
        ? css`
            display: block;
          `
        : css`
            display: none;
          `}
  }
`;

export const CustomSelect = styled(Select)`
  .Select__control {
    border: 2px solid #e9ecef;
    border-radius: 5px;
  }
  .Select__indicator-separator {
    display: none;
  }
`;

// 프로젝트 한 줄 소개
export const ProjectSimpleInfo = styled(SubTitleCss)<FoucsProps>`
  position: relative;

  > p {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.45em;
    color: #495057;
    margin-top: 10px;

    ${(props) =>
      props.showMemo
        ? css`
            display: block;
          `
        : css`
            display: none;
          `}
  }
`;

// 프로젝트 커버이미지
export const ProjectCoverIma = styled(ProjectCoverImage)``;

export const CategoryContainer = styled.div`
  > div {
    &:first-child {
      margin-top: 20px;
      label {
        margin-right: 15px;
      }
    }
    &:last-child {
      margin-top: 10px;
      label {
        margin-right: 15px;
      }
    }
  }

  input {
    display: none;
  }
  label {
    font-size: 16px;
    font-weight: 500;
    color: #495057;
    text-align: center;
  }
  input + label {
    cursor: pointer;
  }
  input + label::before {
    content: '';
    display: inline-block;
    width: 15px;
    height: 15px;
    border: 1px solid #868e96;
    vertical-align: middle;
    margin-right: 5px;
  }
  input:checked + label::before {
    content: '\f00c';
    font-family: 'Font Awesome 5 free';
    font-weight: 900;
    color: #ffffff;
    background-color: #0dbd7e;
    font-size: 13px;
    text-align: center;
  }
`;