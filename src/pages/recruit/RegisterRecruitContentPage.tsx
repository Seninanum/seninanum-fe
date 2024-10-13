import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from '../../components/common/Input';
import TextArea from '../../components/common/TextArea';
import Button from '../../components/common/Button';
import InputPrice from '../../components/common/InputPrice';
import { useNavigate, useOutletContext } from 'react-router-dom';
import useRecruitState from '../../store/recruitState';
import { instance } from '../../api/instance';
import progressStore from '../../store/careerProgressState';

interface OutletContext {
  setStatus: (status: number) => void;
  recruit?: {
    recruitId: string;
    title: string;
    content: string;
    price: number;
    priceType: string;
  };
}

const RegisterRecruitContentPage = () => {
  const navigate = useNavigate();
  const { setStatus } = progressStore();
  const { recruit } = useOutletContext<OutletContext>(); // context 데이터 가져오기
  const { recruitState, setRecruitState } = useRecruitState();

  const [inputCount, setInputCount] = useState(0);
  const [selectedPriceType, setSelectedPriceType] = useState(
    recruit?.priceType || ''
  );

  const hadnleOnChagne = (e) => {
    const { name, value } = e.target;
    setRecruitState({ [name]: value });
    setInputCount(e.target.value.replace(/<br\s*V?>/gm, '\n').length);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        title: recruitState.title,
        content: recruitState.content,
        method: recruitState.method.replace('서비스', '').trim(),
        priceType: recruitState.priceType,
        price: recruitState.price,
        region: recruitState.region,
        field: recruitState.field,
      };

      if (recruit) {
        // 수정 모드: PUT 요청
        await instance.put(`/recruit/${recruit.recruitId}`, payload);
        alert('구인글이 수정되었습니다.');
        navigate(`/view/myrecruit/${recruit?.recruitId}`);
      } else {
        // 등록 모드: POST 요청
        await instance.post('/recruit', payload);
        alert('구인글이 등록되었습니다.');
        navigate(`/home`);
      }

      setStatus(1);
    } catch (error) {
      console.error('구인글 등록/수정에 실패했습니다.', error);
    }
  };

  // recruitState와 폼 동기화
  useEffect(() => {
    if (recruit) {
      setRecruitState({
        title: recruit.title,
        content: recruit.content,
        price: recruit.price,
        priceType: recruit.priceType,
      });
    } else {
      setRecruitState({
        title: ``,
        content: '',
        price: -1,
      });
    }
  }, [recruit, setRecruitState]);

  useEffect(() => {
    setRecruitState({ priceType: selectedPriceType });
  }, [setRecruitState, selectedPriceType]);

  useEffect(() => {
    setStatus(3);
  }, [setStatus]);

  return (
    <>
      <WrapContent>
        <TitleText>{`마지막으로,\n내 구인글을 소개해보세요!`}</TitleText>
        <div>
          <Input
            name="title"
            inputPlaceholder={'제목을 입력하세요.'}
            value={recruitState.title || ''}
            onChange={hadnleOnChagne}
            maxLength={39}
          />
          <MaxText>
            <span>{inputCount}</span>
            <span>/40</span>
          </MaxText>
          <TextArea
            name="content"
            inputPlaceholder={'내용을 입력하세요.'}
            value={recruitState.content || ''}
            onChange={hadnleOnChagne}
          />
        </div>
        <InputPrice
          name="price"
          onChange={hadnleOnChagne}
          value={recruitState.price || -1}
          userType={'nari'}
          selected={selectedPriceType}
          onClickMethod={setSelectedPriceType}
        />
      </WrapContent>

      <WrapButton>
        <Button
          userType={null}
          disabled={false}
          children={'이전'}
          onClick={() =>
            recruit
              ? navigate('/modify/recruit/method')
              : navigate('/register/recruit/method')
          }
        ></Button>
        <Button
          userType={'nari'}
          disabled={false}
          children={recruit ? '수정하기' : '등록하기'}
          onClick={handleSubmit}
        ></Button>
      </WrapButton>
    </>
  );
};

const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  padding: 0 1.1rem 3rem 1.1rem;
  overflow-y: auto;
  margin-bottom: 5rem;
`;

const TitleText = styled.div`
  font-size: 1.5rem;
  font-family: 'NanumSquareR';
  font-weight: 700;
  margin-top: 2rem;
`;

const MaxText = styled.span`
  margin-top: 0.6rem;
  display: flex;
  justify-content: right;
  color: #000;
  font-family: NanumSquare;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 0.6rem;
`;

const WrapButton = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  left: 0;
  right: 0;
  bottom: 0;
  gap: 1rem;
  padding: 1.1rem 1.1rem 4rem 1.1rem;
  background-color: white;
`;

export default RegisterRecruitContentPage;
