/* eslint-disable react/no-unknown-property */
import React from 'react'
import { SvgProps } from '@pancakeswap/uikit/src/components/Svg/types'

const GoerliIcon: React.FC<React.PropsWithChildren<SvgProps>> = () => {
  return (
    <svg width="23" height="36" viewBox="0 0 23 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
      <path
        d="M11.0496 -0.00488281L10.8096 0.815345V24.622L11.0496 24.862L22.0996 18.3302L11.0496 -0.00488281Z"
        fill="white"
      />
      <path d="M11.05 -0.00488281L0 18.3302L11.05 24.862V-0.00488281Z" fill="white" />
      <path
        d="M11.0502 26.9525L10.9102 27.1225V35.6049L11.0502 36.005L22.1002 20.4307L11.0502 26.9625V26.9525Z"
        fill="white"
      />
      <path d="M11.05 35.9952V26.9527L0 20.4209L11.05 35.9952Z" fill="white" />
      <path d="M11.0498 24.8618L22.0998 18.33L11.0498 13.3086V24.8618Z" fill="white" />
      <path d="M0 18.33L11.05 24.8618V13.3086L0 18.33Z" fill="white" />
    </svg>
  )
}

export default GoerliIcon
