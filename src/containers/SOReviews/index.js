import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Layout } from 'antd';
import ReviewList from './reviewList';
import { ReviewWrapper } from './reviews.style';
import Spins from '../../components/uielements/spin'
import { markAsReviewed, getResToReviewByUser } from '../../redux/soreservations/actions'
import { saveReview, getReviewByResId } from '../../redux/soreviews/actions'
import { ModalDataWrapper } from './modal.style';
import Modal from '../../components/feedback/modal';
import Rate from '../../components/uielements/rate';
import { Textarea } from '../../components/uielements/input';
import Button from '../../components/uielements/button';
import moment from 'moment'


const { Content } = Layout;

class Reviews extends Component {

    constructor(props) {
        super(props)
        props.dispatch(getResToReviewByUser(props.user.users.id))
        this.markAsReviewed = this.markAsReviewed.bind(this)
        this.saveReview = this.saveReview.bind(this)
        this.displayReview = this.displayReview.bind(this)
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false })
        }, 500)
    }

    state = {
        loading: true,
        modalVisible: false,
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.reviews.review && prevProps.reviews.review !== this.props.reviews.review) {
            this.setState({ review: this.props.reviews.review[0], modalVisible: true })
        }

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
            this.props.dispatch(getResToReviewByUser(this.props.user.users.id))
        }, 300)
    }

    saveReview = (reviewData) => {
        const sendData = {
            ...reviewData,
            reviewerName: this.props.user.users.name,
            reviewerLastName: this.props.user.users.lastname,
            reviewerId: this.props.user.users.id,
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
            this.props.dispatch(getResToReviewByUser(this.props.user.users.id))
        }, 300)

    }

    displayReview = (id) => {
        this.props.dispatch(getReviewByResId(id));

    }

    handleClose = () => {
        this.setState({
            modalVisible: false,
        });
    };

    showModal = () => (
        this.state.review ?
            <Modal
                visible={this.state.modalVisible}
                title="Valoración"
                onOk={this.handleClose}
                onCancel={this.handleClose}
                footer={[
                    <Button
                        key="submit"
                        type="primary"
                        size="large"
                        // loading={this.state.loading}
                        onClick={this.handleClose}
                    >
                        Cerrar
              </Button>
                ]}
            >
                <ModalDataWrapper className="isoContactCard">
                    <div className="isoContactInfoWrapper">
                        <div className="isoContactCardInfos">
                            <p className="isoInfoLabel" style={{ fontSize: "24px", paddingTop: "5px" }} >Reserva en {this.state.review.salaName}</p>
                        </div>
                        <div className="isoContactCardInfos">
                            <p className="isoInfoLabel">Creada el</p>
                            <span>{moment(this.state.review.createdAt).format('dddd D [de] MMMM [de] YYYY')}</span>
                        </div>
                        <div className="isoContactCardInfos">
                            <p className="isoInfoLabel">Puntaje</p>
                            <span>
                                <Rate value={this.state.review.score} disabled />
                            </span>
                        </div>
                        <div className="isoContactCardInfos">
                            <p className="isoInfoLabel">Opinión</p>
                            {/* <span> */}
                            <Textarea rows={4} value={this.state.review.reviewText} disabled={true} />
                            {/* </span> */}
                        </div>
                    </div>

                </ModalDataWrapper>
            </Modal>
            : <div></div>
    )





    render() {
        // console.log(this.props)
        console.log(this.state)
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
                                        displayReview={this.displayReview}
                                    />
                                </Content>
                            </ReviewWrapper>
                        </Layout>
                        : <div></div>
                }
                {this.showModal()}
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