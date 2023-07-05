import React from 'react'
import { StyledCertik } from './styled'
import { useTooltip } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'

const CertikWithTooltip = () => {
  const { t } = useTranslation()

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <span style={{ whiteSpace: 'nowrap' }}>{t('Coming Soon')}</span>,
    {
      placement: 'top',
      hideTimeout: 0,
    },
  )
  const {
    targetRef: targetRef2,
    tooltip: tooltip2,
    tooltipVisible: tooltipVisible2,
  } = useTooltip(<span style={{ whiteSpace: 'nowrap' }}>{t('Coming Soon')}</span>, {
    placement: 'top',
    hideTimeout: 0,
  })

  return (
    <StyledCertik>
      <a href="https://www.certik.com/" target="_blank">
        <img
          src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/tokenomics/Certik.svg`}
          alt=""
          draggable="false"
          loading="lazy"
        />
      </a>
      {tooltipVisible2 && tooltip2}
      <a href="https://www.zellic.io/" target="_blank" ref={targetRef2}>
        <img
          src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/tokenomics/Zellic.svg`}
          alt=""
          draggable="false"
          loading="lazy"
        />
      </a>
      {tooltipVisible && tooltip}
      <a href="https://hacken.io/" target="_blank" ref={targetRef}>
        <img
          src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/tokenomics/Hacken.svg`}
          alt=""
          draggable="false"
          loading="lazy"
        />
      </a>
    </StyledCertik>
  )
}

export default CertikWithTooltip
