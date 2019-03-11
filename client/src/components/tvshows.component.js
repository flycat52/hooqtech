import React, { Component } from "react";
import { Jumbotron, Container, Card, CardImg, CardGroup } from "reactstrap";
import { Link } from "react-router-dom";
import _ from "lodash";

class TVShows extends Component {
  constructor(props) {
    super(props);

    this.state = {
      TVList: ""
    };
  }
  getTop20TVs = async () => {
    const response = await fetch("/api/tv");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  componentWillMount() {
    this.getTop20TVs()
      .then(res => {
        this.setState({ TVList: res });
      })
      .catch(err => console.log(err));
  }
  render() {
    const displayDiscoverTVs = _.map(this.state.TVList, (tv, index) => {
      return (
        <Card key={index}>
          <Link to={`/tv/${tv.id}`}>
            <CardImg
              src={`https://image.tmdb.org/t/p/w200${tv.poster_path}`}
              alt=""
            />
          </Link>
        </Card>
      );
    });
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <Jumbotron fluid>
            <Container fluid>
              <h1 className="display-3">TV Shows</h1>
              <p className="lead">Check out the most popular TV Shows.</p>
            </Container>
          </Jumbotron>
        </div>

        <div className="container">
          <CardGroup className="flex-container wrap">
            {displayDiscoverTVs}
          </CardGroup>
        </div>
      </div>
    );
  }
}

export default TVShows;
