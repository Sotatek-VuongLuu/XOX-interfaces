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
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
                <path
                  d="M14.3432 12.7188V3.15625H4.78027"
                  stroke="url(#paint0_linear_10957_45072)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.2182 5.28125H2.65527V14.8438H12.2182V5.28125Z"
                  stroke="url(#paint1_linear_10957_45072)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_10957_45072"
                    x1="4.78027"
                    y1="7.93753"
                    x2="14.3432"
                    y2="7.93753"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#EE0979" />
                    <stop offset="1" stopColor="#FF6A00" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_10957_45072"
                    x1="2.65527"
                    y1="10.0625"
                    x2="12.2182"
                    y2="10.0625"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#EE0979" />
                    <stop offset="1" stopColor="#FF6A00" />
                  </linearGradient>
                </defs>
              </svg>
            }
          />
        </Flex>
      </Wrapper>
    </Box>
  );
};
