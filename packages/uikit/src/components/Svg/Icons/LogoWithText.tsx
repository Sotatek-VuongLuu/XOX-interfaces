/* eslint-disable react/no-unknown-property */
import { vars } from "@pancakeswap/ui/css/vars.css";
import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Logo: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <svg width="67" height="43" viewBox="0 0 67 43" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M31.5095 24.8043L41.5528 34.8475C42.4479 35.7426 42.9511 36.9568 42.9511 38.2227V38.224C42.9511 40.8603 40.814 42.9987 38.1764 42.9987H37.8811C36.6153 42.9987 35.4011 42.4955 34.506 41.6004L24.7566 31.8511C23.8616 30.956 23.3584 29.7418 23.3584 28.476V28.1807C23.3584 25.5444 25.4955 23.406 28.1331 23.406H28.1344C29.4003 23.406 30.6145 23.9092 31.5095 24.8043Z"
        fill="url(#paint0_linear_6431_13490)"
      />
      <path
        d="M66.3573 28.1807V28.4773C66.3573 29.7431 65.8542 30.9573 64.9591 31.8537L55.2097 41.6018C54.3147 42.4968 53.1005 43 51.8346 43H51.5393C48.9031 43 46.7646 40.8629 46.7646 38.2253V38.224C46.7646 36.9581 47.2678 35.7439 48.1629 34.8475L58.2075 24.8043C59.1026 23.9092 60.3168 23.406 61.5826 23.406C64.2202 23.406 66.3573 25.5431 66.3573 28.1807Z"
        fill="url(#paint1_linear_6431_13490)"
      />
      <path
        d="M37.8811 0H38.1777C40.814 0 42.9524 2.13709 42.9524 4.7747C42.9524 6.04053 42.4492 7.25473 41.5541 8.14982L31.5109 18.1944C30.6158 19.0895 29.4016 19.5927 28.1344 19.5927H28.1331C25.4968 19.5927 23.3584 17.4556 23.3584 14.818V14.5227C23.3584 13.2569 23.8616 12.0427 24.7566 11.1476L34.5046 1.39825C35.3997 0.503159 36.6139 0 37.8811 0Z"
        fill="url(#paint2_linear_6431_13490)"
      />
      <path
        d="M66.3573 14.5226V14.8192C66.3573 17.4555 64.2202 19.5939 61.5826 19.5939C60.3168 19.5939 59.1026 19.0907 58.2075 18.1956L48.1629 8.15104C47.2678 7.25595 46.7646 6.04175 46.7646 4.77592C46.7646 2.13964 48.9017 0.0012207 51.5393 0.0012207H51.8359C53.1018 0.0012207 54.316 0.504377 55.2111 1.39947L64.9591 11.1475C65.8542 12.0412 66.3573 13.2554 66.3573 14.5226Z"
        fill="url(#paint3_linear_6431_13490)"
      />
      <path
        d="M19.5927 28.1807V28.4773C19.5927 29.7431 19.0895 30.9573 18.1944 31.8537L8.44509 41.6018C7.55 42.4968 6.33581 43 5.06997 43H4.77469C2.13842 43 0 40.8629 0 38.2253V38.224C0 36.9581 0.503157 35.7439 1.39825 34.8475L11.4429 24.8043C12.3379 23.9092 13.5521 23.406 14.818 23.406C17.4556 23.406 19.5927 25.5431 19.5927 28.1807Z"
        fill="url(#paint4_linear_6431_13490)"
      />
      <path
        d="M19.5927 14.5226V14.8192C19.5927 17.4555 17.4556 19.5939 14.818 19.5939C13.5521 19.5939 12.3379 19.0907 11.4429 18.1956L1.39825 8.15104C0.503157 7.25595 0 6.04175 0 4.77592C0 2.13964 2.13709 0.0012207 4.77469 0.0012207H5.07129C6.33713 0.0012207 7.55133 0.504377 8.44642 1.39947L18.1944 11.1475C19.0895 12.0412 19.5927 13.2554 19.5927 14.5226Z"
        fill="url(#paint5_linear_6431_13490)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_6431_13490"
          x1="23.3584"
          y1="23.406"
          x2="45.8492"
          y2="27.6538"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6473FF" />
          <stop offset="1" stopColor="#A35AFF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_6431_13490"
          x1="46.7646"
          y1="23.406"
          x2="69.2556"
          y2="27.6535"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6473FF" />
          <stop offset="1" stopColor="#A35AFF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_6431_13490"
          x1="23.3584"
          y1="0"
          x2="45.8506"
          y2="4.24836"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6473FF" />
          <stop offset="1" stopColor="#A35AFF" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_6431_13490"
          x1="46.7646"
          y1="0.0012207"
          x2="69.2555"
          y2="4.24903"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6473FF" />
          <stop offset="1" stopColor="#A35AFF" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_6431_13490"
          x1="0"
          y1="23.406"
          x2="22.4909"
          y2="27.6535"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6473FF" />
          <stop offset="1" stopColor="#A35AFF" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_6431_13490"
          x1="0"
          y1="0.0012207"
          x2="22.4908"
          y2="4.24903"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6473FF" />
          <stop offset="1" stopColor="#A35AFF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
