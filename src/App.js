/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Pages from "./pages/Pages";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import Page from "./pages/Page";
import Services from "./pages/Services";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import BasicInfo from "./pages/BasicInfo";
import Service from "./pages/Service";
import Testimonials from "./pages/Testimonials";
import Leads from "./pages/Leads";
import HeaderManagement from "./pages/HeaderManagement";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/pages" component={Pages} />
          <Route exact path="/pages/:id" component={Page} />
          <Route exact path="/services" component={Services} />
          <Route exact path="/services/:id" component={Service} />
          <Route exact path="/testimonials" component={Testimonials} />
          <Route exact path="/basic-info" component={BasicInfo} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/leads" component={Leads} />
          <Route exact path="/header" component={HeaderManagement} />
          <Redirect from="*" to="/pages" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
