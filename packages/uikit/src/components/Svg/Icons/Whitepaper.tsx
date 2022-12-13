import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.0751 20.4992L8.6001 16.6992"
        stroke="#8E8E8E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.0001 20.5008V5.30078H10.9751L11.4501 9.10078L11.9251 12.9008L12.4001 16.7008L9.07507 20.5008H20.0001Z"
        stroke="#8E8E8E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9249 12.9004H15.7249"
        stroke="#8E8E8E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.4501 9.09961H15.7251"
        stroke="#8E8E8E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 1.5H10.5L10.975 5.3L11.45 9.1L11.925 12.9L12.4 16.7H8.6H1V1.5Z"
        stroke="#8E8E8E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3.8501 5.30078H7.1751" stroke="#8E8E8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.8501 9.09961H7.6501" stroke="#8E8E8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.8501 12.9004H8.1251" stroke="#8E8E8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default Icon;
