import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./profile.css";
import { UserContext } from "../App";
import M from "materialize-css";

export default function Profile() {
  const [allImages, setAllImages] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch("http://localhost:2000/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result.post);
        setAllImages(result.post);
      });
  }, []);

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "live-twice");
      data.append("cloud_name", "deepender");
      fetch("https://api.cloudinary.com/v1_1/deepender/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.err) {
            M.toast({ html: data.err, classes: "rounded" });
          } else {
            // console.log(data);
            // localStorage.setItem(
            //   "user",
            //   JSON.stringify({ ...state, profileImage: data.url })
            // );
            // dispatch({ type: "PICUPDATE", payload: data.url });
            fetch("http://localhost:2000/updateprofileimage", {
              method: "put",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
              body: JSON.stringify({
                profileImage: data.url,
              }),
            })
              .then((res) => res.json())
              .then((result) => {
                console.log(result);
                localStorage.setItem(
                  "user",
                  JSON.stringify({
                    ...state,
                    profileImage: result.profileImage,
                  })
                );
                dispatch({ type: "PICUPDATE", payload: result.profileImage });
              });
          }
        })
        .catch((err) => {
          M.toast({ html: err });
        });
    }
  }, [image]);
  const uploadHandler = (file) => {
    setImage(file);
  };

  return (
    <div className="main" style={{ textAlign: "center", "fontSize": "20px" }}>
      <div className="profile-stats">
        <img
          className="image-container"
          src={state ? state.profileImage : ""}
          alt="loading"
          style={{ marginLeft: "45%" }}
        />
        <div className="file-field " style={{ marginTop: "-30px" }}>
          <div className="btn">
            <h4 style={{ fontFamily: "Arial" }}>Update profile pic</h4><br />&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="file"
              onChange={(e) => uploadHandler(e.target.files[0])}
            />
          </div>
        </div>
        {/* </div> */}
        {/* <div></div> */}
        <h4 style={{ fontFamily: "Arial" }}>{state ? state.name : ""}</h4>
        <h5 style={{ fontFamily: "Arial" }}>{state ? state.email : ""}</h5>


        {/* <div className="file-path-wrapper">
            <button
              className="btn waves-effect waves-light btn btn-success mt-3"
              onClick={() => uploadHandler()}
            >
              Update Profile
            </button>
          </div> */}
      </div>

    </div>
  );
}