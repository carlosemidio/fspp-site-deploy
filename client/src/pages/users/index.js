import React from 'react';
import api from "../../services/api";

export default class Users extends React.Component {

  constructor(props) {
    super(props);
    this.state = {users: []};
  }

  componentDidMount() {
    api.get(`/users`)
      .then(res => {
        const users = res.data;
        this.setState({ users });
      })
  }

  render() {    
    return (
      <ul>
        { this.state.users.map(person => <li key={person.id}>{person.name}</li>)}
      </ul>
    )
  }usuarios
}
