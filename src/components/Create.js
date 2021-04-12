import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "./Form";
import Buton from "./Buton";
import AddNewButton from "./AddNewButton";
import { addList, addCard } from "../actions";
import styled from "styled-components";

const ListContainer = styled.div`
  border-radius: 3px;
  width: 300px;
  height: 100%;
  margin-right: 8px;
`;

class Create extends Component {
  state = {
    formOpen: false,
    text: "",
  };

  openForm = () => {
    this.setState({ formOpen: true });
  };

  closeForm = (e) => {
    this.setState({ formOpen: false, text: "" });
  };

  handleListInputChange = (e) => {
    if (e.target.value.length <= 20) this.setState({ text: e.target.value });
  };
  handleCardInputChange = (e) => {
    if (e.target.value.length <= 150) this.setState({ text: e.target.value });
  };

  handleAddList = () => {
    const { dispatch } = this.props;
    const { text } = this.state;
    if (text) {
      this.setState({ text: "" });
      dispatch(addList(text));
    }
  };

  handleAddCard = () => {
    const { dispatch, listID } = this.props;
    const { text } = this.state;
    if (text) {
      this.setState({ text: "" });
      dispatch(addCard(listID, text));
    }
  };

  render() {
    const { text, formOpen } = this.state;
    const { list } = this.props;

    if (list) {
      if (formOpen)
        return (
          <ListContainer>
            <Form
              text={text}
              onChange={this.handleListInputChange}
              closeForm={this.closeForm}
            >
              <Buton text="Add List" onClick={this.handleAddList}></Buton>
            </Form>
          </ListContainer>
        );
      else
        return (
          <ListContainer>
            <AddNewButton list={list} onClick={this.openForm} />
          </ListContainer>
        );
    } else {
      if (formOpen)
        return (
          <Form
            text={text}
            onChange={this.handleCardInputChange}
            closeForm={this.closeForm}
          >
            <Buton text="Add Card" onClick={this.handleAddCard}></Buton>
          </Form>
        );
      else return <AddNewButton list={list} onClick={this.openForm} />;
    }
  }
}

export default connect()(Create);
