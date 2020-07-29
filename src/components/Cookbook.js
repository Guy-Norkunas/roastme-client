import React, { Component } from "react";
import RandomPic from "../shared/corePics";
// Columns,
import {
  Heading,
  Hero,
  Section,
  Container,
  Content,
  Button,
  Message,
  Tabs,
} from "react-bulma-components";
import { Link } from "react-router-dom";
// import { Column } from "react-bulma-components/lib/components/columns";
import Card from "../shared/RecipeCard";

export default class Cookbook extends Component {
  state = {
    recipesIndex: [],
    page: 1,
  };
  async componentDidMount() {
    this.getRecipes();
  }
  async getRecipes() {
    const limit = 20;
    const { page } = this.state;
    const offset = (page - 1) * limit;
    // http://localhost:3000/?tag=scarlet&ingredient=Brown+Flour&limit=20&offset=0
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/cookbook?limit=${limit}&offset=${offset}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status >= 400) {
        throw new Error("You must be logged in to do this!");
      } else {
        const { list, count } = await response.json();
        console.log(list)
        this.setState({ recipesIndex: list, count: count });
      }
    } catch (err) {
      this.setState({
        errMessage: err.message,
      });
    }
  }
  getNextPage() {
    const { page } = this.state;
    this.setState({
      page: page + 1,
    });
    this.getRecipes();
  }
  render() {
    const recipes = this.state.recipesIndex;
    const { errMessage } = this.state;
    return (
      <>
        <Section className="flex" color="black">
          <Tabs style={{ width: "100%" }}>
            <Tabs.Tab renderAs="div">
              <Link className="navbar-item" to="/">
                All Recipes
              </Link>
            </Tabs.Tab>
            <Tabs.Tab active>My Cookbook</Tabs.Tab>
          </Tabs>
          {errMessage && (
            <Container>
              <Message color="danger">
                <Message.Header>
                  Error! {errMessage}
                  <Link
                    to="/login"
                    className="button is-link"
                    style={{
                      margin: "0.75em",
                    }}
                  >
                    Log in
                  </Link>
                </Message.Header>
                {/* <Message.Body>
              </Message.Body> */}
              </Message>
            </Container>
          )}
          
          {!errMessage && (
            <Button className="add-new-button">
              <Link to={"recipe/new"}>+</Link>
            </Button>
          )}
          {recipes.length > 0 &&
            recipes.map((recipe, idx) => {
              return (
                <div className="main-component flex-tile" key={idx + 1}>
                  {recipes[idx] && <Card recipe={recipe} />}
                </div>
              );
            })}
        </Section>
        {/* recipe list above ^^^ | vvv footer stuff below */}
        <Section>
          <Hero className="has-text-centered">
            <RandomPic />
          </Hero>
          <Hero
            size="large"
            color="dark"
            style={{
              backgroundSize: "cover",
              textShadow: "2px 2px #00000080",
            }}
          >
            <Container fluid>
              <Heading size={2} renderAs="h1">
                Roastme!
              </Heading>
              <Heading subtitle renderAs="h2">
                A social cookbook.
              </Heading>
              <Content renderAs="p">
                Find, create, share and modify your favourite recipes.
              </Content>
            </Container>
          </Hero>
        </Section>
      </>
    );
  }
}
