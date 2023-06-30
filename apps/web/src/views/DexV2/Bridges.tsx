import { StyleFixHeight, StyledAggregator, BtnLearMore, Overlay } from '.'

const Bridges = () => {
  return (
    <>
      <StyleFixHeight>
        <StyledAggregator name="bridges">
          {[...Array(10).keys()].map((item) => (
            <Overlay>
              <img
                src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/dex-v2/Bridgesnew/${item}.svg`}
                key={item}
                alt="dex"
                loading="lazy"
                width="38px"
                height="38px"
              />
            </Overlay>
          ))}
        </StyledAggregator>
      </StyleFixHeight>

      <div className="btn_learn_more_ecosystem">
        <BtnLearMore href="https://docs.xoxlabs.io/products-under-development/xox-dex-v2" />
      </div>
    </>
  )
}

export default Bridges
