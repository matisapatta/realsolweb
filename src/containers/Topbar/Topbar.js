import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import appActions from '../../redux/app/actions';
import TopbarWrapper from './topbar.style';
import { TopbarUser } from '../../components/topbar';

const { Header } = Layout;
const { toggleCollapsed } = appActions;


class Topbar extends Component {

  state = {
    topName: '',
    topLastName: ''
  }

  constructor(props){
    super(props);
    props.user.users ?
    this.state = {
      topName: props.user.users.name,
      topLastName: props.user.users.lastname
    }
    : this.dummy()
  }
  // componentWillMount() {

  //   this.props.user.users ?
  //     this.setState({
  //       topName: this.props.user.users.name,
  //       topLastName: this.props.user.users.lastname
  //     })
  //     : null
  // }
  dummy = () => {

  }

  showUser = (user) => {
    return (
      user.users ?
        <div>{(user.users.name).toUpperCase()} {(user.users.lastname).toUpperCase()}</div>
        : null
    )
  }

  // showUser = () => (
  //     <div>{(this.state.topName).toUpperCase()} {(this.state.topLastName).toUpperCase()}</div>
  // )

  render() {
    const { toggleCollapsed, customizedTheme, locale } = this.props;
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
  { toggleCollapsed }
  // null,
  // { toggleCollapsed }
)(Topbar);
