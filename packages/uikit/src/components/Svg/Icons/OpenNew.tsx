import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
      <path
        d="M7.125 2.375H3.5625C2.90666 2.375 2.375 2.90666 2.375 3.5625V15.4375C2.375 16.0934 2.90666 16.625 3.5625 16.625H15.4375C16.0934 16.625 16.625 16.0934 16.625 15.4375V11.875"
        stroke="url(#paint0_linear_11079_7639)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.52235 1.5752C9.08052 1.5752 8.72235 1.93337 8.72235 2.3752C8.72235 2.81702 9.08052 3.1752 9.52235 3.1752H14.7159L6.00531 11.8858C5.69289 12.1982 5.69289 12.7048 6.00531 13.0172C6.31773 13.3296 6.82426 13.3296 7.13668 13.0172L15.8474 4.30647V9.5002C15.8474 9.94202 16.2055 10.3002 16.6474 10.3002C17.0892 10.3002 17.4474 9.94202 17.4474 9.5002V2.3752C17.4474 2.10985 17.3182 1.87468 17.1193 1.72914C17.0844 1.7036 17.0479 1.68124 17.0103 1.66205C16.9013 1.60651 16.778 1.5752 16.6474 1.5752H16.6469H9.52235Z"
        fill="url(#paint0_linear_11079_7639)"
      />
      <defs xmlns="http://www.w3.org/2000/svg">
        <linearGradient
          id="paint0_linear_10957_45145"
          x1="2.375"
          y1="9.5"
          x2="16.625"
          y2="9.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EE0979" />
          <stop offset="1" stopColor="#FF6A00" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_10957_45145"
          x1="5.771"
          y1="7.41334"
          x2="17.4474"
          y2="7.41334"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EE0979" />
          <stop offset="1" stopColor="#FF6A00" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Icon;
