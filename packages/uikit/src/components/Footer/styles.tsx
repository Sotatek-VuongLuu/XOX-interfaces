import styled from "styled-components";
import { darkColors } from "../../theme/colors";
import { Box, Flex } from "../Box";
import SocialLinks from "./Components/SocialLinks";

export const StyledList = styled.ul`
  list-style: none;
`;

export const SubTitleStyle = styled.span`
  margin-bottom: 34px;
  position: relative;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.87);

  &:after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
  }
`;

export const FooterMainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 123px;
  padding: 92px 119px;
  background-color: #1d1d1d;
  position: relative;
  width: 100%;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 4px;
    left: 0px;
    top: 0px;
    background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%);
  }

  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px 20px;
    padding: 40px;

    & > div:first-child,
    & > div:last-child {
      grid-column: 1 / 2 span;
    }

    br {
      display: none;
    }
  }

  @media screen and (max-width: 560px) {
    padding: 40px 24px;
  }
`;

export const StyledListItem = styled.li`
  margin-bottom: 12px;
  text-transform: capitalize;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: rgba(255, 255, 255, 0.87);
  display: flex;
  align-items: center;

  & a {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.87);
  }

  & .iconx {
    width: 20px;
    min-width: 20px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
  }
`;

export const StyledIconMobileContainer = styled(Box)`
  margin-bottom: 24px;
`;

export const StyledToolsContainer = styled(Flex)`
  border-color: ${darkColors.cardBorder};
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-style: solid;
  padding: 24px 0;
  margin-bottom: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    border-top-width: 0;
    border-bottom-width: 0;
    padding: 0 0;
    margin-bottom: 0;
  }
`;

export const StyledSocialLinks = styled(SocialLinks)``;

export const StyledText = styled.span`
  color: ${darkColors.text};
`;

export const StyleStaticPage = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;

  & li {
    padding: 0 4px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.87);
  }

  & li:nth-child(even) {
    font-family: "Manrope";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    font-feature-settings: "liga" off;
    color: #444444;
  }
`;

export const ImagBGFooter = styled.img`
  position: absolute;
  right: 0;
  top: 40px;
  z-index: 1;
`;

export const ImagBGFooterTow = styled.img`
  position: absolute;
  right: 0;
  bottom: 130px;
  z-index: 1;
`;
