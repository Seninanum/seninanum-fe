import ResetStyle from './styles/ResetStyle';
import GlobalStyle from './styles/GlobalStyle';
import { Route, Routes } from 'react-router-dom';
import NavLayout from './layouts/NavLayout';
import ChatIndexPage from './pages/chat/ChatIndexPage';
import CommunityIndexPage from './pages/community/CommunityIndexPage';
import HomeIndexPage from './pages/home/HomeIndexPage';
import MyIndexPage from './pages/mypage/MyIndexPage';
import ChooseTypePage from './pages/signin/ChooseTypePage';
import AgreePolicyPage from './pages/signin/AgreePolicyPage';

const App: React.FC = () => {
  return (
    <>
      <ResetStyle />
      <GlobalStyle />
      <Routes>
        <Route path="/singnin" element={<ChooseTypePage />} />
        <Route path="/policy" element={<AgreePolicyPage />} />
        <Route element={<NavLayout />}>
          <Route path="/" element={<HomeIndexPage />} />
          <Route path="/chat" element={<ChatIndexPage />} />
          <Route path="/community" element={<CommunityIndexPage />} />
          <Route path="/mypage" element={<MyIndexPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
