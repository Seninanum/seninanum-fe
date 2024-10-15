import React from 'react';
import styled from 'styled-components';
import BasicProfile from '../../components/mypage/BasicProfile';
import GroupMenu from '../../components/mypage/GroupMenu';
import PayMenu from '../../components/mypage/PayMenu';

interface UserState {
  nickname: string;
  gender: string;
  birthYear: string;
  profile: string;
}

interface UserStateProps {
  userState: UserState | undefined;
}

const MyIndexPageDong: React.FC<UserStateProps> = ({ userState }) => {
  return (
    <>
      <WrapProfile>
        <BasicProfile
          userType="dong"
          navigateTo={'/view/myprofile/dong'}
          userState={userState}
        />
      </WrapProfile>
      <WrapMenu>
        <PayMenu userType="dong" />
        <GroupMenu userType="dong" />
      </WrapMenu>
    </>
  );
};

const WrapProfile = styled.div`
  margin-top: 1.2rem;
  margin-bottom: 4rem;
`;
const WrapMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  margin-bottom: 2rem;
`;

export default MyIndexPageDong;
