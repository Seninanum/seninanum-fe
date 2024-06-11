import styled from 'styled-components';
import React from 'react';

interface InputProps {
  name: string;
  inputPlaceholder: string;
  onChange: (e: any) => void;
  maxLength: number;
}

const Input = ({ name, inputPlaceholder, onChange, maxLength }: InputProps) => {
  return (
    <InputBox
      name={name}
      type="text"
      placeholder={inputPlaceholder}
      onChange={onChange}
      maxLength={maxLength}
    ></InputBox>
  );
};

const InputBox = styled.input`
  width: 100%;
  height: 3rem;
  border: 1px solid #5b5b5b;
  border-radius: 10px;
  padding-left: 0.8rem;
  text &::placeholder {
    color: #5b5b5b;
  }
`;

export default Input;
