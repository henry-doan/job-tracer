import * as Icon from 'react-bootstrap-icons';
import ScrollToTop from "react-scroll-to-top";
import Jobapps from "../jobapps/Jobapps";

const Dash = () => (
  <>
    <Jobapps />
    <ScrollToTop smooth component={<Icon.ArrowUpShort />} />
  </>
)

export default Dash;