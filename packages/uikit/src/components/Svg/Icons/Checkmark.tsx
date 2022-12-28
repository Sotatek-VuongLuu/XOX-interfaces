import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 22 22" {...props}>

<path d="M15.2082 6.9485L9.16732 12.9893L5.87648 9.70766L4.58398 11.0002L9.16732 15.5835L16.5007 8.25016L15.2082 6.9485ZM11.0007 1.8335C5.94065 1.8335 1.83398 5.94016 1.83398 11.0002C1.83398 16.0602 5.94065 20.1668 11.0007 20.1668C16.0607 20.1668 20.1673 16.0602 20.1673 11.0002C20.1673 5.94016 16.0607 1.8335 11.0007 1.8335ZM11.0007 18.3335C6.94898 18.3335 3.66732 15.0518 3.66732 11.0002C3.66732 6.9485 6.94898 3.66683 11.0007 3.66683C15.0523 3.66683 18.334 6.9485 18.334 11.0002C18.334 15.0518 15.0523 18.3335 11.0007 18.3335Z" />
    </Svg>
  );
};

export default Icon;
