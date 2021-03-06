import React, { Component } from 'react';
import { connect } from 'react-redux';
import clone from 'clone';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import Menu from '../../components/uielements/menu';
import SidebarWrapper from './sidebar.style';

import appActions from '../../redux/app/actions';
import Logo from '../../components/utility/logo';
import { rtl } from '../../config/withDirection';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

const {
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed
} = appActions;
const stripTrailingSlash = str => {
  if (str.substr(-1) === '/') {
    return str.substr(0, str.length - 1);
  }
  return str;
};
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
  }
  handleClick(e) {
    this.props.changeCurrent([e.key]);
    if (this.props.app.view === 'MobileView') {
      setTimeout(() => {
        this.props.toggleCollapsed();
        this.props.toggleOpenDrawer();
      }, 100);
    }
  }
  onOpenChange(newOpenKeys) {
    const { app, changeOpenKeys } = this.props;
    const latestOpenKey = newOpenKeys.find(
      key => !(app.openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = app.openKeys.find(
      key => !(newOpenKeys.indexOf(key) > -1)
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    changeOpenKeys(nextOpenKeys);
  }
  getAncestorKeys = key => {
    const map = {
      sub3: ['sub2']
    };
    return map[key] || [];
  };

  renderView({ style, ...props }) {
    const viewStyle = {
      marginRight: rtl === 'rtl' ? '0' : '-17px',
      paddingRight: rtl === 'rtl' ? '0' : '9px',
      marginLeft: rtl === 'rtl' ? '-17px' : '0',
      paddingLeft: rtl === 'rtl' ? '9px' : '0'
    };
    return (
      <div className="box" style={{ ...style, ...viewStyle }} {...props} />
    );
  }

  componentWillUnmount() {
  }
  componentWillMount() {

  }

  // showAdminTab = () => (

  // )


  render() {
    const { app, toggleOpenDrawer, customizedTheme } = this.props;
    const url = stripTrailingSlash(this.props.url);
    const collapsed = clone(app.collapsed) && !clone(app.openDrawer);
    const { openDrawer } = app;
    const mode = collapsed === true ? 'vertical' : 'inline';
    const onMouseEnter = event => {
      if (openDrawer === false) {
        toggleOpenDrawer();
      }
      return;
    };
    const onMouseLeave = () => {
      if (openDrawer === true) {
        toggleOpenDrawer();
      }
      return;
    };
    const scrollheight = app.height;
    const styling = {
      backgroundColor: customizedTheme.backgroundColor
    };
    const submenuColor = {
      color: customizedTheme.textColor
    };
    const submenuStyle = {
      backgroundColor: 'rgba(0,0,0,0.3)',
      color: customizedTheme.textColor
    };

    return (
      <SidebarWrapper>
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={collapsed}
          width="240"
          className="isomorphicSidebar"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={styling}
        >
          <Logo collapsed={collapsed} />
          <Scrollbars
            renderView={this.renderView}
            style={{ height: scrollheight - 70 }}
          >
            <Menu
              onClick={this.handleClick}
              theme="dark"
              mode={mode}
              openKeys={collapsed ? [] : app.openKeys}
              selectedKeys={app.current}
              onOpenChange={this.onOpenChange}
              className="isoDashboardMenu"
            >
              {this.props.user.users.role !== 1 ?
                <Menu.Item key="search">
                  <Link to={`${url}/busqueda`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <i className="ion-android-search" />
                      <span className="nav-text">
                        Búsqueda
                    </span>
                    </span>
                  </Link>
                </Menu.Item>
                : null}

              {this.props.user.users.role !== 1 ?
                <Menu.Item key="reservas">
                  <Link to={`${url}/reservas`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <i className="ion-android-list" />
                      <span className="nav-text">
                        Mis reservas
                    </span>
                    </span>
                  </Link>
                </Menu.Item>
                : null}

              {this.props.user.users.role !== 1 ?
                <Menu.Item key="reviews">
                  <Link to={`${url}/reviews`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <i className="ion-star" />
                      <span className="nav-text">
                        Valoraciones
                    </span>
                    </span>
                  </Link>
                </Menu.Item>
                : null}

              {this.props.user.users.role !== 1 ?
                <Menu.Item key="datos">
                  <Link to={`${url}/datos`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <i className="ion-android-person" />
                      <span className="nav-text">
                        Mis datos
                    </span>
                    </span>
                  </Link>
                </Menu.Item>
                : null}


              {/* Solapas del dueño de sala */}
              {this.props.user.users.role === 1 || this.props.user.users.role === 2 ?
                <Menu.Item key="gestionsalas">
                  <Link to={`${url}/gestionsalas`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <i className="ion-filing" />
                      <span className="nav-text">
                        Gestión de Salas
                    </span>
                    </span>
                  </Link>
                </Menu.Item>
                : null}

              {this.props.user.users.role === 1 || this.props.user.users.role === 2 ?
                <Menu.Item key="gestionreservas">
                  <Link to={`${url}/gestionreservas`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <i className="ion-android-list" />
                      <span className="nav-text">
                        Gestión de Reservas
                    </span>
                    </span>
                  </Link>
                </Menu.Item>
                : null}

              {this.props.user.users.role === 1 || this.props.user.users.role === 2 ?
                <Menu.Item key="datossala">
                  {/* <Link to={`${url}/datossala`}> */}
                  <Link to={`${url}/datos`}>
                    <span className="isoMenuHolder" style={submenuColor}>
                      <i className="ion-android-person" />
                      <span className="nav-text">
                        Mis datos
                    </span>
                    </span>
                  </Link>
                </Menu.Item>
                : null}



              {/* Solapas de Admin */}
              {this.props.user.users.role === 2 ?


                // <Menu.Item key="admin">
                //   <Link to={`${url}/admin`}>
                //     <span className="isoMenuHolder" style={submenuColor}>
                //       <i className="ion-android-settings" />
                //       <span className="nav-text">
                //         Administrador
                //       </span>
                //     </span>
                //   </Link>
                // </Menu.Item>
                <SubMenu
                  key="admin"
                  title={
                    <span className="isoMenuHolder" style={submenuColor}>
                      <i className="ion-android-settings" />
                      <span className="nav-text">
                        Administrador
                      </span>
                    </span>
                  }
                >
                  <Menu.Item style={submenuStyle} key="adminreservas">
                    <Link style={submenuColor} to={`${url}/gestionreservas`}>
                      Administrar reservas
                    </Link>
                  </Menu.Item>
                  <Menu.Item style={submenuStyle} key="adminsalas">
                    <Link style={submenuColor} to={`${url}/gestionsalas`}>
                      Administrar salas
                    </Link>
                  </Menu.Item>
                  {/* <Menu.Item style={submenuStyle} key="adminreview">
                    <Link style={submenuColor} to={`${url}/adminreview`}>
                      Administrar valoraciones
                    </Link>
                  </Menu.Item> */}
                </SubMenu>


                : null}




              <Menu.Item key="logout">
                <Link to={`${url}/logout`}>
                  {/* <Link to={`/`}> */}
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-android-exit" />
                    <span className="nav-text">
                      Cerrar sesión
                    </span>
                  </span>
                </Link>
              </Menu.Item>

            </Menu>
          </Scrollbars>
        </Sider>
      </SidebarWrapper>
    );
  }
}

// const mapStateToProps = (state, ownProps) => {
//   return {
//     app: state.App.toJS(),
//     customizedTheme: state.ThemeSwitcher.toJS().sidebarTheme
//   }
// }

// const mergeProps = (stateProps, dispatchProps, ownProps) => {
//   return {
//     toggleOpenDrawer: toggleOpenDrawer,
//     changeOpenKeys: changeOpenKeys,
//     changeCurrent: changeCurrent,
//     toggleCollapsed: toggleCollapsed
//   }
// }

export default connect(
  state => ({
    app: state.App.toJS(),
    customizedTheme: state.ThemeSwitcher.toJS().sidebarTheme,
    user: state.User
  }),
  { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed }
)(Sidebar);

// export default connect(
//   mapStateToProps,
//   null,
//   { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed }
// )(Sidebar);