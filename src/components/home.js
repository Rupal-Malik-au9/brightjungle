import React from "react";
import { connect } from "react-redux";
import { deleteBoard, setCurrentBoard } from "../actions";
import styled from "styled-components";
// import { addBoard, deleteBoard, setCurrentBoard } from "../actions";
// import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Icon } from "@material-ui/core";
import image from './../startPlanning.PNG';
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const Thumbnails = styled.div`
  flex: 1;
  height: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
// #afa56c; olive
//#567644; bottle green
//#3b3256; navy blue
//#175160; sherlock genji
//#4b9cdc; sky
//#b53156; crimson

const Thumbnail = styled.div`
  height: 100px;
  width: 200px;
  background: #175160;
  padding: 10px;
  margin: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 2px 4px black;
`;

const Title = styled.h4`
  color: white;
  text-decoration: none;
  opacity: 1;
  ${Thumbnail}:hover & {
    display: block;
    cursor: pointer;
    opacity: 0.7;
  }
`;

const DeleteButton = styled(Icon)`
  display: block;
  color: white;
  opacity: 0.3;
  ${Thumbnail}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const CreateTitle = styled.h3`
  font-size: 48px;
  color: black;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  padding: 10px;
  margin-top: 10px;
`;

// const CreateInput = styled.input`
//   width: 300px;
//   height: 50px;
//   font-size: 20px;
//   padding: 10px;
//   box-sizing: border-box;
//   border-radius: 3px;
//   border: none;
//   outline-color: blue;
//   box-shadow: 0 2px 4px grey;
//   align-self: center;
// `;

//#2e7196; b0c4de;008B8B;2F4F4F
// const CreateButton = styled.button`
//   width: 70px;
//   height: 50px;
//   background-color: #2e7196;
//   color: white;
//   font-size: 17px;
//   padding: 10px;
//   box-sizing: border-box;
//   border-radius: 10px;
//   border: none;
//   outline-color: blue;
//   box-shadow: 0 2px 4px grey;
//   align-self: center;
//   margin: 10px;
// `;

// const Home = ({ boards, dispatch, match }) => {
const Home = () => {
  // console.log("Home: ", match.params);
  // dispatch(setCurrentBoard(null));
  // const [newBoardTitle, setNewBoardTitle] = useState("");

  // const handleChange = (e) => {
  //   if (e.target.value.length < 12) setNewBoardTitle(e.target.value);
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(addBoard(newBoardTitle));
  //   setNewBoardTitle("");
  // };

  // const handleDeleteBoard = (e, boardID) => {
  //   // console.log("KKBoard: delete board: ", boardID);
  //   dispatch(deleteBoard(boardID));
  // };

  const renderAllBoards = () => {
    // console.log("Home: Obj:", boards);
    // console.log("Home: ara:", Object.entries(boards));
    // return Object.entries(boards).map(([boardID, board]) => {
    return (
      <Thumbnail key="2">
        <a
          href={`/boards/board-00`}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            textDecoration: "none",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Title>Start planning</Title>
        </a>

        {/* <div className="col-1">
          <DeleteButton
            style={{ zIndex: "10" }}
            onClick={(e) => handleDeleteBoard(e, boardID)}
          >
            delete
            </DeleteButton>
        </div> */}
      </Thumbnail>
    );
    // });
  };

  // const renderCreateNewBoard = () => {
  //   return (
  //     <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
  //       <CreateTitle>Create new Board</CreateTitle>
  //       <CreateInput
  //         onChange={handleChange}
  //         value={newBoardTitle}
  //         placeholder={"Enter title and Hit enter"}
  //         type="text"
  //       />
  //       <CreateButton type="button submit">Create</CreateButton>
  //     </form>
  //   );
  // };

  return (
    <HomeContainer>
      <div style={{ "display": 'flex', "justifyItems": "space-between", "marginTop": "20px" }}>
        <div style={{ "margin": "20px" }}>
          <img src={image} alt='decorative' />
        </div> <div style={{ "margin": "20px" }}><CreateTitle>Welcome to BrightJungle</CreateTitle>
          <div>BrightJungle are your portal to more organized work???where every single part of your task can be managed, tracked, and shared with teammates. Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique???accomplish it all with Trello.</div>  <Thumbnails style={{ "margin": "20px" }}>{renderAllBoards()}</Thumbnails></div>
      </div >
      {/* {renderCreateNewBoard()} */}
    </HomeContainer >
  );
};

// const mapStateToProps = (state) => ({
//   boards: state.boards,
// });

export default Home;
