/* eslint-disable react/no-unknown-property */
import { SvgProps } from "@pancakeswap/uikit";
import React from "react";

const FarmingIcon: React.FC<React.PropsWithChildren<SvgProps>> = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
      <path
        d="M9.5 1.1875C4.90957 1.1875 1.1875 4.90957 1.1875 9.5C1.1875 14.0904 4.90957 17.8125 9.5 17.8125C14.0904 17.8125 17.8125 14.0904 17.8125 9.5C17.8125 4.90957 14.0904 1.1875 9.5 1.1875ZM9.5 16.4023C5.68887 16.4023 2.59766 13.3111 2.59766 9.5C2.59766 5.68887 5.68887 2.59766 9.5 2.59766C13.3111 2.59766 16.4023 5.68887 16.4023 9.5C16.4023 13.3111 13.3111 16.4023 9.5 16.4023ZM10.3851 9.06953L9.91377 8.96006V6.46816C10.6188 6.56465 11.0549 7.00625 11.1291 7.54805C11.1384 7.62227 11.2015 7.67607 11.2757 7.67607H12.1088C12.196 7.67607 12.2646 7.6 12.2572 7.51279C12.144 6.35684 11.1922 5.61465 9.92119 5.48662V4.87988C9.92119 4.79824 9.85439 4.73145 9.77275 4.73145H9.25137C9.16973 4.73145 9.10293 4.79824 9.10293 4.87988V5.49219C7.78926 5.62021 6.76133 6.3457 6.76133 7.7002C6.76133 8.95449 7.68535 9.55937 8.65576 9.79131L9.11406 9.9082V12.556C8.29395 12.4465 7.83379 12.0086 7.73916 11.4186C7.72803 11.348 7.66494 11.2961 7.59258 11.2961H6.73535C6.64814 11.2961 6.57949 11.3703 6.58691 11.4575C6.67041 12.478 7.44414 13.4169 9.09551 13.5375V14.1201C9.09551 14.2018 9.1623 14.2686 9.24395 14.2686H9.7709C9.85254 14.2686 9.91934 14.2018 9.91934 14.1183L9.91563 13.5301C11.3685 13.4021 12.4075 12.6246 12.4075 11.2293C12.4057 9.9416 11.5874 9.36641 10.3851 9.06953ZM9.11221 8.76895C9.0083 8.73926 8.92109 8.71143 8.83389 8.67617C8.20674 8.4498 7.91543 8.08428 7.91543 7.61299C7.91543 6.93945 8.42568 6.55537 9.11221 6.46816V8.76895ZM9.91377 12.5615V10.0808C9.97129 10.0975 10.0232 10.1104 10.0771 10.1216C10.9547 10.3888 11.2497 10.7599 11.2497 11.3295C11.2497 12.055 10.7042 12.491 9.91377 12.5615Z"
        fill="#8E8E8E"
      />
    </svg>
  );
};

export default FarmingIcon;
