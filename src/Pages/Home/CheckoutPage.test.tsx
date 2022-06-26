import { screen, render, waitFor, renderHook } from "@testing-library/react";
import CheckoutPage from "./CheckoutPage";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../store";

import useAPIConsumer from "../../Helpers/APIConsumer";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
const Course = {
  id: "1",
  courseCreator: "Steve",
  courseDescription: "Thisisastartercourseforshieldhandling",
  discount: 10,
  discountValidTill: "2021-08-28T01:30:00.000Z",
  price: 10000,
  tags: ["worldsaving"],
  title: "shield",
};
describe("testing checkout page", () => {
  const renderComponent = () =>
    render(
      <Provider store={store}>
        <Router>
          <CheckoutPage Course={Course} />
        </Router>
      </Provider>
    );

  it("Renders banner", async () => {
    renderComponent();
    const Banner = screen.findAllByText("Discover Latest Courses on React");
    expect((await Banner)[0]).toBeInTheDocument();
  });
  it("In intial render it need 0 items in cart", () => {
    renderComponent();
    const Banner = screen.getByText("0 Courses in Cart");
    expect(Banner).toBeInTheDocument();
  });
  it("checking cart items when adding eitems from dashboard ",async () => {
    renderHook(() => useAPIConsumer());
    renderComponent();
    const click=jest.fn()
    const buttons =  screen.getAllByRole("button");
    buttons[0].onclick=click;
    expect(buttons).toHaveLength(2);
    userEvent.click(buttons[0]);
    expect(click).toBeCalled()
    console.log(await screen.debug());
  });
});
