import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z"
        fill="white"
        fillOpacity="0.1"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.0009 7.87427C17.5517 8.02541 17.9854 8.47072 18.1326 9.03622C18.4001 10.0611 18.4001 12.1996 18.4001 12.1996C18.4001 12.1996 18.4001 14.338 18.1326 15.363C17.9854 15.9285 17.5517 16.3738 17.0009 16.525C16.0028 16.7996 12.0001 16.7996 12.0001 16.7996C12.0001 16.7996 7.99741 16.7996 6.99923 16.525C6.44846 16.3738 6.01472 15.9285 5.86752 15.363C5.6001 14.338 5.6001 12.1996 5.6001 12.1996C5.6001 12.1996 5.6001 10.0611 5.86752 9.03622C6.01472 8.47072 6.44846 8.02541 6.99923 7.87427C7.99741 7.59961 12.0001 7.59961 12.0001 7.59961C12.0001 7.59961 16.0028 7.59961 17.0009 7.87427ZM10.8001 10.3996V14.3996L14.0001 12.3996L10.8001 10.3996Z"
        fill="url(#paint0_linear_11079_25585)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_11079_25585"
          x1="4.58624"
          y1="7.59961"
          x2="21.1511"
          y2="9.74413"
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
