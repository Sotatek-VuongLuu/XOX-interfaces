import React from "react";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      style={{ transform: "rotate(180deg)" }}
    >
      <path
        d="M5.04199 13.75L10.542 8.25L16.042 13.75"
        stroke="#8E8E8E"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Icon;
