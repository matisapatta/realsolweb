import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import appActions from '../../redux/app/actions';
import TopbarWrapper from './topbar.style';
import {
  TopbarSearch,
  TopbarUser,
} from '../../components/topbar';

const { Header } = Layout;
const { toggleCollapsed } = appActions;

class Topbar extends Component {

  showUser = (user) => {
    return (
      user.users ?
        <div>{(user.users.name).toUpperCase()} {(user.users.lastname).toUpperCase()}</div>
        : null
    )


  }

  render() {
    // console.log(this.props);
    const { toggleCollapsed, url, customizedTheme, locale } = this.props;
    const collapsed = this.props.collapsed && !this.props.openDrawer;
    const styling = {
      background: customizedTheme.backgroundColor,
      position: 'fixed',
      width: '100%',
      height: 70,
    };
    return (
      <TopbarWrapper>
        <Header
          style={styling}
          className={
            collapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
          }>
          <div className="isoLeft">
            <button
              className={
                collapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
              }
              style={{ color: customizedTheme.textColor }}
              onClick={toggleCollapsed}
            />
          </div>

          <ul className="isoRight">
            <li className="isoCenter">
              {this.showUser(this.props.user)}
            </li>
            <li
              // onClick={() => this.setState({ selectedItem: 'user' })}
              className="isoUser">
              <TopbarUser locale={locale} />
            </li>
          </ul>
        </Header>
      </TopbarWrapper>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.App.toJS(),
    customizedTheme: state.ThemeSwitcher.toJS().topbarTheme,
    user: state.User
  }
}

export default connect(
  mapStateToProps,
  null,
  null,
  { toggleCollapsed }
)(Topbar);
