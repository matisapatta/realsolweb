import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';

import App from './containers/App/App';
import asyncComponent from './helpers/AsyncFunc';
// import Auth from './helpers/Auth';
// import Auth0 from './helpers/auth0';

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props => isLoggedIn
      ? <Component {...props} />
      : <Redirect
        to={{
          pathname: '/signin',
          state: { from: props.location },
        }}
      />}
  />
);
const PublicRoutes = ({ history, isLoggedIn }) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Route
          exact
          path={'/'}
          component={asyncComponent(() => import('./containers/Page/landing'))}
        />
        <Route
          exact
          path={'/404'}
          component={asyncComponent(() => import('./containers/Page/404'))}
        />
        <Route
          exact
          path={'/500'}
          component={asyncComponent(() => import('./containers/Page/500'))}
        />
        <Route
          exact
          path={'/signin'}
          component={asyncComponent(() => import('./containers/Page/signin'))}
        />
        <Route
          exact
          path={'/signup'}
          component={asyncComponent(() => import('./containers/Page/signup'))}
        />
        <Route
          exact
          path={'/vendorsignup'}
          component={asyncComponent(() => import('./containers/Page/vendorsignup'))}
        />

        <Route
          exact
          path={'/search'}
          component={asyncComponent(() => import('./containers/Page/search'))}
        />
        <Route
          exact
          path={'/sala/:id'}
          component={asyncComponent(() => import('./containers/Page/sala'))}
        />

        <Route
          exact
          path={'/forgotpassword'}
          component={asyncComponent(() =>
            import('./containers/Page/forgotPassword'))}
        />
        <Route
          exact
          path={'/resetpassword'}
          component={asyncComponent(() =>
            import('./containers/Page/resetPassword'))}
        />
        <Route
          exact
          path={'/paymentok/:id'}
          component={asyncComponent(() =>
            import('./containers/SOPagoExitoso/index'))}
        />
        <Route
          exact
          path={'/paymentko/:id'}
          component={asyncComponent(() =>
            import('./containers/SOPagoError/index'))}
        />

        {/* <Route
          path="/auth0loginCallback"
          render={props => {
            Auth0.handleAuthentication(props);
          }}
        /> */}
        <RestrictedRoute
          path="/dashboard"
          component={App}
          isLoggedIn={isLoggedIn}
        />
        {/* <Route
          path="/dashboard"
          component={Auth(App,true)}
          // isLoggedIn={isLoggedIn}
        /> */}


        {/* <Route component={asyncComponent(() => import('./containers/Page/404'))} /> */}
      </div>
    </ConnectedRouter>
  );
};

// const mapStateToProps = (state, ownProps) => {
//   return {
//     user: state.User,
//     isLoggedIn: state.Auth.get('idToken') !== null
//   }
// }

export default connect(state => ({
  isLoggedIn: state.Auth.get('idToken') !== null,
}))(PublicRoutes);
