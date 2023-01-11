/* eslint-disable react/no-unknown-property */
import { SvgProps } from '@pancakeswap/uikit'
import React from 'react'

const CircleRefresh: React.FC<React.PropsWithChildren<SvgProps>> = () => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="15" fill="#303030" />
      <path
        d="M9.09581 8.99226L8.03473 7.93118C8.37604 7.60685 8.74089 7.30695 9.12646 7.03429L9.5419 7.65487L9.96123 8.28122C9.65675 8.49867 9.36761 8.73634 9.09581 8.99226ZM7.68118 8.28473L8.74226 9.34581C8.48634 9.61762 8.24867 9.90675 8.03122 10.2112L6.78429 9.37646C7.05694 8.9909 7.35684 8.62605 7.68118 8.28473ZM7.71448 10.6009C7.46689 10.7857 7.11994 10.8045 6.84857 10.6229L6.84855 10.6228C6.57721 10.4412 6.46245 10.1133 6.53894 9.81391L7.71448 10.6009ZM9.9574 7.37671L9.54195 6.75614C9.93874 6.50497 10.355 6.2816 10.7881 6.0888L11.0741 6.77863L11.3629 7.47494C11.0212 7.62898 10.6919 7.80564 10.3767 8.00307L9.9574 7.37671ZM11.536 6.5871L11.2499 5.89728C12.2635 5.50735 13.358 5.28193 14.5 5.25315V6.75371C13.5593 6.78166 12.6594 6.96684 11.8247 7.28343L11.536 6.5871ZM15 5.25314C20.1862 5.38367 24.3663 9.56384 24.4969 14.75H22.9963C22.8666 10.3923 19.3577 6.88341 15 6.75372V5.25314ZM23.0427 15.25H24.4573C24.3544 15.5413 24.0766 15.75 23.75 15.75C23.4234 15.75 23.1456 15.5413 23.0427 15.25ZM15 23.2463C15.9407 23.2183 16.8406 23.0332 17.6753 22.7166L17.964 23.4129L18.2501 24.1027C17.2365 24.4927 16.142 24.7181 15 24.7469V23.2463ZM18.7119 23.9112L18.4259 23.2214L18.1371 22.5251C18.4788 22.371 18.8081 22.1944 19.1233 21.9969L19.5426 22.6233L19.9581 23.2439C19.5613 23.495 19.145 23.7184 18.7119 23.9112ZM19.5388 21.7188C19.8433 21.5013 20.1324 21.2637 20.4042 21.0077L21.4653 22.0688C21.124 22.3931 20.7591 22.6931 20.3735 22.9657L19.9581 22.3451L19.5388 21.7188ZM21.8188 21.7153L20.7577 20.6542C21.0137 20.3824 21.2513 20.0933 21.4688 19.7888L22.7157 20.6235C22.4431 21.0091 22.1432 21.3739 21.8188 21.7153ZM22.9611 20.1861L21.7855 19.3991C22.0331 19.2143 22.38 19.1955 22.6514 19.3771L22.6514 19.3772C22.9228 19.5588 23.0376 19.8867 22.9611 20.1861ZM14.5 24.7469C9.31384 24.6163 5.13367 20.4362 5.00314 15.25H6.50372C6.63341 19.6077 10.1423 23.1166 14.5 23.2463V24.7469ZM5.75 14.25C6.07656 14.25 6.35437 14.4587 6.45733 14.75H5.04267C5.14563 14.4587 5.42344 14.25 5.75 14.25Z"
        fill="#8E8E8E"
        stroke="#8E8E8E"
        stroke-width="0.5"
      />
      <path d="M23.75 7V15" stroke="#8E8E8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.75 15V23" stroke="#8E8E8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default CircleRefresh
