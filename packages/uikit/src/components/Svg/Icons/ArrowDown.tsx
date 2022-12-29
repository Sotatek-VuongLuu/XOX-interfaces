import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
      <svg {...props} width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15.5" cy="15" r="15" fill="#303030" />
        <path d="M15.5039 20.9498V9" stroke="#8E8E8E" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M21.5 15L15.5 21L9.5 15"
          stroke="#8E8E8E"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
  );
};

export default Icon;
