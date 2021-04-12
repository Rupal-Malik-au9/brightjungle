// import React, { useState } from "react";
// import { Link, useHistory } from "react-router-dom";
// import M from "materialize-css";

// export default function SignUp() {
//   let history = useHistory();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const registerData = () => {
//     fetch("http://localhost:2000/signup", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name,
//         email,
//         password,
//         confirmPassword,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.err) {
//           M.toast({ html: data.err, classes: "rounded" });
//         } else {
//           M.toast({ html: data.message, classes: "rounded" });
//           history.push("/login");
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
//           <span className="card-title">Continue to register</span>
//         </div>
//         <div className="card-action">
//           <input
//             type="text"
//             placeholder="name"
//             value={name}
//             onChange={(e) => {
//               setName(e.target.value);
//             }}
//           />
//           <input
//             type="text"
//             placeholder="email"
//             value={email}
//             onChange={(e) => {
//               setEmail(e.target.value);
//             }}
//           />
//           <input
//             type="text"
//             placeholder="password"
//             value={password}
//             onChange={(e) => {
//               setPassword(e.target.value);
//             }}
//           />
//           <input
//             type="text"
//             placeholder="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => {
//               setConfirmPassword(e.target.value);
//             }}
//           />
//         </div>
//       </div>
//       <center>
//         <button
//           className="btn waves-effect waves-light teal darken-2"
//           onClick={() => registerData()}
//         >
//           Register
//         </button>
//         <h5>
//           <Link to="/login">Already have an account?</Link>
//         </h5>
//       </center>
//     </div>
//   );
// }
import React, { useState } from "react";
import image from "../assets/Footer_01.jpg";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import "./register.css";
export default function SignUp() {
  let history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerData = () => {
    fetch("http://localhost:2000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          M.toast({ html: data.err, classes: "rounded" });
        } else {
          M.toast({ html: data.message, classes: "rounded" });
          history.push("/login");
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
            <div class="col-lg-6 align-justify-center pr-4 pl-0 contact-form">
              <div class="">
                <h2 class="mb-3 font-weight-light">Get Register For Free</h2>
                <h6 class="subtitle font-weight-normal">
                  Be a part of BrightJungle
                </h6>

                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <input
                        class="form-control mt-3"
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <input
                        class="form-control mt-3"
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <input
                        class="form-control mt-3"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group mt-3">
                      <input
                        class="form-control"
                        type="password"
                        placeholder="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div class="col-lg-12" style={{ marginTop: "20px" }}>
                    {/* <button
                        
                        class="btn btn-md btn-block btn-danger-gradiant text-white border-0"
                        onClick={() => registerData()}
                      > */}
                    {/* <Link to="/" style={{ color: "white" }}> Create
                        Account */}
                    {/* </Link> */}
                    {/* </button> */}
                    <button
                      disabled={
                        !/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(
                          email
                        )
                      }
                      className="btn waves-effect waves-light teal darken-2"
                      onClick={() => registerData()}
                    >
                      Register
                    </button>
                  </div>
                </div>
                <h5 className="mt-3">
                  <Link to="/login">Already have an account?</Link>
                </h5>
              </div>
            </div>
          </div>
        </div>
        <img
          class="col-lg-6 right-image pl-3"
          src={image}
          alt="register-image"
        />
      </div>
    </div>
  );
}