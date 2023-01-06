import styled, { DefaultTheme } from "styled-components";
import { Colors } from "../../theme";
import { Text } from "../Text";
import { StyledDropdownMenuItemProps } from "./types";

const getTextColor = ({
  $isActive,
  disabled,
  theme,
}: StyledDropdownMenuItemProps & { theme: DefaultTheme; $isActive: boolean }) => {
  if (disabled) return theme.colors.textDisabled;
  if ($isActive) return theme.colors.secondary;

  return theme.colors.textSubtle;
};

export const DropdownMenuItem = styled.button<StyledDropdownMenuItemProps & { $isActive: boolean }>`
  align-items: center;
  border: 0;
  background: transparent;
  color: ${({ theme, disabled, $isActive }) => getTextColor({ theme, disabled, $isActive })};
  cursor: pointer;
  font-weight: ${({ $isActive = false }) => ($isActive ? "600" : "400")};
  display: flex;
  font-size: 16px;
  line-height: 19px;
  height: 48px;
  outline: 0;
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "inherit")};

  &.submenu {
    color: rgba(255, 255, 255, 0.87);
  }

  svg {
    margin-right: 8px;
  }

  &:is(button) {
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.tertiary};
  }

  &:active:not(:disabled) {
    opacity: 0.85;
    transform: translateY(1px);
  }
`;

export const DropdownMenuDivider = styled.hr`
  border-color: ${({ theme }) => theme.colors.cardBorder};
  border-style: solid;
  border-width: 1px 0 0;
  margin: 4px 0;
`;

export const StyledDropdownMenu = styled.div<{ $isOpen: boolean; $isBottomNav: boolean }>`
  border-radius: 6px;
  padding-bottom: 4px;
  padding-top: 4px;
  pointer-events: auto;
  margin-bottom: 0;
  width: ${({ $isBottomNav }) => ($isBottomNav ? "100%" : "320px")};
  visibility: visible;
  z-index: 1001;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: auto;

  ${({ theme }) => theme.mediaQueries.md} {
    position: fixed;
    inset: 0px auto auto 0px;
    transform: translate(451px, 64px);
    background-color: ${({ theme }) => theme.card.background};
  }

  ${({ $isOpen }) =>
    !$isOpen &&
    `
    pointer-events: none;
    visibility: hidden;
    height: 0;
    overflow: hidden;
  `}
`;

export const LinkStatus = styled(Text)<{ color: keyof Colors }>`
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 0 8px;
  border: 2px solid;
  border-color: ${({ theme, color }) => theme.colors[color]};
  box-shadow: none;
  color: ${({ theme, color }) => theme.colors[color]};
  margin-left: 8px;
`;
