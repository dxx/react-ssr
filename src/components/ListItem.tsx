import * as React from "react";

interface ListItemProps {
  topTitle: string;
  picUrl: string;
}

class ListItem extends React.Component<ListItemProps> {
  public render() {
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
