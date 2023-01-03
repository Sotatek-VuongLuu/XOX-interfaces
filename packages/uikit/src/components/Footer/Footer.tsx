/* eslint-disable jsx-a11y/anchor-is-valid */
import { vars } from "@pancakeswap/ui/css/vars.css";
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
  StyleStaticPage,
  ImagBGFooter,
  ImagBGFooterTow,
} from "./styles";
import { Text } from "@pancakeswap/uikit";
import { LogoWithTextIcon } from "../Svg";
import { FooterProps } from "./types";

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
  return (
    <Flex
      data-theme="dark"
      p={["0", null, "0"]}
      position="relative"
      {...props}
      flexDirection="column"
      alignItems="center"
    >
      {windowSize > 900 ? (
        <ImagBGFooter src="/images/bg_footer.svg" alt="icon_bg" />
      ) : (
        <ImagBGFooterTow src="/images/xox_footer_mobile.svg" alt="icon_bg" />
      )}
      <FooterMainContent>
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
              Managed by XOX Labs. Building the economy of the Future.
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
            <SubTitleStyle>{item.label}</SubTitleStyle>
            <StyledList key={item.label}>
              {item.items?.map(({ label, href, isHighlighted = false, label2, icon }) => (
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
                      {`${label} `}
                      {label2 && (
                        <>
                          <br />
                          {label2}
                        </>
                      )}
                    </Link>
                  ) : (
                    <>
                      <StyledText>{`${label} `}</StyledText>
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
      </FooterMainContent>
      <Flex
        order={[2, null, 1]}
        flexDirection={["column", null, "row"]}
        justifyContent="space-between"
        width="100%"
        p={["24px", null, null]}
        background="rgba(255, 255, 255, 0.1)"
      >
        <Text
          fontSize="14px"
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="17px"
          color="rgba(255, 255, 255, 0.87)"
          marginBottom="20px"
        >
          © 2022 XOX. All rights reserved
        </Text>
        <StyleStaticPage>
          <li style={{ paddingLeft: "0" }}>
            <a href="#">Terms & Conditions</a>
          </li>
          <li>|</li>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
        </StyleStaticPage>
      </Flex>
    </Flex>
  );
};

export default MenuItem;
