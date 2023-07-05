import { StyleFixHeight, StyledAggregator, BtnLearMore, Overlay, StyledDexes } from '.'

const DexesComponent = () => {
  return (
    <>
      <StyleFixHeight>
        <StyledDexes>
          {dexes.map((item) => (
            <Overlay>
              <img
                src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/DEXesnew/${item}.svg`}
                key={item}
                alt="dex"
                loading="lazy"
                width="38px"
                height="38px"
                style={{ paddingTop: item.includes('74') ? '0' : '5px' }}
              />
            </Overlay>
          ))}
        </StyledDexes>
      </StyleFixHeight>

      <div className="btn_learn_more_ecosystem">
        <BtnLearMore href="https://docs.xoxlabs.io/xox-product-roadmap/xox-dex-v2/supported-chains-dexs-and-aggregators" />
      </div>
    </>
  )
}

const dexes = [
  '1. Uniswap',
  '2. PancakeSwap',
  '3. Curve',
  '4. DODO',
  '5. Trader Joe',
  '6. ZyberSwap',
  '7. KyberSwap',
  '8. metatdex',
  '9. Balancer',
  '10. Sushi',
  '11. Quickswap',
  '12. Level Finance',
  '13. GMX - SWAP',
  '14. WOOFi',
  '15. ShibaSwap',
  '16. Orca',
  '17. Camelot',
  '18. Velodrome',
  '19. THORSwap',
  '20. Maverick Protocol',
  '21. Wombat Exchange',
  '22. Canto Dex',
  '23. Defi Swap',
  '24. Hashflow',
  '25. BiSwap',
  '26. Thena',
  '27. Osmosis DEX',
  '28. Mummy Finance',
  '29. SUN',
  '30. SpookySwap',
  '31. ZigZag',
  '32. Katana DEX',
  '33. Pangea Swap',
  '34. Equalizer Exchange',
  '35. KlaySwap',
  '36. Raydium',
  '37. Wavelength DAO',
  '38. Ramses Exchange',
  '39. Mute.io',
  '40. Beethoven X',
  '41. Saber',
  '42. Frax Finance',
  '43. Lifinity',
  '44. Chainge Finance',
  '45. DefiChain DEX',
  '46. Integral',
  '47. Pando',
  '48. Platypus Finance',
  '49. Swappi',
  '50. WX Network',
  '51. Ref Finance',
  '52. xExchange',
  '53. Kava Swap',
  '54. OpenBook',
  '55. Helix',
  '56. Minswap',
  '57. VVS Finance',
  '58. Ferro',
  '59. Metavault',
  '60. SolidLizard',
  '61. MDEX',
  '62. Flamingo Finance',
  '63. Hermes Protocol',
  '64. Spartacus Exchange',
  '65. Pangolin',
  '66. 10KSwap',
  '67. Meshswap',
  '68. SaucerSwap',
  '69. BabyDogeSwap',
  '70. Orderly Network',
  '71. JediSwap',
  '72. Ellipsis Finance',
  '73. Bogged Finance',
  '74. 3xcalibur',
  '75. ALEX',
  '76. Equilibre',
  '77. DefiBox',
  '78. FX Swap',
  '79. Solidly',
  '80. IcecreamSwap',
  '81. Kokonut Swap',
  '82. BabySwap',
  '83. LiquidSwap',
  '84. Bancor',
  '85. Tinyman',
  '86. 0x',
  '87. WanSwap Dex',
  '88. AlienFi',
  '89. Clipper',
  '90. Megaton Finance',
  '91. Shell Protocol',
  '92. StellaSwap',
  '93.Solidly V2',
  '94. WigoSwap',
  '95. StellarX',
  '96. OPX Finance',
  '97. okx',
  '98. YokaiSwap',
  '99. NetSwap',
  '100. MojitoSwap',
  '101. iZUMI Finance',
  '102. WEMIX.FI',
  '103. DFX Finance',
  '104. Swapr',
  '105. SpiritSwap',
  '106. Nomiswap',
  '107. Dfyn Network',
  '108. LumenSwap',
  '109. Dexalot',
  '110. WingRiders',
  '111. Tomb Finance',
  '112. CherrySwap',
  '113. UltronSwap',
  '114. Swych',
  '115. Energiswap',
  '116. HeliSwap',
  '117. Pact',
  '118. Solarbeam',
  '119. OraiDEX',
  '120. Algofi',
  '121. MM Finance',
  '122. Verse',
  '123. Ubeswap',
  '124. OpenLeverage',
  '125. Ashswap',
  '126. BeamSwap',
  '127. KnightSwap Finance',
  '128. Increment Finance',
  '129. Tethys Finance',
  '130. El Dorado Exchange',
  '131. Crema Finance',
  '132. Step Exchange',
  '133. ZilSwap',
  '134. PayCash',
  '135. WagyuSwap',
  '136. Karura Swap',
  '137. Elk',
  '138. WardenSwap',
  '139. Hadouken Finance',
  '140. RadioShack',
  '141. Saddle Finance',
  '142. Yoshi Exchange',
  '143. Honeyswap',
  '144. MooniSwap',
  '145. Aldrin',
  '146. Humble Defi',
  '147. vexchange',
  '148. ClaimSwap',
  '149. Bisq',
]

export default DexesComponent
