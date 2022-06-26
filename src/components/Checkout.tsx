import {useState,useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import Course from "../models/Course";
import { removeFromCart } from "../Reducers/CartReducer";
import { toggle } from "../Reducers/Modal";
import "./Checkout.css";

const Checkout=()=>{
  const Courses: Course[] = useAppSelector(
    (state) => state.HomeReducer.Courses
  );
  const Cart: String[] = useAppSelector((state) => state.CartReducer.Cart);
  const dispatch = useAppDispatch();
  const [total, setTotal] = useState({
    total: 0,
    totalDiscount: 0,
  });
  const onClickHandlerForCheckOut = () => {
    if (Cart.length) {
      dispatch(toggle("You have sucessfully placed your order"));
      Cart.forEach((id) => dispatch(removeFromCart(id)));
      return;
    }
    dispatch(toggle("Please add some courses into bucket"));
  };
  useEffect(() => {
    setTotal({
      total: 0,
      totalDiscount: 0,
    });
    Courses.forEach((item) => {
      let discount = 0;
      Cart.forEach((id) => {
        if (item.id === id) {
          discount = item.price - (item.price / 100) * item.discount;

          console.log(total);
          setTotal((prev) => {
            return {
              total: prev.total + (item.price - discount),
              totalDiscount: prev.totalDiscount + discount,
            };
          });
        }
      });
    });
  }, [Courses, Cart]);
  return (
    <div className="Checkout">
      <div className="totalAmount">Total Amount</div>
      <div className="totalPrice">Rs {total.totalDiscount}/-</div>
      <div className="totaldiscount"> You have saved Rs {total.total}/-</div>
      <div className="checkout">
        <button onClick={onClickHandlerForCheckOut}>CHECKOUT</button>
      </div>
    </div>
  );
}

export default Checkout;