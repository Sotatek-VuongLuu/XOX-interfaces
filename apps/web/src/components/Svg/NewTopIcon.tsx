/* eslint-disable react/no-unknown-property */
import { SvgProps } from '@pancakeswap/uikit'
import React from 'react'

const NewTopIcon: React.FC<React.PropsWithChildren<SvgProps>> = ({ width = 1066, height = 529 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1066 529"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="1066" height="529" fill="url(#pattern0)" />
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_13223_71707" transform="matrix(0.000243225 0 0 0.000466026 0 -0.0245747)" />
        </pattern>
        <image
          id="image0_13223_71707"
          width="4096"
          height="2304"
        />
      </defs>
    </svg>
  )
}

export default NewTopIcon