import { useMemo } from 'react';

// 날짜 별로 messages 그룹화
const useGroupedMessages = (messages) => {
  const groupedMessages = useMemo(() => {
    const groups = messages.reduce((acc, message) => {
      const date = message.createdAt.split('T')[0];
      acc[date] = acc[date] || [];
      acc[date].push(message);
      return acc;
    }, {});
    return groups;
  }, [messages]); // 메시지 배열이 변경될 때만 재계산

  return groupedMessages;
};

export default useGroupedMessages;
