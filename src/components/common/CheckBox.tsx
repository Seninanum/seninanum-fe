import styled from 'styled-components';
import React from 'react';
// import empty from '../../assets/check-empty.svg';
// import filled from '../../assets/check-filled.svg';

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string | null;
}

const CheckBox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
  label,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };
  return (
    <CheckBoxContainer>
      <Checkbox checked={checked} htmlFor={id}>
        <HiddenCheckbox
          id={id}
          type="checkbox"
          onChange={handleChange}
          checked={checked}
        />
        <CheckIcon
          src={
            checked
              ? process.env.PUBLIC_URL + '/assets/signIn/check-filled.svg'
              : process.env.PUBLIC_URL + '/assets/signIn/check-empty.svg'
          }
        />
      </Checkbox>
      {label ? <Label htmlFor={id}>{label}</Label> : null}
    </CheckBoxContainer>
  );
};

const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.81rem;
`;
// checked 상태에 따라 empty/filled.svg 변경
const Checkbox = styled.label<{ checked: Boolean }>`
  display: inline-block;
  width: 30px;
  height: 30px;
  /* & > svg {
    empty}
  } */
`;
const CheckIcon = styled.img`
  width: 1.875rem;
  height: 1.875rem;
  flex-shrink: 0;
`;
const HiddenCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const Label = styled.label`
  display: inline-block;
  line-height: 16px;
  cursor: pointer;
  margin-left: 0.38rem;
  color: var(--Base-Black, #000);
  font-family: Nanum_Square;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.025rem;
`;

export default CheckBox;
