import styled from 'styled-components';
import cloud from '../../images/cloud.png';
import question1 from '../../images/question1.png';
import question2 from '../../images/question2.png';
import question3 from '../../images/question3.png';
import bluestar from '../../images/start-blue.png';
import yellowline from '../../images/YellowLine.png';
import yellowcircle from '../../images/yellowcircle.png';

export const Container = styled.div`
  padding: 70px;
  text-align: center;
  background-image: url(${cloud});
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: 50% 60%;
  font-family: 'Noto Sans KR', sans-serif;
`;

export const Text = styled.div`
  font-size: 25px;
  color: #495057;
  line-height: 0.5;
  margin-top: 20px;
  font-weight: 600;
`;

export const Container2 = styled.div`
  padding: 70px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 15px;
  inline-height: 0.5;
  margin-left: 580px;
`;

export const Question = styled.div`
  background-image: url(${question1});
  background-size: 14%;
  background-repeat: no-repeat;
  background-position: 63% 50%;
`;

export const Text2 = styled.div`
  font-size: 11px;
  color: #495057;
  line-height: 0.5;
  margin-top: 20px;
`;

export const Bluestar1 = styled.div`
  background-image: url(${bluestar});
  background-size: 1%;
  background-position: 34% 31%;
  background-repeat: no-repeat;
`;

export const YellowLine = styled.div`
  background-image: url(${yellowline});
  background-size: 7.5%;
  background-position: 36.9% 64.5%;
  background-repeat: no-repeat;
`;

export const StartProject = styled.div`
  text-align: center;
  color: #eee;
  background-color: #7048e8;
  padding: 22px;
`;

export const Button = styled.button`
  border-radius: 10px;
  box-sizing: border-box;
  width: 12%;
  height: 58px;
  font-size: 16px;
  font-weight: 600;
  border: 3px solid #343a40;
  box-shadow: 0 5px;
`;

export const YellowCircle = styled.div`
  background-image: url(${yellowcircle});
  background-repeat: no-repeat;
  background-size: 6%;
  background-position: 58.5% 56.5%;
`;

export const Container3 = styled.div`
  padding: 70px 400px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 15px;
  inline-height: 0.5;
  margin-left: 580px;
`;

export const Question1 = styled.div`
  background-image: url(${question2});
  background-size: 14%;
  background-repeat: no-repeat;
  background-position: 40% 50%;
`;

export const Bluestar2 = styled.div`
  background-image: url(${bluestar});
  background-size: 1%;
  background-position: 51.5% 31%;
  background-repeat: no-repeat;
`;

export const Question3 = styled.div`
  background-image: url(${question3});
  background-size: 14%;
  background-repeat: no-repeat;
  background-position: 65% 50%;
`;

export const YellowLine2 = styled.div`
  background-image: url(${yellowline});
  background-size: 5%;
  background-position: 40.5% 57%;
  background-repeat: no-repeat;
`;
