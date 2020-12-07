import React from 'react';
import styled from '../../../utils/styles/styled';
import useSidebarImportModal, {
  useModalStatusProps,
  useModalStatusType,
} from '../../../hooks/sidebar/useImportModalStatus';
import useInputText, {
  InputTextHookType,
} from '../../../hooks/common/useInputText';
import CloseIcon from '../../Icon/CloseIcon';
import {
  ModalWrapper,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
} from './common';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.BLACK};
  opacity: 0.5;
  z-index: 20;
`;

const ModalInput = styled.textarea`
  width: 100%;
  height: 480px;
  padding: 10px;
  outline: none;
  border-left: none;
  border-right: none;
  background-color: ${(props) => props.theme.GOOGLE_GREY};
`;

interface ModalButtonProps {
  inputStatus: boolean;
}

const ModalOKButton = styled.button<ModalButtonProps>`
  position: relative;
  background-color: transparent;
  padding: 20px 0;
  color: ${(props) =>
    props.inputStatus ? props.theme.GREEN : props.theme.RED};
  width: 100%;
  border: none;
  font-weight: 600;
  font-size: 1.6rem;

  &:hover {
    color: ${(props) =>
      props.inputStatus ? props.theme.WHITE : props.theme.RED};
    background-color: ${(props) =>
      props.inputStatus ? props.theme.GREEN : props.theme.WHITE};
  }
`;

function ImportModal({
  importModalToggleHandler,
}: useModalStatusProps): React.ReactElement {
  const {
    inputStatus,
    onClickClose,
    onClickOK,
  }: useModalStatusType = useSidebarImportModal({
    importModalToggleHandler,
  });
  const { inputText, onInputChange }: InputTextHookType = useInputText();

  return (
    <>
      <Overlay onClick={onClickClose} />
      <ModalWrapper>
        <ModalHeader>
          <ModalTitle>JSON 불러오기</ModalTitle>
          <ModalCloseButton onClick={onClickClose}>
            <CloseIcon />
          </ModalCloseButton>
        </ModalHeader>
        <ModalInput
          placeholder="JSON을 입력하세요"
          value={inputText}
          onChange={onInputChange}
        />
        <ModalOKButton
          inputStatus={inputStatus}
          onClick={() => onClickOK(inputText)}
        >
          {inputStatus ? '지도 가져오기' : ' 잘못된 입력입니다'}
        </ModalOKButton>
      </ModalWrapper>
    </>
  );
}

export default ImportModal;
