
import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import api from "../services/api";
import { login } from "../services/auth";

import styled from 'styled-components';

export const FormBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
`;

export const Form = styled.div`
  background-color: #e6e6fa;
  padding: 20px;
`;



class SignIn extends Component {

state = {
  email: "",
  password: "",
  error: ""
};

handleSignIn = async e => {
  e.preventDefault();
  const { email, password } = this.state;
  if (!email || !password) {
    this.setState({ error: "Preencha e-mail e senha para continuar!" });
  } else {
    try {
      const response = await api.post("/sessions", { email, password });
      login(response.data.token);
      this.props.history.push("/dashboard");
    } catch (err) {
      this.setState({
        error:
          "Houve um problema com o login, verifique suas credenciais. T.T"
      });
    }
  }
};

render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <FormBox>
           <Form>
           <TextField
             hintText="Enter your Email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleSignIn(event)}/> 
            </Form>  
          </FormBox>  
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};

export default withRouter(SignIn);