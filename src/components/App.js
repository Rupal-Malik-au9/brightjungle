import React from "react";
import { useEffect, createContext, useReducer, useContext } from "react";
import { BrowserRouter, Route, Switch, useHistory, Redirect } from "react-router-dom";

import Board from "./Board";
import Home from "./home";
import Navbar from "./navbar";
import "./App.css";
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

import { reducer, initialState } from "./reducer/userReducer";

export const UserContext = createContext();

const Routing = () => {
  // const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
      // history.push("/");
    }
  }, []);

  return (
    <Switch>
      <Route path="/boards/:boardID" component={Board} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route exact path="/" component={Home} />
      <Route path="/profile/" component={Profile} />
      <Redirect from="/home" to="/" />
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

// class App extends Component {
//   render() {
//     return (
//       <div
//         style={{
//           minHeight: "100vh",
//           minWidth: "100%",
//           overflowY: "auto",
//           overflowX: "auto",
//           backgroundImage: `url(https://images.unsplash.com/photo-1495195129352-aeb325a55b65?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=755&q=80)`,
//           backgroundRepeat: 'repeat-x',
//           backgroundSize: "contain",
//           padding: "15px",
//           backgroundColor: '#081c32'
//         }}
//       >
//         <Navbar />
//         <div style={{ marginTop: "60px" }}>
//           <Switch>
//             <Route path="/boards/:boardID" component={Board} />
//             <Route path="/login" component={Login} />
//             <Route path="/profile" component={UserProfile} />
//             <Route path="/signup" component={SignUp} />
//             <Route exact path="/" component={Home} />

//             <Redirect from="/" to="/home" />
//           </Switch>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
