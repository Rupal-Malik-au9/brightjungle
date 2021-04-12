import React, { useEffect, useState, useContext } from "react";
import "./profile.css";
import { UserContext } from "../App";
import { useParams, Link } from "react-router-dom";

export default function Profile() {
  const [userImages, setUserImages] = useState(null);
  const { state, dispatch } = useContext(UserContext);

  const { userid } = useParams();

  const [followButton, setFollowButton] = useState(true);
  useEffect(() => {
    setFollowButton(state && !state.following.includes(userid));
  }, [state]);

  // console.log(state);
  useEffect(() => {
    fetch(`http://localhost:2000/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result.user.name);
        setUserImages(result);
      });
  }, []);

  const followUser = () => {
    fetch("http://localhost:2000/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        dispatch({
          type: "UPDATE",
          payload: { following: result.following, followers: result.followers },
        });
        localStorage.setItem("user", JSON.stringify(result));
        setFollowButton(false);
        setUserImages((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, result._id],
            },
          };
        });
      });
  };
  const unfollowUser = () => {
    fetch("http://localhost:2000/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        dispatch({
          type: "UPDATE",
          payload: { following: result.following, followers: result.followers },
        });
        localStorage.setItem("user", JSON.stringify(result));
        setFollowButton(true);

        setUserImages((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item !== result._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
        //  setShowFollow(true)
      });
  };

  return (
    <>
      {userImages ? (
        <div className="main">
          <div className="profile-stats">
            <img
              className="image-container"
              src={userImages.user.profileImage}
              alt="loading"
            />
            {console.log(userImages)}
            <div className="nameAndEmail">
              <h4 style={{ fontFamily: "monospace" }}>
                {userImages.user.name}
              </h4>
              <h5 style={{ fontFamily: "monospace" }}>
                {userImages.user.email}
              </h5>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "90%",
                fontFamily: "monospace",
              }}
            >
              {/* {console.log(userImages.posts)} */}
              <h6>{userImages.posts.length} posts</h6>
              <h6>{userImages.user.followers.length} followers</h6>
              <h6>{userImages.user.following.length} following</h6>
            </div>
            <br />

            {followButton ? (
              <button
                className="btn waves-effect waves-light teal darken-2"
                onClick={() => followUser()}
              >
                Follow
              </button>
            ) : (
              <button
                className="btn waves-effect waves-light teal darken-2"
                onClick={() => unfollowUser()}
              >
                unFollow
              </button>
            )}
          </div>

          <hr />
          <div className="gallery">
            {userImages.posts.map((image) => {
              return (
                <Link to={"/postdetail/" + image._id}>
                  <img key={image._id} src={image.photo} alt="loading" />
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}