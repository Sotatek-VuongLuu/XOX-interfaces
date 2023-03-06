import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M14.2077 5.94825L8.16683 11.9891L4.876 8.70742L3.5835 9.99992L8.16683 14.5833L15.5002 7.24992L14.2077 5.94825ZM10.0002 0.833252C4.94016 0.833252 0.833496 4.93992 0.833496 9.99992C0.833496 15.0599 4.94016 19.1666 10.0002 19.1666C15.0602 19.1666 19.1668 15.0599 19.1668 9.99992C19.1668 4.93992 15.0602 0.833252 10.0002 0.833252ZM10.0002 17.3333C5.9485 17.3333 2.66683 14.0516 2.66683 9.99992C2.66683 5.94825 5.9485 2.66659 10.0002 2.66659C14.0518 2.66659 17.3335 5.94825 17.3335 9.99992C17.3335 14.0516 14.0518 17.3333 10.0002 17.3333Z"
        fill="white"
      />
    </Svg>
  );
};

export default Icon;
