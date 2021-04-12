// import React, { useState, useContext } from "react";
// import { Link, useHistory } from "react-router-dom";
// import { UserContext } from "./../App";
// import M from "materialize-css";

// export default function Login() {
//   const { state, dispatch } = useContext(UserContext);
//   let history = useHistory();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const loginHandler = () => {
//     fetch("http://localhost:2000/signin", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + localStorage.getItem("token"),
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         if (data.err) {
//           M.toast({ html: data.err, classes: "rounded" });
//         } else {
//           localStorage.setItem("token", data.token);
//           localStorage.setItem("user", JSON.stringify(data.user));
//           dispatch({ type: "USER", payload: data.user });
//           M.toast({ html: "Signed in Successfully", classes: "rounded" });
//           history.push("/");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   return (
//     <div className="main">
//       <div className="card teal darken-2 ">
//         <div className="card-content white-text">
//           <span className="card-title">Login to continue</span>
//         </div>
//         <div className="card-action">
//           <input
//             type="text"
//             placeholder="email"
//             onChange={(e) => {
//               setEmail(e.target.value);
//             }}
//           />
//           <input
//             type="text"
//             placeholder="password"
//             onChange={(e) => {
//               setPassword(e.target.value);
//             }}
//           />
//         </div>
//       </div>
//       <center>
//         <button
//           className="btn waves-effect waves-light teal darken-2"
//           onClick={() => loginHandler()}
//         >
//           Login
//         </button>
//         <h5>
//           <Link to="/signup">Don't have an account?</Link>
//         </h5>
//       </center>
//     </div>
//   );
// }
import React, { useState, useContext } from "react";
import image from "../assets/Footer_01.jpg";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";
import "./register.css";
export default function Login() {
  const { dispatch } = useContext(UserContext);
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
    fetch("http://localhost:2000/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.err) {
          return M.toast({ html: data.err, classes: "rounded" });
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          M.toast({ html: "Signed in Successfully", classes: "rounded" });
          history.push("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div class="banner6 py-5">
        <div class="row">
          <div class="container">
            <div class="col-lg-6 right-image align-justify-center pr-4 pl-0 contact-form">
              <div class="mt-5">
                <h2 class="mb-3 font-weight-light"> Login Here</h2>
                <h6 class="subtitle font-weight-normal">Welcome Back</h6>

                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group mb-3">
                      <label for="inputEmail6" class="col-form-label">
                        Email
                        {/* <input
                            class="form-control mt-3 mr-7"
                            type="email"
                            placeholder="email"
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }} */}
                        <input
                          type="text"
                          placeholder="email"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </label>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group mb-3">
                      <label for="inputPassword6" class="col-form-label">
                        Password
                        {/* <input
                            class="form-control mt-3 mr-7"
                            type="password"
                            placeholder="password"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          /> */}
                        <input
                          type="password"
                          placeholder="password"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </label>
                    </div>
                  </div>
                  <div class="col-lg-12" style={{ marginTop: "20px" }}>
                    {/* <button
                        type="submit"
                        class="btn btn-md btn-block btn-danger-gradiant text-white border-0"
                        onClick={() => loginHandler()}
                      >
                        {/* <Link to="/" style={{ color: "white" }}>
                          {" "} */}
                    {/* Login */}
                    {/* </Link> */}
                    {/* </button> */}

                    <button
                      disabled={
                        !/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(
                          email
                        )
                      }
                      className="btn waves-effect waves-light teal darken-2"
                      onClick={() => loginHandler()}
                    >
                      Login
                    </button>
                  </div>
                </div>
                <h5 className="mt-3">
                  <Link to="/signup">New User?Register here</Link>
                </h5>
              </div>
            </div>
          </div>

          <img
            class="col-lg-4 left-image"
            style={{ width: "43rem" }}
            src={image}
            alt="register"
          />
        </div>
      </div>
    </div>
  );
}