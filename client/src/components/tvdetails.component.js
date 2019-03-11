import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  Button,
  Jumbotron,
  Container,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import _ from "lodash";
import { PropTypes } from "prop-types";

class TVDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { details: {}, episodes: [] };
  }

  componentDidMount() {
    this.getDetailsById(this.props.match.params.tvId)
      .then(res => {
        this.setState({ details: res });
      })
      .catch(err => console.log(err));

    this.getEpisodes();
  }

  async request(url) {
    const response = await fetch(url);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  getDetailsById = async tvId => {
    return await this.request(`/api/tv/${tvId}`);
  };

  getEpisodesBySeasonNumber = async (season_number = 1) => {
    const tvId = this.props.match.params.tvId;
    return await this.request(`/api/episodes/${tvId}/${season_number}`);
  };

  getEpisodes(season_number) {
    this.getEpisodesBySeasonNumber(season_number)
      .then(res => this.setState({ episodes: res }))
      .catch(err => console.log(err));
  }

  render() {
    const seasons = _.map(this.state.details.seasons, s =>
      s.season_number !== 0 ? (
        <p
          key={s.season_number}
          className="season"
          onClick={() => this.getEpisodes(s.season_number)}
        >
          {s.name}
        </p>
      ) : null
    );

    const episodes = _.map(this.state.episodes, (e, index) => (
      <ListGroupItem key={index}>{e.name}</ListGroupItem>
    ));

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
          <Card>
            <CardImg
              className="poster"
              src={`https://image.tmdb.org/t/p/w200/${
                this.state.details.poster_path
              }`}
              alt=""
            />
            <CardBody className="description">
              <CardTitle className="title">
                {this.state.details.original_name}
              </CardTitle>
              <CardSubtitle>
                <p>{this.state.details.number_of_seasons} Seasons</p>
                <p>{this.state.details.number_of_episodes} Episodes</p>
              </CardSubtitle>

              <hr />
              <CardText>{this.state.details.overview}</CardText>
              <Button color="primary">Watch</Button>
            </CardBody>
          </Card>
          <Card>
            <CardTitle className="seasons">{seasons}</CardTitle>
            <CardBody className="episodes">
              <ListGroup>{episodes}</ListGroup>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

TVDetails.propTypes = {
  match: PropTypes.object.isRequired
};

TVDetails.defaultProps = {
  match: {
    params: {
      tvId: ""
    }
  }
};

export default TVDetails;
