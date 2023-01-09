import { useAllTokens } from 'hooks/Tokens'
import InfoNav from "../Info/components/InfoNav"

export default function StableCoin() {
  const allTokens = useAllTokens()
  return(
    <InfoNav allTokens={allTokens} />
    
  )
}