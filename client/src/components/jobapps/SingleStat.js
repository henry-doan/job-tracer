import { StatDiv, StatLabel, StatNumber } from "../styles.js/mainstyles";

const SingleStat = ({ counts, label, txtcolor }) => (
  <StatDiv>
    <StatNumber statColor={txtcolor}>
      {counts}
    </StatNumber>
    <StatLabel statColor={txtcolor}>
      {label}
    </StatLabel>
  </StatDiv>
)

export default SingleStat;