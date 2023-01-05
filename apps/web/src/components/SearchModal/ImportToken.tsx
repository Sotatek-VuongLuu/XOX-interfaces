import { useState } from 'react'
import { Token, Currency, ChainId } from '@pancakeswap/sdk'
import { Button, Text, Flex, Message, Checkbox, LinkExternal, Input, Grid } from '@pancakeswap/uikit'
import { AutoColumn } from 'components/Layout/Column'
import { useAddUserToken } from 'state/user/hooks'
import { getBlockExploreLink, getBlockExploreName } from 'utils'
import { useCombinedInactiveList } from 'state/lists/hooks'
import { useTranslation } from '@pancakeswap/localization'
import { chains } from 'utils/wagmi'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { WrappedTokenInfo } from '@pancakeswap/token-lists'
import truncateHash from '@pancakeswap/utils/truncateHash'
import styled from 'styled-components'

const CheckboxWrapper = styled(Checkbox)`
  :checked {
    background: #9072ff;
  }
  :after {
    width: 75%;
    height: 30%;
  }
`

interface ImportProps {
  tokens: Token[]
  handleCurrencySelect?: (currency: Currency) => void
}

const getStandard = (chainId: ChainId) =>
  chainId !== ChainId.BSC && chainId !== ChainId.BSC_TESTNET ? 'ERC20' : 'BEP20'

function ImportToken({ tokens, handleCurrencySelect }: ImportProps) {
  const { chainId } = useActiveChainId()

  const { t } = useTranslation()

  const [confirmed, setConfirmed] = useState(false)

  const addToken = useAddUserToken()

  // use for showing import source on inactive tokens
  const inactiveTokenList = useCombinedInactiveList()

  return (
    <AutoColumn gap="16px">
      {tokens.map((token) => {
        return (
          <Input
            defaultValue={token.address}
            readOnly
            style={{
              height: '54px',
              background: '#303030',
              borderRadius: '8px',
              boxShadow: 'none',
              outline: 'none',
            }}
          />
        )
      })}

      <Message variant="warning">
        <Text fontSize="14px" fontFamily="Inter" fontStyle="normal" fontWeight="400" lineHeight="17px" color="#FFBD3C">
          {t(
            'Anyone can create a %standard% token on %network% with any name, including creating fake versions of existing tokens and tokens that claim to represent projects that do not have a token.',
            {
              standard: getStandard(chainId),
              network: chains.find((c) => c.id === chainId)?.name,
            },
          )}
          <br />
          <br />
          {t('If you purchase an arbitrary token, you may be unable to sell it back.')}
        </Text>
      </Message>

      {tokens.map((token) => {
        const list = token.chainId && inactiveTokenList?.[token.chainId]?.[token.address]?.list
        const address = token.address ? `${truncateHash(token.address)}` : null
        return (
          <Grid key={token.address} gridTemplateRows="1fr 1fr 1fr" gridGap="16px">
            {list !== undefined ? (
              <Text
                fontSize="16px"
                fontWeight="700"
                lineHeight="19px"
                color="#9072FF"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <img src="/images/coinmaketcap.png" alt="" style={{ marginRight: '8px' }} />
                {t('Via')} {list.name}
              </Text>
            ) : (
              <Text
                fontSize="16px"
                fontWeight="700"
                lineHeight="24px"
                color="#ed4b9e"
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="#ed4b9e"
                  width="20px"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: '8px' }}
                >
                  <path d="M12 7C12.55 7 13 7.45 13 8V12C13 12.55 12.55 13 12 13C11.45 13 11 12.55 11 12V8C11 7.45 11.45 7 12 7ZM11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM13 17H11V15H13V17Z" />
                </svg>
                {t('Unknown Source')}
              </Text>
            )}
            <Flex alignItems="center">
              <Text fontSize="16px" fontWeight="400" lineHeight="19px" color="rgba(255, 255, 255, 0.87)">
                {token.name}
              </Text>
              <Text fontSize="16px" fontWeight="400" lineHeight="19px" color="rgba(255, 255, 255, 0.87)">
                ({token.symbol})
              </Text>
            </Flex>
            {token.chainId && (
              <Flex justifyContent="space-between" width="100%">
                <Text fontSize="16px" fontWeight="400" lineHeight="19px" color="rgba(255, 255, 255, 0.87)">
                  {address}
                </Text>
                <LinkExternal
                  href={getBlockExploreLink(token.address, 'address', token.chainId)}
                  external
                  color="#9072FF"
                  style={{ textDecoration: 'none' }}
                >
                  {t('View on %site%', {
                    site: getBlockExploreName(token.chainId),
                  })}
                </LinkExternal>
              </Flex>
            )}
          </Grid>
        )
      })}

      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" onClick={() => setConfirmed(!confirmed)}>
          <CheckboxWrapper
            name="confirmed"
            type="checkbox"
            checked={confirmed}
            onChange={() => setConfirmed(!confirmed)}
            style={{
              width: '18px',
              height: '18px',
              border: '1px solid #444444',
              borderRadius: '2px',
              margin: 0,
              boxShadow: 'none',
            }}
          />
          <Text
            ml="8px"
            style={{ userSelect: 'none' }}
            fontSize="16px"
            fontWeight="400"
            lineHeight="19px"
            color="rgba(255, 255, 255, 0.87)"
          >
            {t('I understand')}
          </Text>
        </Flex>
        <Button
          variant="danger"
          disabled={!confirmed}
          onClick={() => {
            tokens.forEach((token) => {
              const inactiveToken = chainId && inactiveTokenList?.[token.chainId]?.[token.address]
              let tokenToAdd = token
              if (inactiveToken) {
                tokenToAdd = new WrappedTokenInfo({
                  ...token,
                  logoURI: inactiveToken.token.logoURI,
                  name: token.name || inactiveToken.token.name,
                })
              }
              addToken(tokenToAdd)
            })
            if (handleCurrencySelect) {
              handleCurrencySelect(tokens[0])
            }
          }}
          className=".token-dismiss-button"
          style={{ height: '43px' }}
        >
          {t('Import')}
        </Button>
      </Flex>
    </AutoColumn>
  )
}

export default ImportToken
