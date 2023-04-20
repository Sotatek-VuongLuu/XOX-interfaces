/* eslint-disable jsx-a11y/anchor-is-valid */
import { vars } from "@pancakeswap/ui/css/vars.css";
import { Text } from "@pancakeswap/uikit";
import React from "react";
import { Box, Flex } from "../Box";
import { Link } from "../Link";
import {
  StyledList,
  StyledListItem,
  StyledSocialLinks,
  StyledText,
  FooterMainContent,
  SubTitleStyle,
  ImagBGFooter,
  ImagBGFooterTow,
  Container,
  Wrapper,
  StyledIconArrow,
} from "./styles";
import { LogoWithTextIcon } from "../Svg";
import { FooterProps } from "./types";
import { useTranslation } from "@pancakeswap/localization";

const MenuItem: React.FC<React.PropsWithChildren<FooterProps>> = ({
  items,
  isDark,
  toggleTheme,
  currentLang,
  langs,
  setLang,
  cakePriceUsd,
  buyCakeLabel,
  windowSize,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <Flex
      data-theme="dark"
      p={["0", null, "0"]}
      position="relative"
      {...props}
      flexDirection="column"
      alignItems="center"
      zIndex={0}
    >
      {windowSize > 900 ? (
        <ImagBGFooter src="/images/bg_footer.svg" alt="icon_bg" />
      ) : (
        <ImagBGFooterTow src="/images/xox_footer_mobile.svg" alt="icon_bg" />
      )}
      <FooterMainContent>
        <Container>
          <div>
            <Flex order={[2, null, 1]} flexDirection={["column", null, "column"]} mb={["0", null, "0"]}>
              <Box display={["block", null, "block"]}>
                <LogoWithTextIcon />
              </Box>
              <Text
                fontSize="14px"
                fontFamily="Inter"
                fontStyle="normal"
                fontWeight="400"
                lineHeight="24px"
                color="rgba(255, 255, 255, 0.87)"
                marginBottom="24px"
                marginTop="24px"
              >
                {t("Managed by XOX Labs.")} <br />
                {t("Building the economy of the Future.")}
              </Text>

              <Flex
                order={[2, null, 1]}
                flexDirection={["row", null, "row"]}
                alignItems="flex-start"
                mb={["0", null, "0"]}
              >
                <StyledSocialLinks order={[2]} pb={["0", null, "0"]} mb={["0", null, "0"]} />
              </Flex>
            </Flex>
          </div>

          {items?.map((item, index) => (
            <Flex
              key={item.label}
              order={[2, null, 1]}
              flexDirection={["column", null, "column"]}
              mb={["0", null, "36px"]}
            >
              <SubTitleStyle>{t(item.label)}</SubTitleStyle>
              <StyledList key={item.label}>
                {item.items?.map(({ label, href, isHighlighted = false, label2, icon, product }) => (
                  <StyledListItem key={label}>
                    {icon && <div className="iconx" dangerouslySetInnerHTML={{ __html: icon }} />}
                    {href ? (
                      <Link
                        data-theme="dark"
                        href={href}
                        target="_blank"
                        rel="noreferrer noopener"
                        color={isHighlighted ? vars.colors.warning : "text"}
                        bold={false}
                      >
                        {`${t(label)} `}
                        {label2 && (
                          <>
                            <br />
                            {label2}
                          </>
                        )}
                        {product && (
                          <StyledIconArrow>
                            <svg
                              width="10"
                              height="11"
                              viewBox="0 0 10 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M2.5 8L7.5 3" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                              <path
                                d="M3.4375 3H7.5V7.0625"
                                stroke="white"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </StyledIconArrow>
                        )}
                      </Link>
                    ) : (
                      <>
                        <StyledText>{`${t(label)} `}</StyledText>
                        {label2 && (
                          <StyledText>
                            <br />
                            {label2}
                          </StyledText>
                        )}
                      </>
                    )}
                  </StyledListItem>
                ))}
              </StyledList>
            </Flex>
          ))}
        </Container>
      </FooterMainContent>

      <Flex
        // order={[2, null, 1]}
        // flexDirection={["column", null, "row"]}
        justifyContent="center"
        width="100%"
        background="#1c1c1c"
      >
        <Wrapper>
          <Text
            fontSize="14px"
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="17px"
            color="rgba(255, 255, 255, 0.87)"
            textAlign="center"
          >
            © {new Date().getFullYear()} {t("XOX Labs. All Rights Reserved")}
          </Text>
        </Wrapper>
      </Flex>
    </Flex>
  );
};

export default MenuItem;
