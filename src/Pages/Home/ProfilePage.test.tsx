import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import store from "../../store";
import { Provider } from "react-redux";
import ProfilePage from "./ProfilePage";

describe("Profile page testing", () => {
  const renderComponent = () =>
    render(
      <Provider store={store}>
        <ProfilePage />
      </Provider>
    );
  it("It renders My profile", () => {
    renderComponent();
    const linkElement = screen.getByText("My Profile");
    expect(linkElement).toBeInTheDocument();
  });
  it("It renders five text boxes", () => {
    renderComponent();
    const linkElement = screen.getAllByRole("textbox");
    expect(linkElement).toHaveLength(5);
  });
  it("It will take inputs from user and clears upon clicking save button", () => {
    renderComponent();
    global.URL.createObjectURL = jest.fn();
    const inputs = screen.getAllByRole("textbox");
    const pic = new File(["hello"], "hello.png", { type: "image/png" });
    const image = screen.getByPlaceholderText("Upload profile pic");
    userEvent.upload(image, pic);

    fireEvent.change(inputs[0], {
      target: { value: "Raja Sekhar Thammineni" },
    });
    fireEvent.change(inputs[1], { target: { value: "Raja Sekhar" } });
    fireEvent.change(inputs[2], { target: { value: "Thammineni" } });
    fireEvent.change(inputs[3], {
      target: { value: "I am a software developer" },
    });
    fireEvent.change(inputs[4], { target: { value: "SDE" } });

    const checkboxs = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxs[0]);
    fireEvent.click(checkboxs[2]);
    const radio = screen.getAllByRole("radio");
    userEvent.click(radio[0]);

    userEvent.click(radio[3]);

    userEvent.click(radio[7]);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    userEvent.click(button);
    expect(screen.getAllByRole("textbox")[0]).toHaveValue();
  });
});
