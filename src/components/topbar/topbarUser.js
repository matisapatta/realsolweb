import React, { Component } from 'react';
import { connect } from 'react-redux';
import userpic from '../../image/user1.png';
import authAction from '../../redux/auth/actions';

const { logout } = authAction;

class TopbarUser extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false
    };
  }
  hide() {
    this.setState({ visible: false });
  }
  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }

  render() {

    return (
      <div>
        <div className="isoImgWrapper">
          <img alt="user" src={userpic} />
          <span className="userActivity online" />
        </div>
      </div>
    );
  }
}
export default connect(null, { logout })(TopbarUser);
