import React, { Component } from "react";
import List from "./List";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort, setCurrentBoard } from "../actions";
import styled from "styled-components";
import Create from "./Create";
// import { Link } from "react-router-dom";

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const CreateTitle = styled.h3`
  width: 100%;
  font-size: 20px;
  color: grey;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 95px;
  margin-bottom: 20px;
`;

class Board extends Component {
  componentDidMount() {
    const { boardID } = this.props.match.params;
    // console.log("Board: CDM", boardID);
    this.props.dispatch(setCurrentBoard(boardID));
  }

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  render() {
    // console.log("Board params.boardid: ", this.props.match.params.boardID);
    const { lists, cards, match, boards } = this.props;
    const { boardID } = match.params;
    const board = boards[boardID];
    if (!board)
      return <h1 style={{ textAlign: "center" }}>Board not found!</h1>;

    const listOrder = board.lists;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <CreateTitle>“Life is what happens to us while we are making other plans.”<span style={{ color: "green" }}>-Bright</span><span style={{ color: "orange" }}> Jungle</span></CreateTitle>
        <hr />
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
              {listOrder.map((listID, index) => {
                const list = lists[listID];
                if (list) {
                  const listCards = list.cards.map((cardID) => cards[cardID]);
                  return (
                    <List
                      key={list.listID}
                      listID={list.listID}
                      title={list.listTitle}
                      cards={listCards}
                      index={index}
                    />
                  );
                }
              })}
              {provided.placeholder}
              <Create list />
            </ListContainer>
          )}
        </Droppable>
      </DragDropContext >
    );
  }
}

const mapStateToProps = (state) => ({
  boards: state.boards,
  currentBoard: state.currentBoard,
  lists: state.lists,
  cards: state.cards,
});

export default connect(mapStateToProps)(Board);
