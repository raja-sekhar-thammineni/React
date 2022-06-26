import { screen,render } from "@testing-library/react";
import { Provider } from "react-redux";
import CourseOverview from "./CourseOverview";
import store from "../../store"
import userEvent from "@testing-library/user-event";

describe("Course ocerview testing ......",()=>{
    const renderComponent = () => render(<Provider store={store}><CourseOverview /></Provider>)
    it("Renders banner",  () => {
        renderComponent();
        const Banner = screen.getByText("Discover Latest Courses on React");
        expect( Banner).toBeInTheDocument();
      });
     it("renders All Courses > Responsive Design Course",()=>{
        renderComponent();
        const Banner = screen.getByText("All Courses > Responsive Design Course");
        expect( Banner).toBeInTheDocument();
     })
     it("renders Course Details",()=>{
        renderComponent();
        const Banner = screen.getByText("Course Details");
        expect( Banner).toBeInTheDocument();
     })
     it("it should have two buttons that is add to cart and add to wishlist",()=>{
        renderComponent();
        const buttons = screen.getAllByRole("button");
        expect(buttons).toHaveLength(2);
     })
     it("it should able to handle add to cart",()=>{
        renderComponent();
        const buttons = screen.getAllByRole("button");
        userEvent.click(buttons[0])
       
     })
     it("it should able to handle add to wishlist",()=>{
        renderComponent();
        const buttons = screen.getAllByRole("button");
        userEvent.click(buttons[1])
       
     })
     it("it should able to handle exsting item in cart",()=>{
        renderComponent();
        const buttons = screen.getAllByRole("button");
        userEvent.click(buttons[0])
        userEvent.click(buttons[0])
      
     })
     it("it should able to handle exsting item in wishlist",()=>{
        renderComponent();
        const buttons = screen.getAllByRole("button");
        userEvent.click(buttons[1])
        userEvent.click(buttons[1])
        
     })

})