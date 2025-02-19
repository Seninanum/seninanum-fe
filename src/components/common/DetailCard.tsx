import React from 'react';
import styled from 'styled-components';

interface DetailCardProps {
  type: string;
  title: string;
  content: string;
  nickname?: string;
  age?: string;
  method: string;
  region?: string;
  navigateTo: () => void;
  isMyProfile?: boolean;
}

const DetailCard = ({
  type,
  title,
  content,
  nickname,
  age,
  method,
  region,
  navigateTo,
  isMyProfile,
}: DetailCardProps) => {
  return (
    <InputContainer>
      {/* 클릭 가능한 메인 내용 영역 */}
      <ClickableArea onClick={navigateTo}>
        {!isMyProfile && (
          <WrapProfile>
            <ProfileInfo>
              <span>
                {nickname} {type === 'dong' ? '동백' : '나리'} | {age}
              </span>
            </ProfileInfo>
          </WrapProfile>
        )}

        <WrapTitle>{title}</WrapTitle>
        <WrapContent>{content}</WrapContent>
        <WrapTag>
          <Tag $type={type}>{method?.replace('서비스', '')}</Tag>
          {region !== '' && <Tag $type={type}>서울시 {region}</Tag>}
        </WrapTag>
      </ClickableArea>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1.25rem;
  background: #fff;
  box-shadow: 0px 2px 6.3px 1px rgba(150, 150, 150, 0.4);
`;

const ClickableArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const WrapProfile = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  p {
    font-size: 1.125rem;
  }
  strong {
    font-size: 1.375rem;
    font-weight: 700;
  }
  span {
    font-size: 1.25rem;
  }
`;

const WrapTitle = styled.div`
  font-size: 1.375rem;
  font-weight: 600;
  line-height: 1.1;
  font-family: NanumSquare;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const WrapContent = styled.p`
  font-size: 1.3rem;
  line-height: 1.4rem;
  font-family: NanumSquare;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const WrapTag = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;
interface tagType {
  $type: string;
}
const Tag = styled.div<tagType>`
  border-radius: 0.5rem;
  background: ${({ $type }) =>
    $type === 'nari' ? 'var(--Secondary-dong-2)' : 'var(--Secondary-nari-2)'};
  color: var(--Base-Deep-Gray, #414040);
  text-align: center;
  font-family: NanumSquare;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 0.25rem 0.875rem;
  justify-content: center;
  align-items: center;
`;

export default DetailCard;
