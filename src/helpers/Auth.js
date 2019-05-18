import React, { Component } from 'react';
import { auth } from '../redux/sousers/actions'
import { connect } from 'react-redux';
import SignIn from '../containers/Page/signin';

export default function (ComposedClass, reload) {

    class AuthenticationCheck extends Component {

    
        renderClass = (isAuth) => (
            isAuth ?
            <ComposedClass {...this.props} user={this.props.user} />
            :
            <SignIn {...this.props} user={this.props.user} />
        )

        state = {
            loading: true
        }

        componentWillMount() {
            this.props.dispatch(auth())
        }
        componentWillReceiveProps(nextProps) {
            this.setState({ loading: false })
            if (!nextProps.user.users.isAuth) {
                this.props.history.push('/signin');
            } else {
                this.props.history.push('/dashboard')
            }
        }
        render() {
            if (this.state.loading) {
                return (
                    <div className="loader">Loading...</div>
                )
            }
            return (
                <ComposedClass {...this.props} user={this.props.user} />
            )
        }
    }

    function mapStateToProps(state) {
        return {
            user: state.User
        }
    }
    return connect(mapStateToProps)(AuthenticationCheck)
}