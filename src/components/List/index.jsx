import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class List extends Component {
  state = { users: [] };

  componentDidMount() {
    this.token = PubSub.subscribe('returnUserResults', (_, users) =>
      this.setState({ users })
    );
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.token);
  }

  render() {
    const { users } = this.state;
    return (
      <div className="list">
        {users.map((user) => {
          return (
            <div className="card">
              <a href={user.url}>
                <img src={user.avatar_url} alt="avatar" />
              </a>
              <div>{user.login}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
