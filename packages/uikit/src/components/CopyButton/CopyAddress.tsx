import styled from "styled-components";
import { CopyButton } from "./CopyButton";
import { Box, Flex, FlexProps } from "../Box";

interface CopyAddressProps extends FlexProps {
  account: string;
  tooltipMessage: string;
  referralCode?: boolean;
}

const Wrapper = styled(Flex)`
  position: relative;
`;

const Address = styled.div`
  position: relative;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  display: block;
  padding: 0;

  & > input {
    background: transparent;
    border: 0;
    width: 90px;
    display: none;

    &:focus {
      outline: 0;
    }
  }

  &:after {
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.colors.background}00,
      ${({ theme }) => theme.colors.background}E6
    );
    content: "";
    height: 100%;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
  }
`;

export const CopyAddress: React.FC<React.PropsWithChildren<CopyAddressProps>> = ({
  account,
  tooltipMessage,
  referralCode = false,
  ...props
}) => {
  return (
    <Box position="relative" {...props}>
      <Wrapper>
        {account && (
          <Address title={account} style={{ color: referralCode ? "rgba(255, 255, 255, 0.87)" : "#3d8aff" }}>
            {referralCode
              ? `Referral Code: ${account}`
              : `${account.substring(0, 8)}...${account.substring(account.length - 4)}`}
            <input type="text" readOnly value={account} />
          </Address>
        )}
        <Flex ml="10px">
          <CopyButton
            width="24px"
            text={account}
            tooltipMessage={tooltipMessage}
            button={
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path
                  d="M14.3432 12.2183V2.65576H4.78027"
                  stroke="#8E8E8E"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.2182 4.78101H2.65527V14.3435H12.2182V4.78101Z"
                  stroke="#8E8E8E"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </Flex>
      </Wrapper>
    </Box>
  );
};
