/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect, useState, useCallback, createElement } from "react";
import { usePopper } from "react-popper";
import { Tooltip } from "@mui/material";
import styled from "styled-components";

import { useOnClickOutside } from "../../hooks";
import { MenuContext } from "../../widgets/Menu/context";
import { Box, Flex } from "../Box";
import { LogoutIcon } from "../Svg";
import UpIcon from "../Svg/Icons/UpIcon";
import { DropdownMenuDivider, DropdownMenuItem, StyledDropdownMenu, LinkStatus, BoxDropdown } from "./styles";
import { DropdownMenuItemType, DropdownMenuProps } from "./types";
import { useTranslation } from "@pancakeswap/localization";

const StyledBoxContainer = styled(Box)`
  :hover .hover_active {
    background: linear-gradient(95.32deg, #b809b5 -7.25%, #ed1c51 54.2%, #ffb000 113.13%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`;

const DropdownMenu: React.FC<React.PropsWithChildren<DropdownMenuProps>> = ({
  children,
  isBottomNav = false,
  showItemsOnMobile = false,
  activeItem = "",
  items = [],
  index,
  setMenuOpenByIndex,
  isDisabled,
  handleMouseEnter,
  handleMouseLeave,
  setIsHover,
  isLanding = false,
  ...props
}) => {
  const { t } = useTranslation();
  const { linkComponent } = useContext(MenuContext);
  const [isOpen, setIsOpen] = useState(false);
  const [targetRef, setTargetRef] = useState<HTMLDivElement | null>(null);
  const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>(null);
  const hasItems = items.length > 0;
  const { attributes } = usePopper(targetRef, tooltipRef, {
    strategy: isBottomNav ? "absolute" : "fixed",
    placement: isBottomNav ? "top" : "bottom-start",
    modifiers: [{ name: "offset", options: { offset: [0, isBottomNav ? 6 : 0] } }],
  });

  const isMenuShow = isOpen && ((isBottomNav && showItemsOnMobile) || !isBottomNav);

  useEffect(() => {
    const showDropdownMenu = () => {
      setIsOpen(true);
    };

    const hideDropdownMenu = (evt: MouseEvent | TouchEvent) => {
      const target = evt.target as Node;
      return target && !tooltipRef?.contains(target) && setIsOpen(false);
    };

    targetRef?.addEventListener("mouseenter", showDropdownMenu);
    targetRef?.addEventListener("mouseleave", hideDropdownMenu);

    return () => {
      targetRef?.removeEventListener("mouseenter", showDropdownMenu);
      targetRef?.removeEventListener("mouseleave", hideDropdownMenu);
    };
  }, [targetRef, tooltipRef, setIsOpen, isBottomNav]);

  useEffect(() => {
    if (setMenuOpenByIndex && index !== undefined) {
      setMenuOpenByIndex((prevValue) => ({ ...prevValue, [index]: isMenuShow }));
    }
  }, [isMenuShow, setMenuOpenByIndex, index]);

  useOnClickOutside(
    targetRef,
    useCallback(() => {
      setIsOpen(false);
    }, [setIsOpen])
  );

  return (
    <StyledBoxContainer ref={setTargetRef} {...props} style={{ position: "relative" }}>
      <BoxDropdown
        onPointerDown={() => {
          setIsOpen((s) => !s);
        }}
        isActive={isOpen}
      >
        {children}
        {items.length > 0 && <UpIcon />}
      </BoxDropdown>
      {hasItems && (
        <StyledDropdownMenu
          // style={styles.popper}
          ref={setTooltipRef}
          {...attributes.popper}
          $isBottomNav={isBottomNav}
          $isOpen={isMenuShow}
          $isLanding={isLanding}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="dropdown-menu"
        >
          {items
            .filter((item) => !item.isMobileOnly)
            .map(
              (
                {
                  type = DropdownMenuItemType.INTERNAL_LINK,
                  label,
                  href = "/",
                  status,
                  disabled,
                  icon,
                  showTooltip,
                  ...itemProps
                },
                itemItem
              ) => {
                const MenuItemContent = (
                  <>
                    {icon && createElement(icon as any)}
                    {label}
                    {status && (
                      <LinkStatus textTransform="uppercase" color={status.color} fontSize="14px">
                        {status.text}
                      </LinkStatus>
                    )}
                  </>
                );
                const isActive = href === activeItem;
                return (
                  <div key={itemItem}>
                    {type === DropdownMenuItemType.BUTTON && (
                      <DropdownMenuItem
                        $isActive={isActive}
                        disabled={disabled || isDisabled}
                        type="button"
                        {...itemProps}
                      >
                        {MenuItemContent}
                      </DropdownMenuItem>
                    )}
                    {type === DropdownMenuItemType.INTERNAL_LINK &&
                      (showTooltip ? (
                        <Tooltip title="Under Development" placement="top-start">
                          <span>
                            <DropdownMenuItem
                              $isActive={isActive}
                              disabled={disabled || isDisabled}
                              as={linkComponent}
                              href={href}
                              onClick={() => {
                                setIsOpen(false);
                              }}
                              {...itemProps}
                              className="submenu"
                            >
                              {MenuItemContent}
                            </DropdownMenuItem>
                          </span>
                        </Tooltip>
                      ) : (
                        <DropdownMenuItem
                          $isActive={isActive}
                          disabled={disabled || isDisabled}
                          as={linkComponent}
                          href={href}
                          onClick={() => {
                            setIsOpen(false);
                          }}
                          {...itemProps}
                          className="submenu"
                        >
                          {MenuItemContent}
                        </DropdownMenuItem>
                      ))}
                    {type === DropdownMenuItemType.EXTERNAL_LINK && (
                      <DropdownMenuItem
                        $isActive={isActive}
                        disabled={disabled || isDisabled}
                        as="a"
                        href={href}
                        target="_blank"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                        {...itemProps}
                      >
                        <Flex alignItems="center" justifyContent="space-between" width="100%">
                          {label}
                          <LogoutIcon color={disabled ? "textDisabled" : "textSubtle"} />
                        </Flex>
                      </DropdownMenuItem>
                    )}
                    {type === DropdownMenuItemType.DIVIDER && <DropdownMenuDivider />}
                  </div>
                );
              }
            )}
        </StyledDropdownMenu>
      )}
    </StyledBoxContainer>
  );
};

export default DropdownMenu;
