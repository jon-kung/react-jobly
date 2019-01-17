import React, { Component } from 'react';
import Input from './Input';
import JoblyApi from './JoblyApi';
// import { ButtonGroup } from 'react-native-elements';

class Login extends Component {
  constructor(props) {
    super(props);
    // default fullName is an empty string
    this.state = {
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      email: '',
      _login: true
    };
    this.getToken = this.getToken.bind(this);
    this.createBoard = this.createBoard.bind(this);
    this.updateLoginInfo = this.updateLoginInfo.bind(this);
  }
  async getToken(e) {
    e.preventDefault();
    console.log('this is the state', this.state);
    // call the api and get the token
    // remove _login, _token
    // Can clean this up...
    const { _login, _token, ...registerData } = this.state;

    const apiToken = _login
      ? await JoblyApi.login(registerData)
      : await JoblyApi.register(registerData);
    // set token to local storage
    localStorage.setItem('_token', apiToken);
    // redirect to home page

    this.setState({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      _login: false
    });
    this.props.history.push('/');
  }

  updateLoginInfo(loginInfo) {
    this.setState({ [loginInfo.name]: loginInfo.value });
  }

  createBoard() {
    const listofInputs = [];
    if (this.state._login) {
      for (let i in this.state) {
        let type = i === 'password' ? 'password' : 'text';
        console.log(`key is `, i, `type is `, type);
        if (!i.startsWith('_') && ['username', 'password'].includes(i)) {
          listofInputs.push(
            <Input
              type={type}
              name={i}
              value={this.state[i]}
              updateLoginInfo={this.updateLoginInfo}
            />
          );
        }
      }
    } else {
      for (let i in this.state) {
        let type = i === 'password' ? 'password' : 'text';
        if (!i.startsWith('_')) {
          listofInputs.push(
            <Input
              type={type}
              name={i}
              value={this.state[i]}
              updateLoginInfo={this.updateLoginInfo}
            />
          );
        }
      }
    }
    return listofInputs;
  }

  render() {
    return (
      <div className="container">
        <button
          className="btn"
          type="click"
          active={this.state._login}
          onClick={() => this.setState({ _login: true })}
        >
          Login
        </button>
        <button
          className="btn"
          type="click"
          active={!this.state._login}
          onClick={() => this.setState({ _login: false })}
        >
          Register
        </button>

        <form onSubmit={this.getToken}>
          <div class="card">
            {this.createBoard()}
            <button type="submit" class="btn btn-primary float-right">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;