import React from "react";
import styled from "styled-components";
import { isMobile } from "react-device-detect";

const Wrapper = styled.div`
  margin: 20px 0 24px;
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSubTitle};
`;

const Input = styled.input`
  width: 100%;
  background: transparent;
  padding: 8px 0px;
  outline: none;
  border: none;
  font-size: ${isMobile ? "11px" : "16px"};
  color: ${({ theme }) => theme.colors.textSubTitle};
  box-shadow: none;
  :focus{
    outline: none;
    border: none;
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 14px;
`;

type Props = {
  address: any;
  handleAddressTo: any;
  messageAddress: any;
};

const AddressInput: React.FC<Props> = ({
  address,
  handleAddressTo,
  messageAddress,
}) => {
  return (
    <Wrapper>
      <Text>To Address</Text>
      <Input
        value={address}
        onChange={(e) => handleAddressTo(e.target.value)}
        messageAddress={messageAddress}
      />
      <ErrorMessage>{messageAddress}</ErrorMessage>
    </Wrapper>
  );
};

export default AddressInput;
