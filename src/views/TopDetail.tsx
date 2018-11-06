import * as React from "react";
import { Helmet } from "react-helmet";
import { setClientLoad, fetchTopDetail } from "../redux/actions";

interface TopDetailProps {
  match: { params: any };
  dispatch: any;
  clientShouldLoad: boolean;
  topDetail: any;
}

class TopDetail extends React.Component<TopDetailProps> {
  public componentDidMount() {
    const id = this.props.match.params.id;
    if (this.props.clientShouldLoad === true) {
      this.props.dispatch(fetchTopDetail(id));
    } else {
      this.props.dispatch(setClientLoad(true));
    }
  }
  public render() {
    const { topDetail } = this.props;
    return (
      <div>
        <Helmet>
          <title>{topDetail.name}</title>
        </Helmet>
        <div>
          <img src={topDetail.pic} width="120" height="120" style={{float: "left", marginRight: "20px"}}/>
          <span dangerouslySetInnerHTML={{__html: topDetail.info}} />
        </div>
      </div>
    );
  }
}

export default TopDetail;
