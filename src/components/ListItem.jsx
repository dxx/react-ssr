import React from "react";

class ListItem extends React.Component {
  render() {
    const {topTitle, picUrl} = this.props;
    return (
      <div>
        <div>{topTitle}</div>
        <div>
          <img src={picUrl} width="120" height="120" />
        </div>
      </div>
    );
  }
}

export default ListItem;
