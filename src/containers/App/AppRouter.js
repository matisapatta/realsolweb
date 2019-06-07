import React from 'react';
import { Switch, Route } from 'react-router-dom';
import asyncComponent from '../../helpers/AsyncFunc';

class AppRouter extends React.Component {
  render() {
    const { url } = this.props;
    return (
      <Switch>

        <Route
          exact
          path={`${url}/busqueda`}
          component={asyncComponent(() => import('../SOBusqueda'))}
        />
        <Route
          exact
          path={`${url}/reservas`}
          component={asyncComponent(() => import('../SOReservas'))}
        />
        <Route
          exact
          path={`${url}/datos`}
          component={asyncComponent(() => import('../SODatos'))}
        />
        <Route
          exact
          path={`${url}/sala/:id`}
          component={asyncComponent(() => import('../SOSala'))}
        />
                <Route
          exact
          path={`${url}/sala/:id/reservar`}
          component={asyncComponent(() => import('../SOCreateReserva'))}
        />
        <Route
          exact
          path={`${url}/logout`}
          component={asyncComponent(() => import('../SOLogout'))}
        />

        <Route
          exact
          path={`${url}/`}
          component={asyncComponent(() => import('../SOBusqueda'))}
        />

        {/* {{Routes de Dueño de Sala}} */}
        <Route
          exact
          path={`${url}/gestionsalas`}
          component={asyncComponent(() => import('../SOGestionSalas'))}
        />
        <Route
          exact
          path={`${url}/editsala/:id`}
          component={asyncComponent(() => import('../SOEditSala'))}
        />
        <Route
          exact
          path={`${url}/createsala/`}
          component={asyncComponent(() => import('../SOCreateSala'))}
        />

      </Switch>
    );
  }
}

export default AppRouter;
