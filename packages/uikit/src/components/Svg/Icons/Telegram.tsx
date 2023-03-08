import * as React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15.5" r="14.5" stroke="url(#paint0_linear_11606_20612)" />
      <path
        d="M21.0486 9.70447C21.0486 9.70447 22.3976 9.17842 22.2847 10.4559C22.2476 10.9819 21.9104 12.8232 21.6479 14.8145L20.7486 20.7138C20.7486 20.7138 20.6736 21.5781 19.999 21.7284C19.3247 21.8784 18.3128 21.2024 18.1253 21.052C17.9753 20.9392 15.3149 19.2482 14.3781 18.4218C14.1156 18.1961 13.8156 17.7454 14.4156 17.2194L18.35 13.4618C18.7997 13.0111 19.2493 11.959 17.3757 13.2364L12.1292 16.8059C12.1292 16.8059 11.5295 17.1819 10.4056 16.8437L7.96945 16.092C7.96945 16.092 7.07014 15.5284 8.6066 14.9649C12.3542 13.1989 16.9635 11.3954 21.0479 9.70447H21.0486Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_11606_20612"
          x1="-2.37624"
          y1="0.5"
          x2="36.7596"
          y2="4.14161"
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
