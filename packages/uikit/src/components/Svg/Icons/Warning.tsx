import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M11.0001 5.94949L17.9026 17.8753H4.09758L11.0001 5.94949ZM11.0001 2.29199L0.916748 19.7087H21.0834L11.0001 2.29199Z"
        fill="#FFBD3C"
      />
      <path d="M11.9167 15.1253H10.0834V16.9587H11.9167V15.1253Z" fill="#FFBD3C" />
      <path d="M11.9167 9.62533H10.0834V14.2087H11.9167V9.62533Z" fill="#FFBD3C" />
    </svg>
  );
};

export default Icon;
