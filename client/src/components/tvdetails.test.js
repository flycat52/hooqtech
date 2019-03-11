import React from "react";
import { shallow } from "enzyme";

import TVDetails from "./tvdetails.component";

const match = {
  params: {
    tvId: 60735
  }
};

const details = {
  id: 60735,
  original_name: "The Flash",
  number_of_episodes: 109,
  number_of_seasons: 5,
  overview:
    "After a particle accelerator causes a freak storm, CSI Investigator Barry Allen is struck by lightning and falls into a coma.",
  poster_path: "/fki3kBlwJzFp8QohL43g9ReV455.jpg"
};

const episodes = [
  {
    name: "City of Heroes"
  },
  { name: "Fastest Man Alive" }
];

it("renders without crashing", () => {
  shallow(<TVDetails match={match} />);
});

describe("should render correct TV details", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<TVDetails match={match} />);
    wrapper.setState({ details: details, episodes: episodes });
  });

  it("should render correct number of seasons and episodes", () => {
    expect(
      wrapper
        .find("CardSubtitle p")
        .at(0)
        .text()
    ).toEqual("5 Seasons");
    expect(
      wrapper
        .find("CardSubtitle p")
        .at(1)
        .text()
    ).toEqual("109 Episodes");
  });

  it("should render 2 episodes", () => {
    expect(wrapper.find("ListGroupItem")).toHaveLength(2);
  });
});
