import { Price, Currency } from "@pancakeswap/swap-sdk-core";
import { AtomBox } from "@pancakeswap/ui/components/AtomBox";
import { Text, AutoRenewIcon } from "@pancakeswap/uikit";
import { useState } from "react";
import styled from "styled-components";
import { balanceMaxMiniClass } from "./SwapWidget.css";

const PerLabel = styled.div`
  color: #ffffff;
  font-size: 16px;
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
            {formattedPrice ?? "-"}
            {/* <AtomBox className={balanceMaxMiniClass} onClick={() => setShowInverted(!showInverted)}>
              <AutoRenewIcon width="14px" />
            </AtomBox> */}
            <div onClick={() => setShowInverted(!showInverted)}>
              <img src="/images/swap/circle-refresh.svg" alt="" style={{ cursor: "pointer" }} />
            </div>
          </>
        ) : (
          "-"
        )}
      </Text>
      {show && <PerLabel style={{ color: "#ffffff", marginTop: "8px" }}>{label}</PerLabel>}
    </>
  );
}
