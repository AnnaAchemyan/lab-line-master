import { useEffect, useState } from "react";
import Main from './componets/Main/Main';
import Footer from './componets/Footer/Footer';
import Portfolios from './componets/Main/Portfolios/Portfolios';
import Login from './componets/Admin/Login/login';
import AdminPage from './componets/Admin/AdminPage/adminPage';
import ForgotPassword from "./componets/Admin/ForgotPassword/forgotPassword";
import ResetPassword from "./componets/Admin/ResetPassword/resetPassword";
import NotFound from './componets/Main/NotFound/NotFound';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import PuffLoader from "react-spinners/PuffLoader";

function App() {
  let color = "rgb(188, 154, 107)";
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])
  
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact component={Main} />
        <Route path='/portfolio' exact component={Portfolios} />
        <Route path='/login' exact component={Login} />
        <Route path='/admin' exact component={AdminPage} />
        <Route path='/forgot-password' exact component={ForgotPassword} />
        <Route path='/reset-password' exact component={ResetPassword} />
        <Route path='/404' exact component={NotFound} />
        <Redirect to='/404' />
      </Switch>
      <Footer />
      {
        loading &&
        <div className="spiner_block">
          <PuffLoader color={color} loading={loading} size={150} />
        </div>
      }
    </div>
  );
}
export default App;
