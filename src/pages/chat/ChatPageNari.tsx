import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import MessageInput from '../../components/chat/MessageInput';
import Messages from '../../components/chat/Messages';
import useGroupedMessages from '../../hooks/useGroupedMessages';
import { Client } from '@stomp/stompjs';
import { instance } from '../../api/instance';
import { useSendMessage } from '../../hooks/useSendMessage';
import { saveMessagesToLocal } from '../../hooks/useSaveMessagesToLocal';
import {
  useFetchMessagesFromLocal,
  useFetchMessagesFromServer,
} from '../../hooks/useFetchMessages';
import { SyncLoader } from 'react-spinners';

interface Profile {
  profileId: string;
  userType: string;
  nickname: string;
  profile: string;
}

interface ProfileIds {
  memberProfile: Profile;
  opponentProfile: Profile;
}

interface Message {
  senderId: string;
  body: string;
  unreadCount: number;
  // 추가적인 필드들
}

const ChatPageNari = () => {
  const navigate = useNavigate();
  const { chatRoomId: roomId = '' } = useParams<{ chatRoomId: string }>();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draftMessage, setDraftMessage] = useState('');
  const groupedMessages = useGroupedMessages(messages);
  const [isMembersFetched, setIsMembersFetched] = useState(false);
  const [profile, setProfile] = useState<ProfileIds>({
    memberProfile: {
      profileId: '',
      userType: '',
      nickname: '',
      profile: '',
    },
    opponentProfile: {
      profileId: '',
      userType: '',
      nickname: '',
      profile: '',
    },
  });

  //수정사항! react-query로 바꾸기
  const [isLoading, setIsLoading] = useState(true);

  const fetchLocalMessages = useFetchMessagesFromLocal(roomId);
  const fetchServerMessages = useFetchMessagesFromServer(roomId);
  // const fetchServerUnreadMessages = useFetchUnreadMessagesFromServer(roomId);

  // 메시지 전송
  const { sendTextMessage } = useSendMessage(
    draftMessage,
    setDraftMessage,
    client,
    roomId,
    profile.memberProfile.profileId,
    profile.opponentProfile.profileId
  );
  const sendMessage = async () => {
    if (!draftMessage.trim()) return;

    try {
      // STOMP로 메시지 전송
      await sendTextMessage();
    } catch (error) {
      console.error('메시지 전송 오류:', error);
    }
  };

  // input 값
  const handleChangeMessage = (e) => {
    setDraftMessage(e.target.value);
  };

  useEffect(() => {
    // 멤버 ID값 가져오기
    const fetchProfileIds = async () => {
      try {
        const response = await instance.get(`/chat/member/${roomId}`);
        const { memberProfile, opponentProfile } = response.data;
        setProfile({ memberProfile, opponentProfile });
        setIsMembersFetched(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfileIds();
  }, [roomId]);

  // STOMP
  const subscritionCallback = (message) => {
    const parsedMessage = JSON.parse(message.body);
    // 디코딩
    const binaryMessage = new Uint8Array(
      Object.values(parsedMessage.chatMessage)
    );
    const decodedMessage = new TextDecoder().decode(binaryMessage);
    // 디코딩된 메시지를 다시 parsedMessage에 반영
    parsedMessage.chatMessage = decodedMessage;

    // messages 새로 set
    setMessages((prevMessages) => {
      const oldMessages = [...prevMessages];
      // 가장 최근 메시지가 상대방이 보낸 메시지인 경우 이전 메시지들은 모두 읽음 처리
      if (parsedMessage.senderId !== oldMessages.at(-1)?.senderId) {
        for (let i = 0; i < oldMessages.length; i++) {
          oldMessages[i].unreadCount = 0;
        }
      }
      return [...oldMessages, parsedMessage];
    });
  };
  useEffect(() => {
    if (isMembersFetched) {
      // STOMP 클라이언트 생성
      const newClient = new Client({
        brokerURL: 'wss://api.seninanum.shop/meet',
        connectHeaders: {
          chatRoomId: roomId,
          memberId: profile.memberProfile.profileId,
        },
        debug: function (str) {
          console.log(str);
        },
        onConnect: (frame) => {
          setIsLoading(false);
          console.log('Connected: ' + frame);
          newClient.subscribe(`/topic/chat/${roomId}`, subscritionCallback);
        },
        onStompError: (error) => {
          console.log(error);
        },
        reconnectDelay: 50,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      newClient.activate();
      setClient(newClient);

      //이전 메세지 목록 불러오기
      fetchLocalMessages(setMessages);
      const staleMessages = fetchLocalMessages(setMessages);
      if (staleMessages.length === 0) fetchServerMessages(setMessages);
      // else fetchServerUnreadMessages(messages, setMessages);

      // 컴포넌트 언마운트 시 연결 해제
      return () => {
        newClient.deactivate();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMembersFetched, roomId, profile.memberProfile.profileId]);

  // 메세지 전송 시
  useEffect(() => {
    // const lastMessage = messages.at(-1);
    if (messages.length > 0) saveMessagesToLocal(roomId, messages);
  }, [messages, roomId]);

  return (
    <Wrapper>
      <Container>
        <WrapHeader>
          <BackButton onClick={() => navigate('/chat')}>
            <img src={'/assets/common/back-icon.svg'} alt="뒤로가기" />
          </BackButton>
          <TitleText>{profile.opponentProfile.nickname} 동백</TitleText>
        </WrapHeader>
        <Split />
        {isLoading ? (
          <WrapLoader>
            <SyncLoader color="var(--Primary-nari)" />
          </WrapLoader>
        ) : (
          <>
            <WrapChat>
              <Messages
                groupedMessages={groupedMessages}
                myId={profile.memberProfile.profileId}
                opponent={profile.opponentProfile}
                isMenuOpen={isMenuOpen}
              />
            </WrapChat>
            <MessageInputWrapper>
              <MessageInput
                value={draftMessage}
                onChangeHandler={handleChangeMessage}
                submitHandler={sendMessage}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
              />
            </MessageInputWrapper>
          </>
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  touch-action: none;
  overflow: hidden;
`;

const WrapHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1.8rem 1.1rem 1.1rem 1.1rem;

  position: relative;
  background: #ffffff;
  display: flex;
  z-index: 11;
`;

const Split = styled.div`
  border-top: solid 1px #ebeceb;
  /* padding: 0.7rem 0; */
`;

const BackButton = styled.div`
  img {
    width: 0.8rem;
  }
`;

const TitleText = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  font-family: 'NanumSquare';
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: -0.075rem;
  white-space: nowrap;

  overflow: hidden;
  color: var(--Base-Black, #000);
  text-overflow: ellipsis;
  font-style: normal;
  line-height: normal;
`;

const WrapChat = styled.div`
  flex: 1;
  overflow-y: auto;
  .date {
    text-align: center;
    font-family: NanumSquare;
    font-size: 1.125rem;
    font-weight: 400;
    padding: 1.5rem 0 0 0;
  }
`;

const WrapLoader = styled.div`
  padding: 0 1.1rem;
  display: flex;
  gap: 2.5rem;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  height: 100dvh;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: height 0.3s;
`;

const MessageInputWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 10;
`;
export default ChatPageNari;
