import { Box } from '@mui/system'
import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'
import { CardMember, IMember } from './MenberPC'

const StyledMembersOne = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 15px;
  margin-bottom: 15px;
`

const ReStyledMembers = styled(StyledMembersOne)`
  display: grid;
  margin: auto;
  max-width: calc(100% - 50% - 7.5px);
  width: calc(100% - 50% - 7.5px);
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 15px;
  ${({ theme }) => theme.mediaQueries.md} {
    gap: 24px;
  }
`

function MenberMobile() {
  const { t } = useTranslation()

  const MEMBERS_ONE: Array<IMember> = [
    { avatar: `/images/company/Livan G.M.png`, name: 'Livan G.M', position: t('Chief Executive Officer') },
    { avatar: `/images/company/Zayn.png`, name: 'Zayn', position: t('Chief Marketing Officer') },
    { avatar: `/images/company/Marcos.png`, name: 'Marcos N.', position: t('Chief Legal Officer') },
    { avatar: `/images/company/Edward.png`, name: 'Edward', position: t('Lead Designer') },
    { avatar: `/images/company/Kane Nguyen.png`, name: 'Kane Nguyen', position: t('Project Manager') },
    { avatar: `/images/company/Victor Luu.png`, name: 'Victor Luu', position: t('SC Developer') },
    { avatar: `/images/company/Thomas Nguyen.png`, name: 'Thomas Nguyen', position: t('Lead FE Developer') },
    { avatar: `/images/company/Warren Vu.png`, name: 'Warren Vu', position: t('Lead BE Developer') },
    { avatar: `/images/company/Son Lee.png`, name: 'Son Lee', position: t('Operation Developer') },
    { avatar: `/images/company/Mei To.png`, name: 'Mei To', position: t('Business Analyst') },
  ]
  const MEMBERS_TWO: Array<IMember> = [
    { avatar: `/images/company/Marrie Vu.png`, name: 'Marrie Vu', position: t('Quality Control') },
  ]

  return (
    <>
      <StyledMembersOne>
        {MEMBERS_ONE.map((member, i) => (
          <CardMember member={member} key={String(i + member.name)} />
        ))}
      </StyledMembersOne>

      <Box>
        <ReStyledMembers marginBottom={['64px', null, null, null]}>
          {MEMBERS_TWO.map((member, i) => (
            <CardMember member={member} key={String(i + member.name)} />
          ))}
        </ReStyledMembers>
      </Box>
    </>
  )
}

export default MenberMobile
