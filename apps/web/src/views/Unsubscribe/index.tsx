import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const DivWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  background: whitesmoke;

  .main_container {
    display: flex;
    flex-direction: column;
  }

  img {
    margin-bottom: 20px;
  }

  p {
    font-size: 20px;
    font-weight: 600;
    color: #90dd90;
  }
`

const UnsubscribePage = () => {
  const [data, setData] = useState({ state: null, msg: '' })
  const router = useRouter()
  const { email } = router.query
  const handleUnsubscribe = async () => {
    const decodedEmail = decodeURIComponent(email.toString())
    try {
      const result = await axios.post(`${process.env.NEXT_PUBLIC_API}/unsubscribe`, { emailHash: decodedEmail })
      setData({ state: 1, msg: 'Unsubscribe successfully!' })
    } catch (error) {
      setData({
        state: 0,
        msg: 'You have unsubscribed!',
      })
    }
  }
  useEffect(() => {
    if (email) handleUnsubscribe()
  }, [email])

  return (
    <>
      {data.state === 1 && (
        <DivWrapper>
          <div className="main_container">
            <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/unsubscribe/success.png`} alt="success" />
            <p>{data.msg}</p>
          </div>
        </DivWrapper>
      )}
      {data.state === 0 && (
        <DivWrapper>
          <div className="main_container">
            <img src={`${process.env.NEXT_PUBLIC_ASSETS_URI}/images/unsubscribe/fail.png`} alt="fail" />
            <p>{data.msg}</p>
          </div>
        </DivWrapper>
      )}
    </>
  )
}

export default UnsubscribePage
