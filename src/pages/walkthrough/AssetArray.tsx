import React from 'react';
import styled from 'styled-components';
import {
  WALKTHROUGH_NARI,
  WALKTHROUGH_DONG,
} from '../../constants/walkThroughState';

interface AssetArrayProps {
  userType: string;
  index: number;
}

const AssetArray: React.FC<AssetArrayProps> = ({ userType, index }) => {
  return (
    <>
      <ImgaeWrap>
        {index === 2 && userType === 'dong' ? (
          <ImgaeStyleEtc
            src={`/assets/walkthrough/${userType}${index}.png`}
          ></ImgaeStyleEtc>
        ) : (
          <ImgaeStyle
            src={`/assets/walkthrough/${userType}${index}.png`}
          ></ImgaeStyle>
        )}
      </ImgaeWrap>
      {userType === 'dong' ? (
        <>
          <TitleTextStyle>{WALKTHROUGH_DONG[index - 1].title}</TitleTextStyle>
          <TextStyle>{WALKTHROUGH_DONG[index - 1].text}</TextStyle>
        </>
      ) : (
        <>
          <TitleTextStyle>{WALKTHROUGH_NARI[index - 1].title}</TitleTextStyle>
          <TextStyle>{WALKTHROUGH_NARI[index - 1].text}</TextStyle>
        </>
      )}
    </>
  );
};
const ImgaeWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15rem;
  margin: 0;
  margin-top: 20%;
`;
const ImgaeStyle = styled.img`
  justify-content: center;
  transform: scale(0.25);
  transform-origin: center;
`;
const ImgaeStyleEtc = styled.img`
  justify-content: center;
  margin-right: 3rem;
  transform: scale(0.25);
  transform-origin: center;
`;
const TitleTextStyle = styled.div`
  color: #000;
  text-align: center;
  font-family: NanumSquare;
  font-size: 22px;
  font-weight: 400;
  margin-top: 2.3rem;
`;
const TextStyle = styled.div`
  color: #4d4d4d;
  text-align: center;
  font-family: NanumSquare;
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0.54px;
  margin-top: 1.2rem;
  white-space: pre;
`;
export default AssetArray;
