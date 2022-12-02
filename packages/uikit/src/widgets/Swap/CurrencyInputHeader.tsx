import { AtomBox } from "@pancakeswap/ui";
import { ReactNode } from "react";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";

interface Props {
  title: ReactNode;
  subtitle: ReactNode;
}

export const CurrencyInputHeader = ({ title, subtitle }: Props) => {
  return (
    <AtomBox width="full" alignItems="center" flexDirection="column" padding="24px" borderBottom="1">
      <AtomBox display="flex" width="full" alignItems="center" justifyContent="space-between">
        {title}
      </AtomBox>
      {subtitle}
    </AtomBox>
  );
};

export const CurrencyInputHeaderTitle = ({ children }: { children: ReactNode }) => (
  <Text
    fontSize="24px"
    fontFamily="Inter"
    fontStyle="normal"
    fontWeight="700"
    lineHeight="29px"
    color="rgba(255, 255, 255, 0.87)"
  >
    {children}
  </Text>
);
export const CurrencyInputHeaderSubTitle = ({ children }: { children: ReactNode }) => (
  <Text
    fontSize="14px"
    fontFamily="Inter"
    fontStyle="normal"
    fontWeight="400"
    lineHeight="17px"
    color="rgba(255, 255, 255, 0.6)"
  >
    {children}
  </Text>
);
