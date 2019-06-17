import React from 'react';
import antd from 'antd';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { userActions, messageActions } from '../../../actions';


class HomePage extends React.Component {
    componentDidMount() {
        //this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        console.log('messageActions', messageActions);
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <Button onClick={() => this.props.error('test')}></Button>
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in with React!!</p>
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.firstName + ' ' + user.lastName}
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
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

const connectedHomePage = connect(mapStateToProps, matchDispatchToProps)(HomePage);
export { connectedHomePage as HomePage };