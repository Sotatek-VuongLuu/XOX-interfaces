/* eslint-disable @typescript-eslint/no-explicit-any */
import { createElement, memo, useState } from "react";
import { Flex } from "../Box";
import isTouchDevice from "../../util/isTouchDevice";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import MenuItem from "../MenuItem/MenuItem";
import { MenuItemsProps } from "./types";
import { useMatchBreakpoints } from "../../contexts";
import LangSelector from "../LangSelector/LangSelector";
import { useTranslation, languageList } from "@pancakeswap/localization";

const MenuItems: React.FC<React.PropsWithChildren<MenuItemsProps>> = ({
  items = [],
  activeItem,
  activeSubItem,
  isLanding = false,
  ...props
}) => {
  const { currentLanguage, setLanguage, t } = useTranslation();
  const { isMobile } = useMatchBreakpoints();
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <Flex {...props}>
      {items.map(({ label, items: menuItems = [], href, icon, disabled }) => {
        const statusColor = menuItems?.find((menuItem) => menuItem.status !== undefined)?.status?.color;
        const isActive = activeItem === href;

        const linkProps = isTouchDevice() && menuItems && menuItems.length > 0 ? {} : { href };
        const Icon = icon;

        return (
          <DropdownMenu
            key={`${label}#${href}`}
            items={menuItems}
            py={1}
            activeItem={activeSubItem}
            isDisabled={disabled}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            isLanding={isLanding}
          >
            <MenuItem
              {...linkProps}
              isActive={isActive}
              statusColor={statusColor}
              isDisabled={disabled}
              isHover={isHover}
              label={label}
            >
              {label || (icon && createElement(Icon as any, { color: isActive ? "secondary" : "textSubtle" }))}
            </MenuItem>
          </DropdownMenu>
        );
      })}
      {/* <DropdownMenu
        key={currentLanguage.language}
        items={[]}
        py={1}
        activeItem={activeSubItem}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        isLanding={isLanding}
      >
        <MenuItem
          {...linkProps}
          isActive={isActive}
          statusColor={statusColor}
          isDisabled={disabled}
          isHover={isHover}
          label={label}
        >
          {label || (icon && createElement(Icon as any, { color: isActive ? "secondary" : "textSubtle" }))}
        </MenuItem>
      </DropdownMenu> */}
      {isMobile && (
        <LangSelector
          currentLang={currentLanguage.language}
          langs={languageList}
          setLang={setLanguage}
          color="textSubtle"
          hideLanguage
        />
      )}
    </Flex>
  );
};

export default memo(MenuItems);
