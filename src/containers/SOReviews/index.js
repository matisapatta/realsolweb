import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getReservationsByUser } from '../../redux/soreservations/actions'
import { Layout } from 'antd';
import ReviewList from './reviewList';
import { ReviewWrapper } from './reviews.style';
import Spins from '../../components/uielements/spin'
import { markAsReviewed } from '../../redux/soreservations/actions'
import { saveReview } from '../../redux/soreviews/actions'



const { Content } = Layout;

class Reviews extends Component {

    constructor(props) {
        super(props)
        props.dispatch(getReservationsByUser(props.user.users.id))
        this.markAsReviewed = this.markAsReviewed.bind(this)
        this.saveReview = this.saveReview.bind(this)
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false })
        }, 500)
    }

    state = {
        loading: true,
    }

    markAsReviewed = (id) => {
        const send = {
            id: id,
            username: this.props.user.users.name + ' ' + this.props.user.users.lastname,
            userid: this.props.user.users.id,
        }
        this.props.dispatch(markAsReviewed(send))
        this.setState({ loading: true })

        setTimeout(() => {
            this.setState({ loading: false })
        }, 500)
        setTimeout(() => {
            this.props.dispatch(getReservationsByUser(this.props.user.users.id))
        }, 300)
    }

    saveReview = (reviewData) => {
        const sendData = {
            ...reviewData,
            reviewer: this.props.user.users.name + ' ' + this.props.user.users.lastname,
        }
        this.props.dispatch(saveReview(sendData));
        const send = {
            id: reviewData.reservationId,
            username: this.props.user.users.name + ' ' + this.props.user.users.lastname,
            userid: this.props.user.users.id,
        }
        this.props.dispatch(markAsReviewed(send))
        this.setState({ loading: true })
        setTimeout(() => {
            this.setState({ loading: false })
        }, 500)
        setTimeout(() => {
            this.props.dispatch(getReservationsByUser(this.props.user.users.id))
        }, 300)

    }

 

    render() {
        console.log(this.props)
        return (
            <Spins spinning={this.state.loading}>
                {
                    this.props.reservations.userlist ?
                        <Layout style={{ background: 'none' }}>
                            <ReviewWrapper className="isomorphicTodoComponent">
                                <Content className="isoTodoContentBody">
                                    <ReviewList
                                        reservations={this.props.reservations.userlist}
                                        deleteTodo={this.markAsReviewed}
                                        saveReview={this.saveReview}
                                    />
                                </Content>
                            </ReviewWrapper>
                        </Layout>
                        : <div></div>
                }

            </Spins>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.User,
        salas: state.Salas,
        reservations: state.Reservations,
        reviews: state.Reviews,
    }
}

export default connect(mapStateToProps)(Reviews)