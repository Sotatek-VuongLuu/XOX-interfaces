import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  gap: 64px;
  //   margin-top: -150px;
`

const LeftContent = styled.div``

const RightContent = styled.div``

const Title = styled.p`
  font-weight: 700;
  font-size: 36px;
  color: rgba(255, 255, 255, 0.87);
  font-weight: 400;
`

const Paragraph = styled.p`
  font-weight: 400;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.87);
  font-weight: 400;
`

const Watch = styled.div`
  width: 473px;
  height: 362px;
  background: #9072ff;
  border-radius: 24px;
`

const FeatureWatch = () => {
  return (
    <Wrapper>
      <LeftContent>
        <Watch>
          <span> </span>
        </Watch>
      </LeftContent>

      <RightContent>
        <Title>Lorem ipsum.</Title>
        <Paragraph style={{ margin: '24px 0' }}>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
          velit mollit.
        </Paragraph>
        <Paragraph>
          Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor
          do amet sint. Velit officia consequat duis enim velit mollit.
        </Paragraph>
      </RightContent>
    </Wrapper>
  )
}

export default FeatureWatch
