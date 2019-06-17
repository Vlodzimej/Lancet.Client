import React from 'react';
import antd from 'antd';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { userActions, messageActions } from '../../../actions';


class MainPage extends React.Component {
    componentDidMount() {

    }

    render() {
        console.log('messageActions', messageActions);
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                MAIN PAGE
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const matchDispatchToProps = dispatch => ({
    getAllUsers: ()=> dispatch(userActions.getAll()),
    error: () => dispatch(messageActions.error())
})

const connectedMainPage = connect(mapStateToProps, matchDispatchToProps)(MainPage);
export { connectedMainPage as MainPage };