/* eslint-disable react/no-unknown-property */
import { SvgProps } from '@pancakeswap/uikit'
import React from 'react'

const GalaxyIcon: React.FC<React.PropsWithChildren<SvgProps>> = () => {
  return (
    <svg
      width="740"
      height="200"
      viewBox="0 0 740 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect y="-12" width="745" height="224" fill="url(#pattern0)" />
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_13888_44018" transform="scale(0.000278399 0.000925926)" />
        </pattern>
        <image
          id="image0_13888_44018"
          width="3592"
          height="1080"
        />
      </defs>
    </svg>
  )
}

export default GalaxyIcon