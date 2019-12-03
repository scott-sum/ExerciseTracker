import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

    constructor(props) {
        // need to call super() for constructors of subclass in javascript
        super(props);

        // ensure that "this" is referring to the right object
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // use state to create variables in React
        this.state = {
            username: '',
        }
    }

    onChangeUsername(e) {
        this.setState({
          username: e.target.value
        })
    }

    onSubmit(e) {
        //prevent default HTML behaviour
        e.preventDefault();
    
        const user = {
          username: this.state.username,
        }
    
        console.log(user);

        // connect backend to frontend
        // second parameter of axios statement is the body
        // 'user' is from users.js
        axios.post('http://localhost:${process.env.PORT}/users/add', user)
            .then(res => console.log(res.data));
    
        // once the user enters a username, make the username box blank again, staying on the same page
        this.setState({
            username: ''
        })
    }

    render() {
        return (
          <div>
            <h3>Create New User</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    />
              </div>
              <div className="form-group">
                <input type="submit" value="Create User" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
      }
    }