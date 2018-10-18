import { connect } from "react-redux"
import TopDetail from "../views/TopDetail";

const mapStateToProps = (state) => ({
    clientShouldLoad: state.clientShouldLoad,
    topDetail: state.topDetail
});

export default connect(mapStateToProps)(TopDetail);
