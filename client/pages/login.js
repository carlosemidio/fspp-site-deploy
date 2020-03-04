import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Layout from '../components/Layout'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
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
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '100%',
  },
}))

function Login () {
  const classes = useStyles()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  async function onHandleSubmit() {
    const response = await api.post("/sessions", { email, password })
    login(response.data.token)
    Router.push("/admin/dashboard")
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
                <FormControl className={clsx(classes.textField)}>
                  <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
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
  )
}

export default withStyles(useStyles)(Login)