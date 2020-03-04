import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Layout from '../components/Layout';
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Card, CardContent } from '@material-ui/core'
import api from '../services/api'
import { login } from '../services/auth'
import Router from 'next/router'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '90vh',
  },
  form: {
    '& > *': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%',
      // backgroundColor: 'gray',
    },
  },
}));

function Login () {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('teste');

  async function onHandleSubmit() {
    const response = await api.post("/sessions", { email, password });
    login(response.data.token);
    Router.push("/admin/dashboard");
  }

  return (
    <>
      <CssBaseline />
      <Layout>
        <div className={classes.root}>
          <Card>
            <CardContent>
              <form className={classes.form} noValidate autoComplete="off">
                <TextField 
                  label="Email" 
                  onChange={event => setEmail(event.target.value)} />
                <TextField 
                  label="Senha" 
                  onChange={event => setPassword(event.target.value)} />
                <br/>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => onHandleSubmit()}>
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </>
  );
}

export default withStyles(useStyles)(Login);