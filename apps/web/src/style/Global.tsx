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
    width: 100vw;
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
    position: absolute;
    left: 50%;
    bottom: 35px;
    transform: translateX(-25%);
  }

  #asset_3d_mb {
    @media screen and (max-width: 900px) {
      position: absolute;
      left: 50%;
      transform: translateX(-39%);
    }
  }

  #mb_3d {
    position: absolute;
    top: 0;
    right: 50%;
    transform: translate(37%, -24%);
  }

  .product_active_hover {
    background: linear-gradient(100.7deg, #6473ff 0%, #a35aff 100%) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-clip: text !important;
    text-fill-color: transparent !important;
  }

  .border-gradient-style{
    position: relative;
    &::before{
      content: "";
      position: absolute;
      top: -2px;
      right: -2px;
      bottom: -2px;
      left: -2px;
      background-image: linear-gradient(179.95deg, #6034FF 0.08%, rgba(163, 90, 255, 0) 99.95%);
      z-index: 1;
      border-radius: 10px;
    }
    >div{
      background: #242424;
      z-index: 9;
      border-radius: 10px;
      position: relative;
    }
  }
 #u_question_farming {
  div {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    max-width: max-content;
    color: rgba(255, 255, 255, 0.87);
  }
 }

 .container_bridge  {
  transform: translateY(-50%);
  position: absolute;
  top: 50%; 
  @media screen and (max-width: 851px) {
    transform: unset;
    position: relative;
    top: unset; 
    margin-top: 40px;
  }
 }
`

export default GlobalStyle
