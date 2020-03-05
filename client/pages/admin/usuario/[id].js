import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Layout from '../../../components/Layout'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { Card, CardContent } from '@material-ui/core'
import api from '../../../services/api'
import { login, withAuthSync } from '../../../services/auth'
import Router from 'next/router'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    minHeight: '90vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '100%',
    width: 600,
    height: 300,
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '100%',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
  },
  btnCancel: {
    marginLeft: theme.spacing(1),
  }
}))

const UserEdit = (props) => {
  const classes = useStyles()

  const [name, setName] = useState((props.user !== null ? props.user.name: ''))
  const [email, setEmail] = useState((props.user !== null ? props.user.email: ''))
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  async function onHandleSubmit() {
    if (props.user !== null)
      await api.put(`/users/${props.user.id}`, { name, email, password })
    else 
      await api.post("/users", { name, email, password })
    Router.push("/admin/usuarios")
  }

  return (
    <>
      <CssBaseline />
      <Layout title={(props.user !== null) ? (`Editar usuário: ${name}`):(`Adicionar usuário: ${name}`)}>
        <div className={classes.root}>
          <Card>
            <CardContent>
              <form className={classes.form} noValidate autoComplete="off">
                <TextField 
                  label="Nome" 
                  value={name}
                  onChange={event => setName(event.target.value)} />
                <TextField 
                  className={classes.marginTop}
                  label="Email"
                  value={email} 
                  onChange={event => setEmail(event.target.value)} />
                <FormControl className={clsx(classes.marginTop, classes.textField)}>
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
                <div className={classes.buttons}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => onHandleSubmit()}
                    startIcon={<SaveIcon/>}>
                    Salvar
                  </Button>
                  <Button 
                    className={classes.btnCancel}
                    variant="contained" 
                    color="secondary" 
                    onClick={() => Router.push("/admin/usuarios")}
                    startIcon={<CancelIcon/>}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </>
  )
}

UserEdit.getInitialProps = async ({ query }) => {
  if (query.id !== 'new') {
    const res = await fetch(`http://127.0.0.1:5000/users/${query.id}`)
    const data = await res.json()

    return { user: data }
  }

  return {user: null}
}

export default withAuthSync(UserEdit)