import React, { Component } from "react";
import RandomPic from "../shared/corePics";
// Columns,
import {
  Heading,
  Hero,
  Section,
  Container,
  Content,
  Columns,
  Box,
  Tile,
  Image,
} from "react-bulma-components";
// import { Column } from "react-bulma-components/lib/components/columns";
import Card from "../shared/altCard";

export default class Home extends Component {
  state = {
    recipesIndex: [],
  };
  async componentDidMount() {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}`);
    const recipesIndex = await response.json();
    this.setState({ recipesIndex: recipesIndex });
  }
  render() {
    const recipes = this.state.recipesIndex;
    return (
      // <Container className="has-text-centered">
      <Container>
        <Section>
          <Box>
            {recipes.map((recipe, idx) => {
              if (idx % 3 == 0) {
                return (
                  <Tile kind="ancestor">
                    {recipes[idx] && <Card recipe={recipe} />}
                    {recipes[idx+1] && <Card recipe={recipes[idx+1]} />}
                    {recipes[idx+2] && <Card recipe={recipes[idx+2]} />}
                  </Tile>
                );
              } else {
              }
            })}
          </Box>
          <Hero className="has-text-centered">
            <RandomPic />
          </Hero>
          <Hero
            size="large"
            color="dark"
            style={{
              backgroundSize: "cover",
              textShadow: "2px 2px #00000080",
              paddingTop: "1rem",
            }}
          >
            <Heading size={2} renderAs="h1">
              Roastme!
            </Heading>
            <Heading subtitle renderAs="h2">
              A social cookbook.
            </Heading>
            <Content renderAs="p">
              Find, create, share and modify your favourite recipes.
            </Content>
          </Hero>
        </Section>
      </Container>
    );
  }
}
