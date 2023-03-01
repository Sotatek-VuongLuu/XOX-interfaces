import * as React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="white" fillOpacity="0.1" />
      <path
        d="M16.8391 7.36318C16.8391 7.36318 17.9183 6.94235 17.828 7.96429C17.7983 8.38513 17.5285 9.85818 17.3185 11.4512L16.5991 16.1707C16.5991 16.1707 16.5391 16.8621 15.9994 16.9823C15.4599 17.1023 14.6505 16.5615 14.5005 16.4412C14.3805 16.351 12.2521 14.9982 11.5027 14.3371C11.2927 14.1565 11.0527 13.796 11.5327 13.3751L14.6802 10.369C15.0399 10.0085 15.3996 9.16679 13.9008 10.1887L9.70353 13.0443C9.70353 13.0443 9.22381 13.3451 8.32464 13.0746L6.37575 12.4732C6.37575 12.4732 5.65631 12.0223 6.88547 11.5715C9.88353 10.1587 13.571 8.71596 16.8385 7.36318H16.8391Z"
        fill="url(#paint0_linear_11079_25578)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_11079_25578"
          x1="5.2424"
          y1="7.27734"
          x2="20.4048"
          y2="8.97041"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B809B5" />
          <stop offset="0.510417" stopColor="#ED1C51" />
          <stop offset="1" stopColor="#FFB000" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Icon;
