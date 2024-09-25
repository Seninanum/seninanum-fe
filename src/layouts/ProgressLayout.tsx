import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ExitHeader from '../components/header/ExitHeader';
import ProgressBar from '../components/common/ProgressBar';
import progressStore from '../store/CareerProgressState';
import { instance } from '../api/instance';
import userTypeStore from '../store/userTypeState';
import useCareerProfileState from '../store/CareerProfileState';

const ProgressLayout: React.FC = () => {
  const { status, setStatus } = progressStore();
  const { userType, setUserType } = userTypeStore();
  const { pathname } = useLocation();
  const [previousProfileId, setPreviousProfileId] = useState<string | null>(
    null
  );
  const { careerProfileState, setCareerProfileState, calculateProgress } =
    useCareerProfileState();

  useEffect(() => {
    const getUserType = async () => {
      try {
        const response = await instance.get('/user/userType');
        setUserType(response.data);
      } catch (error) {
        console.error('ErError fetching user type:', error);
      }
    };

    getUserType();
  }, [setUserType]);

  // useEffect(() => {
  //   const fetchProfileProgress = async () => {
  //     try {
  //       const response = await instance.get(
  //         `/career/${profileId[profileId.length - 1]}`
  //       );
  //       setCareerProfileState(response.data);
  //     } catch (error) {
  //       console.error('경력프로필 조회에 실패하였습니다.');
  //     }
  //   };

  //   fetchProfileProgress();
  // }, []);
  useEffect(() => {
    const profileId = pathname.split('/').pop() ?? null;
    if (profileId !== previousProfileId) {
      const fetchProfileProgress = async () => {
        try {
          const response = await instance.get(`/career/${profileId}`);
          setCareerProfileState(response.data);
          setPreviousProfileId(profileId); // 이전 profileId를 기록하여 중복 호출 방지
        } catch (error) {
          console.error('경력 프로필 조회에 실패하였습니다.', error);
        }
      };

      fetchProfileProgress();
    }
  }, [pathname, previousProfileId, setCareerProfileState]);
  return (
    <>
      <Container>
        <ExitBtn>
          <ExitHeader
            userType={userType}
            navigateTo={'/home'}
            careerProfileState={careerProfileState}
            calculateProgress={calculateProgress}
          />
        </ExitBtn>
        <ProgressBar status={status} type={userType} />

        {userType === 'dong' ? (
          <Outlet
            context={{
              setStatus,
              careerProfileState,
              setCareerProfileState,
              calculateProgress,
            }}
          />
        ) : (
          <Outlet
            context={{
              setStatus,
            }}
          />
        )}
      </Container>
    </>
  );
};
const Container = styled.div`
  padding: 1.3rem 1.1rem;
  display: flex;
  flex-direction: column;
`;

const ExitBtn = styled.div`
  float: right;
`;
export default ProgressLayout;
