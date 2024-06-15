import React from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import CommunityIndexPageDong from './CommunityIndexPageDong';
import CommunityIndexPageNari from './CommunityIndexPageNari';
import userTypeStore from '../../store/userTypeState';

const CommunityIndexPage: React.FC = () => {
  const { userType } = userTypeStore();

  return (
    <WrapContent>
      {userType === 'dong' ? (
        <CommunityIndexPageDong />
      ) : (
        <CommunityIndexPageNari />
      )}
    </WrapContent>
  );
};
const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
`;
export default CommunityIndexPage;
