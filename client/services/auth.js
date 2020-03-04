import { Component } from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'

export const isAuthenticated = () => ((cookie.get("token") !== null) && (cookie.get("token") !== undefined))

export const login = token => {
  cookie.set("token", token, { expires: 1 })
}

export const logout = () => {
  cookie.remove("token")
  // To trigger the event listener we save some random data into the `logout` key
  window.localStorage.setItem("logout", Date.now()) // new
  Router.push("/login")
}

export const getToken = () => cookie.get("token")

export const auth = ctx => {
  const { token } = nextCookie(ctx)

  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end()
    return
  }

  if (!token) {
    Router.push('/login')
  }

  return token
}

// Gets the display name of a JSX component for dev tools
const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component'

export const withAuthSync = WrappedComponent =>
  class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`

    static async getInitialProps (ctx) {
      const token = auth(ctx)

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx))

      return { ...componentProps, token }
    }

    // New: We bind our methods
    constructor (props) {
      super(props)

      this.syncLogout = this.syncLogout.bind(this)
    }

    // New: Add event listener when a restricted Page Component mounts
    componentDidMount () {
      window.addEventListener('storage', this.syncLogout)
    }

    // New: Remove event listener when the Component unmount and
    // delete all data
    componentWillUnmount () {
      window.removeEventListener('storage', this.syncLogout)
      window.localStorage.removeItem('logout')
    }

    // New: Method to redirect the user when the event is called
    syncLogout (event) {
      if (event.key === 'logout') {
        console.log('logged out from storage!')
        Router.push('/login')
      }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
}