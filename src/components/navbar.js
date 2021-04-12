import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "./App";
import { connect } from "react-redux";

function Navbar() {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch({ type: "CLEAR" });
    history.push("/login");
  };
  console.log(state)
  return (
    <div className="navbar-light bg-light">
      <div className="row">
        <div className="col-4 text-left">
          <a className="text-white" style={{ padding: "5px" }} href="/">
            <img src='https://png.pngitem.com/pimgs/s/78-780842_back-button-white-icon-png-transparent-png.png' style={{ "width": "4rem", "marginTop": "1.5rem" }} alt="back" />
          </a>
        </div>
        <div className="col-4 text-center">
          <a
            className="text-white"
            href="/"
          >
            <img src='https://www.brandbucket.com/sites/default/files/logo_uploads/186860/large_brightjungle.png' style={{ "width": "10rem" }} alt="logo" />

          </a>
        </div>
        <div className="col-4 mt-4">

          <ul style={{ listStyleType: "none" }}>
            <li key="1" style={{ display: "inline", marginLeft: "0.8rem", color: "#175160" }}>
              <Link to="/login" style={{ "fontSize": "19px", "fontWeight": "bold", "textDecoration": "none", color: "#175160" }}>Login</Link>
            </li>
            <li key="2" style={{ display: "inline", marginLeft: "0.8rem", color: "#175160", "fontWeight": "400" }}>
              <Link to="/signup" style={{ "fontSize": "19px", "fontWeight": "bold", "textDecoration": "none", color: "#175160" }}>SignUp</Link>
            </li>
            <li key="5" style={{ display: "inline", marginLeft: "0.8rem", color: "#175160", "fontWeight": "400" }}>
              {state && (<span onClick={() => logoutHandler()} style={{ "fontSize": "19px", "fontWeight": "bold", "textDecoration": "none", color: "#175160" }}>Logout</span>)}
            </li>
            <li key="3" style={{ display: "inline", marginLeft: "0.8rem", color: "#175160", "fontWeight": "400" }}>
              <Link to='/profile' style={{ "fontSize": "19px", "fontWeight": "bold", "textDecoration": "none" }}>
                {state && (
                  <>
                    <img
                      src={state.profileImage}
                      style={{ borderRadius: "50%", width: "7vh", height: "7vh" }} alt="profile"
                    />{" "}
                    {state.name && state.name.toUpperCase()}
                  </>
                )}</Link>
            </li>

          </ul>
        </div>
      </div >
    </div >
  );
}


const mapStateToProps = (state) => ({
  boards: state.boards,
  currentBoard: state.currentBoard,
});

export default connect(mapStateToProps)(Navbar);


