import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomeCartView.css";
import Course from "../models/Course";
import { useAppSelector } from "../hooks";

import Cart from "../Helpers/Cart";

const HomeCartView = () => {
  const courses: Course[] = useAppSelector(
    (state) => state.HomeReducer.Courses
  );
  const cart: String[] = useAppSelector((state) => state.CartReducer.Cart);
  const [coursesAvailableInCart, setCoursesAvailableInCart] = useState<
    Course[]
  >([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setCoursesAvailableInCart([]);
    setTotal(0);
    courses.forEach((item) => {
      cart.forEach((id) => {
        if (item.id === id) {
          setCoursesAvailableInCart((prev) => [...prev, item]);
          setTotal(
            (pre) => pre + (item.price - (item.price / 100) * item.discount)
          );
        }
      });
    });
  }, [courses, cart]);
  return (
    <div className="HomeCartView__Container">
      <h3 className="heading">YOUR CART DETAILS</h3>
      {!coursesAvailableInCart.length && (
        <div className="cartItems">
          Your cart is empty right now. Please add courses in the cart from the
          list
        </div>
      )}
      <ul>
        {" "}
        {coursesAvailableInCart &&
          coursesAvailableInCart.map((item) => (
            <Cart
              key={item.id}
              name={item.courseDescription}
              price={item.price - (item.price / 100) * item.discount}
            />
          ))}
      </ul>
      <div className="total">
        <div>
          <p className="heading">Total Cart Value</p>
          <p className="price">Rs {total} /-</p>
        </div>
        {coursesAvailableInCart.length > 0 && (
          <Link to={"/cart"}>GO TO CHECKOUT</Link>
        )}
      </div>
    </div>
  );
};
export default HomeCartView;
