import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12.6479" r="12" fill="white" fillOpacity="0.1" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.3691 6.51465C14.5692 8.25534 15.5298 9.29314 17.1998 9.40354V11.3614C16.232 11.457 15.3842 11.1369 14.3982 10.5333V14.1951C14.3982 18.8467 9.38455 20.3004 7.36888 16.9662C6.07361 14.8207 6.86678 11.0559 11.0218 10.905V12.9696C10.7053 13.0211 10.3669 13.1021 10.0576 13.2088C9.1335 13.5253 8.60957 14.1178 8.75511 15.1629C9.03526 17.1649 12.6664 17.7574 12.3644 13.8454V6.51833H14.3691V6.51465Z"
        fill="white"
      />
    </svg>
  );
};

export default Icon;
