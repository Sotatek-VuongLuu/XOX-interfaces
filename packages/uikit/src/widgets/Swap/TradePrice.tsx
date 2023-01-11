import { Price, Currency } from "@pancakeswap/swap-sdk-core";
import { Text } from "@pancakeswap/uikit";
import { useState } from "react";
import styled from "styled-components";
import CircleRefresh from "../../../../../apps/web/src/components/Svg/CircleRefresh";

const PerLabel = styled.div`
  color: #ffffff;
  font-size: 16px;
  font-weight: 400;
  margin-top: "8px";
  @media (max-width: 576px) {
    font-size: 14px;
  }
`;
const CircleBox = styled.div`
  cursor:pointer;  
`;
interface TradePriceProps {
  price?: Price<Currency, Currency>;
}

export function TradePrice({ price }: TradePriceProps) {
  const [showInverted, setShowInverted] = useState<boolean>(false);
  const formattedPrice = showInverted ? price?.toSignificant(6) : price?.invert()?.toSignificant(6);

  const show = Boolean(price?.baseCurrency && price?.quoteCurrency);
  const label = showInverted
    ? `${price?.quoteCurrency?.symbol} per ${price?.baseCurrency?.symbol}`
    : `${price?.baseCurrency?.symbol} per ${price?.quoteCurrency?.symbol}`;

  return (
    <>
      <Text style={{ justifyContent: "space-between", alignItems: "center", display: "flex", width: "100%" }}>
        {show ? (
          <>
            <span style={{ fontWeight: "700", fontSize: "18px", color: "#FFFFFF", wordBreak: "break-word" }}>
              {formattedPrice ?? "-"}
            </span>
            <CircleBox onClick={() => setShowInverted(!showInverted)}>
              <CircleRefresh />
            </CircleBox>
          </>
        ) : (
          "-"
        )}
      </Text>
      {show && <PerLabel>{label}</PerLabel>}
    </>
  );
}
