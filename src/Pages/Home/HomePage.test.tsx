import { render, screen, fireEvent } from "@testing-library/react";
import store from "../../store";
import { Provider } from "react-redux";
import HomePage from "./HomePage";
describe("Home page testing",()=>{
    const renderComponent = () => render(<Provider store={store}><HomePage /></Provider>)
    it("it should have banner",()=>{
        renderComponent();
        const bannetText=screen.getByText("Discover Latest Courses on React");
        expect(bannetText).toBeInTheDocument();
    })
    it("it should have 0 cart value on initial render",()=>{
        renderComponent();
        const bannetText=screen.getByText("Rs 0 /-");
        expect(bannetText).toBeInTheDocument();
    })
    it("Search element should be there",()=>{
        renderComponent();
        const bannetText=screen.getByPlaceholderText("Search here");
        fireEvent.change(bannetText,{target:{value:"hi"}})
        expect(bannetText).toBeInTheDocument();
    })
})