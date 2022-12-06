import styled from 'styled-components'
import TeamMenber from './TeamMenber'

const Wrapper = styled.div`
  margin-bottom: 100px;
  .title {
    text-align: center;
    font-weight: 700;
    font-size: 36px;
    color: rgba(255, 255, 255, 0.87);
    margin-bottom: 16px;
  }

  .decoration {
    text-align: center;
    font-weight: 400;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 48px;
  }
`

const UpComing = () => {
  return (
    <Wrapper>
      <div className="title">Upcoming Utilities</div>
      <p className="decoration">Lorem ipsum dolor sit amet consectetur. Elit massa erat vitae non semper quis.</p>
      <TeamMenber />
    </Wrapper>
  )
}

export default UpComing
