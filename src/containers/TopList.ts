import { connect } from "react-redux"
import TopList from "../views/TopList";

const mapStateToProps = (state) => ({
    clientShouldLoad: state.clientShouldLoad,
    topList: state.topList
});

export default connect(mapStateToProps)(TopList);
