import axios from "axios";
import { ChainId } from '@pancakeswap/sdk'

const CancelToken = axios.CancelToken;

export let cancelBridgeTokenFee;
export const fetchBridgeTokenFee = async (
  chainId: ChainId,
  amount: string,
) => {
  try {
    console.log("comin: ", process.env.NEXT_PUBLIC_API_BRIDGE_TOKEN)
    if (cancelBridgeTokenFee) {
      cancelBridgeTokenFee();
    }
    
    return await axios.get("/swap-fee", {
      baseURL: process.env.NEXT_PUBLIC_API_BRIDGE_TOKEN,
      params: {
        chainId,
        amount,
      },
      cancelToken: new CancelToken(function executor(c) {
        cancelBridgeTokenFee = c;
      }),
    });
  } catch (e) {
    return;
  }
};
