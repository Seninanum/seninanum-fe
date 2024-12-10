import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { instance } from '../../api/instance';
import CommunityInput from '../../components/community/CommunityInput';
import PrevHeader from '../../components/header/PrevHeader';
import { useFetchUserType } from '../../hooks/useFetchUserType';
import { parseTime } from '../../utils/formatTime';
import useComment from '../../hooks/useComment';
import CommentCard from '../../components/community/CommentCard';
import TodayTopic from '../../components/community/TodayTopic';
import Dropdown from '../../components/common/DropDown';

interface adviceBoard {
  adviceBoardId: number;
  profileId: number;
  title: string;
  content: string;
  commentCount: number;
  createdAt: string;
  profile: string;
  nickname: string;
  userType: string;
  isMyPost: boolean;
}

const TopicCommunityPage = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: user } = useFetchUserType();
  // const topicBoardId = '????';
  // const [adviceBoard, setAdviceBoard] = useState<adviceBoard>();
  // const [commentContent, setCommentContent] = useState('');
  // // const [isSecret, setIsSecret] = useState(false);
  // const [replyTo, setReplyTo] = useState<number | null>(null); // 대댓글 대상 댓글 ID

  // const { comments, fetchComments, addComment, deleteComment } = useComment(
  //   'advice',
  //   topicBoardId
  // );

  // useEffect(() => {
  //   const fetchFreeBoard = async () => {
  //     const res = await instance.get(`/board/advice/${adviceBoardId}`);
  //     setAdviceBoard(res.data);
  //   };

  //   fetchFreeBoard();
  // }, [adviceBoardId]);

  // 댓글 조회
  // useEffect(() => {
  //   fetchComments();
  // }, [fetchComments]);

  // 댓글 작성
  const handleCommentSubmit = async () => {
    // if (!commentContent.trim()) return;
    // await addComment(commentContent, isSecret ? 1 : 0, replyTo);
    // setCommentContent('');
    // setIsSecret(false);
    // setReplyTo(null);
  };

  // 답글쓰기 버튼 클릭 시 입력창에 포커스
  // const handleReply = (commentId: number) => {
  //   setReplyTo(commentId);
  //   setTimeout(() => {
  //     inputRef.current?.focus();
  //   }, 0);
  // };

  // 댓글 삭제
  // const handleDeleteComment = (commentId: number) => {
  //   deleteComment(commentId);
  // };

  return (
    <>
      <PrevHeader
        title={'오늘의 주제'}
        navigateTo={'/community'}
        isLine={true}
      />

      <WrapContent>
        <TodayTopic userType={user?.userType || ''} />
      </WrapContent>
      <CommunityInput
        ref={inputRef}
        // value={commentContent}
        submitHandler={handleCommentSubmit}
        // onChangeHandler={(e) => setCommentContent(e.target.value)}
        userType={user?.userType || ''}
        secretVisible={false}
        placeholder={'자유롭게 입력해주세요'}
        isBottom={false}
      />

      <SplitLine />

      <TotalComment $userType={user?.userType || ''}>
        댓글<p>{/* {adviceBoard?.commentCount} */}</p>
      </TotalComment>
      {/* 
      {comments.map((comment, index) => (
        <React.Fragment key={index}>
          <CommentCard
            key={comment.id}
            id={comment.id}
            content={comment.content}
            createdAt={comment.createdAt}
            profile={comment.profile}
            nickname={comment.nickname}
            userType={comment.userType}
            cardType={user?.userType || ''}
            parentId={comment.parentId}
            likes={comment.likes}
            liked={comment.liked}
            isPostOwner={comment.isPostOwner}
            isMyComment={comment.isMyComment}
            replies={comment.replies}
            onReply={() => handleReply(comment.id)} // parentId설정
            onDelete={() => handleDeleteComment(comment.id)}
          />
          {index < comments.length - 1 && <Divider />}
        </React.Fragment>
      ))} */}
      <LastContent />
    </>
  );
};

const WrapContent = styled.div`
  padding: 1.3rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

const WrapWriter = styled.div`
  display: flex;

  .profile {
    width: 3rem;
    height: 3rem;
    border-radius: 3rem;

    background: gray; //임시
    object-fit: cover;
  }
`;

interface WrapInfoProp {
  $userType: string;
}

const WrapInfo = styled.div<WrapInfoProp>`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding-left: 0.6rem;

  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;

    .nickname {
      color: var(--Base-Black, #000);
      text-align: center;
      font-family: NanumSquare;
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 0.0375rem;
    }

    .time {
      color: var(--Base-Deep-Gray, #5b5b5b);
      font-family: NanumSquare;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 0.03375rem;
    }
  }

  .right {
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 0.625rem;
    background: ${({ $userType }) =>
      $userType === 'dong'
        ? 'var(--Dong-main, #FF314A)'
        : 'var(--Nari-1, #FFD111)'};

    width: 5.875rem;
    height: 2.375rem;
    flex-shrink: 0;

    .chat-button {
      color: ${({ $userType }) =>
        $userType === 'dong' ? 'white' : 'var(--Nari-Nari-Text, #464646)'};

      font-family: NanumSquare;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }
`;

const WrapText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  h1 {
    color: var(--Base-Black, #000);
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  p {
    color: #5b5b5b;
    font-family: NanumSquare;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.075rem;
  }
`;

const SplitLine = styled.div`
  background: #ebeceb;
  height: 0.8rem;
  margin: 0 0 1.3rem 0;
`;

interface TotalCommentProp {
  $userType: string;
}
const TotalComment = styled.div<TotalCommentProp>`
  font-family: NanumSquare;
  font-size: 1.375rem;
  font-weight: 700;
  padding-left: 1rem;
  display: flex;
  flex-direction: row;
  p {
    margin-left: 0.38rem;
    color: ${({ $userType }) => ($userType === 'dong' ? '#FF314A' : '#ffaa0e')};
    font-family: NanumSquare;
    font-size: 1.375rem;
    font-weight: 700;
  }
`;

const Divider = styled.div`
  border-top: 1.5px solid #ebeceb;
  width: 93%;
  height: 0rem;
  margin: auto;
  align-items: center;
`;

const LastContent = styled.div`
  display: flex;
  margin-bottom: 120px;
`;

export default TopicCommunityPage;
