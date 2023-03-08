import styled from 'styled-components'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
`

function Dashboard() {
  return (
    <Wrapper>
      <div>
        <p>$</p>
        <p>Total Curent Investment</p>
        <p>$10.000</p>
      </div>
      <div>
        <div>
          <p>5.000</p>
          <p>XOX amount bought</p>
        </div>
        <div>
          <p>5.000</p>
          <p>XOX amount bought</p>
        </div>
        <div>
          <p>5.000</p>
          <p>XOX amount bought</p>
        </div>
      </div>
      <div>
        <div>
          <p>5.000</p>
          <p>XOX amount bought</p>
        </div>
        <div>
          <p>5.000</p>
          <p>XOX amount bought</p>
        </div>
      </div>
    </Wrapper>
  )
}

export default Dashboard
