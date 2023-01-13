import { createGlobalStyle } from 'styled-components'
import { PancakeTheme } from '@pancakeswap/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Inter', sans-serif !important;
  }

  .grid_welcome_container {
    @media screen and (min-width: 901) {
      margin-left: 0px !important;
    }
  }


  body {
    background-color: black;

    overflow-x: hidden;

    img {
      height: auto;
      max-width: 100%;
    }
  }

  #computer_xox {
    position: absolute;
    right: -50%;
    transform: translateX(-30%);

    @media screen and (max-width: 900px) {
      right: 0;
    }
  }

  #mobile_xox {
    position: absolute;
    right: -50%;
    transform: translateX(-40%); 

    @media screen and (max-width: 900px) {
      right: -50%;
      top: 60%;
      transform: translate(-45%, -34%); 
    }  
  }

  .welcome {
    @media screen and (max-width: 900px) {
      align-items: unset !important;
    }
  }

  #asset_3d {
    margin-left: 69px;
  }

  #asset_3d_mb {
    @media screen and (max-width: 900px) {
      position: absolute;
      left: 50%;
      transform: translateX(-39%);
    }
  }

`

export default GlobalStyle
