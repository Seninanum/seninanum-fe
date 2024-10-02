import styled from 'styled-components';
import React from 'react';

// chilren: 버튼 텍스트
// userType: dong / nari / 비활성화
interface ButtonProps {
  children: string;
  disabled: boolean;
  readonly userType: string | null;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset'; // 추가된 타입 속성
}

const Button = ({
  children,
  disabled,
  userType,
  onClick,
  type = 'button',
}: ButtonProps) => {
  return (
    <WrapButton>
      <StyledButton
        disabled={disabled}
        $type={userType}
        onClick={onClick}
        type={type}
      >
        {children}
      </StyledButton>
    </WrapButton>
  );
};
const WrapButton = styled.div`
  width: 100%;
  height: 3.7rem;
  align-items: center;
`;

interface styleButton {
  $type: string | null;
}
const StyledButton = styled.button<styleButton>`
  width: 100%;
  height: 3.7rem;
  /* color: ${({ $type }) => ($type === null ? '#5B5B5B' : '#ffffff')}; */
  color: ${({ $type }) =>
    $type !== null ? ($type === 'dong' ? '#ffffff' : '#464646') : '#5B5B5B'};
  background-color: ${({ $type }) =>
    $type !== null
      ? $type === 'dong'
        ? `var(--Primary-dong)`
        : `var(--Primary-nari)`
      : '#EBECEB'};
  text-align: center;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  border: none;
  border-radius: 0.625rem;

  transition: background-color 0.5s ease;
  &:disabled {
    background-color: #d9d9d9;
    color: #333333;
  }
`;

export default Button;
