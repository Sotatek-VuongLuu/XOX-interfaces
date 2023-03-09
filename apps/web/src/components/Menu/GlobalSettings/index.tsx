import { Flex, useModal } from '@pancakeswap/uikit'
import styled from 'styled-components'
import SettingsModal from './SettingsModal'

type Props = {
  color?: string
  mr?: string
  mode?: string
}

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-right: 8px;
`

const GlobalSettings = ({ mode }: Props) => {
  const [onPresentSettingsModal] = useModal(<SettingsModal mode={mode} />)

  return (
    <Flex>
      <Button onClick={onPresentSettingsModal}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M9.1419 21.5855C7.46635 21.0867 5.9749 20.1605 4.79393 18.9334C5.2345 18.4112 5.5 17.7366 5.5 16.9999C5.5 15.3431 4.15685 13.9999 2.5 13.9999C2.39977 13.9999 2.3007 14.0048 2.203 14.0144C2.0699 13.3637 2 12.69 2 11.9999C2 10.9546 2.16039 9.94679 2.4579 8.99964C2.47191 8.99984 2.48594 8.99994 2.5 8.99994C4.15685 8.99994 5.5 7.65679 5.5 5.99994C5.5 5.52429 5.3893 5.07449 5.1923 4.67494C6.34875 3.59963 7.76025 2.79489 9.32605 2.36145C9.8222 3.33398 10.8333 3.99994 12 3.99994C13.1667 3.99994 14.1778 3.33398 14.674 2.36145C16.2398 2.79489 17.6512 3.59963 18.8077 4.67494C18.6107 5.07449 18.5 5.52429 18.5 5.99994C18.5 7.65679 19.8432 8.99994 21.5 8.99994C21.5141 8.99994 21.5281 8.99984 21.5421 8.99964C21.8396 9.94679 22 10.9546 22 11.9999C22 12.69 21.9301 13.3637 21.797 14.0144C21.6993 14.0048 21.6002 13.9999 21.5 13.9999C19.8432 13.9999 18.5 15.3431 18.5 16.9999C18.5 17.7366 18.7655 18.4112 19.2061 18.9334C18.0251 20.1605 16.5336 21.0867 14.8581 21.5855C14.4714 20.3758 13.338 19.4999 12 19.4999C10.662 19.4999 9.5286 20.3758 9.1419 21.5855Z"
            stroke="#515151"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z"
            stroke="#515151"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </Flex>
  )
}

export default GlobalSettings
