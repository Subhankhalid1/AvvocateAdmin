import React, { useContext, useEffect } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import './scss/style.scss'
import { GlobalContext } from "./context";
import Chat from "./Chat/Chat";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const { auth, setAuth } = useContext(GlobalContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch('https://www.myavvocatoappadmin.com/api/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        }
      })
        .then(res => res.json())
        .then(data => {
          setAuth(data);
        })
    }
  }, [])

  return (
    <HashRouter>
      {
        auth === null ? <Redirect to="/login" /> : <Redirect to="/dashboard" />
      }
      <React.Suspense fallback={loading}>
        <Switch>
          <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
          <Route exact path="/chat" component={Chat} />
          <Route
            exact
            path="/register"
            name="Register Page"
            render={(props) => <Register {...props} />}
          />
          <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
          <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
          <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
        </Switch>
      </React.Suspense>
    </HashRouter>
  )
}
export default App;