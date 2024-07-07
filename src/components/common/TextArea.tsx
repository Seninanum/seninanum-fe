import styled from 'styled-components';
import React from 'react';

//name 적용 필요 : RegisterProfileCareerAddPage
interface TextAreaProps {
  name?: string;
  inputPlaceholder: string;
  onChange: (e: any) => void;
}

const TextArea = ({ name, inputPlaceholder, onChange }: TextAreaProps) => {
  return (
    <TextAreaStyle
      name={name}
      placeholder={inputPlaceholder}
      onChange={onChange}
    ></TextAreaStyle>
  );
};

const TextAreaStyle = styled.textarea`
  width: 100%;
  height: 18.1875rem;
  display: flex;
  border: 1px solid #5b5b5b;
  border-radius: 10px;
  padding-left: 0.8rem;
  padding-top: 0.75rem;
  &::placeholder {
    color: #5b5b5b;
    font-family: NanumSquare;
    font-size: 1.3rem;
    font-weight: 400;
  }
`;

export default TextArea;
