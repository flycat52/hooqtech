import React from "react";
import { shallow } from "enzyme";

import TVShows from "./tvshows.component";

const tvList = [
  {
    id: 79501,
    poster_path: "/nVN7Dt0Xr78gnJepRsRLaLYklbY.jpg"
  },
  {
    id: 46261,
    poster_path: "/58GKcwFV3lpVOGzybeMrrNOjHpz.jpg"
  }
];

it("renders without crashing", () => {
  shallow(<TVShows />);
});

it("should render 2 shows in the screen", () => {
  const wrapper = shallow(<TVShows />);
  wrapper.setState({ TVList: tvList });
  expect(wrapper.find("Card")).toHaveLength(2);
});
