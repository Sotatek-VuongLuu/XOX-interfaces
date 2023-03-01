import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="white" fillOpacity="0.1" />
      <g clipPath="url(#clip0_11079_25588)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.3696 5.86621C14.5697 7.60691 15.5303 8.6447 17.2003 8.7551V10.7129C16.2325 10.8086 15.3847 10.4884 14.3987 9.8849V13.5466C14.3987 18.1983 9.38503 19.6519 7.36937 16.3177C6.0741 14.1722 6.86727 10.4075 11.0223 10.2566V12.3211C10.7058 12.3727 10.3674 12.4536 10.0581 12.5603C9.13399 12.8768 8.61006 13.4693 8.75559 14.5145C9.03575 16.5165 12.6669 17.109 12.3649 13.197V5.86989H14.3696V5.86621Z"
          fill="url(#paint0_linear_11079_25588)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_11079_25588"
          x1="5.97653"
          y1="5.86621"
          x2="19.5764"
          y2="6.93912"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B809B5" />
          <stop offset="0.510417" stopColor="#ED1C51" />
          <stop offset="1" stopColor="#FFB000" />
        </linearGradient>
        <clipPath id="clip0_11079_25588">
          <rect width="13.3333" height="13.3333" fill="white" transform="translate(5.3335 5.33301)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Icon;
