import { useEffect, useState } from "react";
import Banner from "../../Helpers/Banner";
import CourseCard from "../../components/CourseCard";

import "./Homepage.css";

import Checkout from "../../components/Checkout";
import Course from "../../models/Course";
import { useAppSelector } from "../../hooks";
export interface ICheckoutPropd {
  Course?: Course;
}
const CheckoutPage = ({ Course }: ICheckoutPropd) => {
  const Courses: Course[] =  useAppSelector(
    (state) => state.HomeReducer.Courses
  );
  const Courses_1= (Course && [Course!]) || Courses;
  const [unordered, setUnordered] = useState (Courses_1);
  const Cart: String[] = useAppSelector((state) => state.CartReducer.Cart);
  const [recommended, setRecommended] = useState(Courses_1);
  useEffect(() => {
    setUnordered([]);
    Courses.forEach((item) => {
      Cart.forEach((id) => {
        if (item.id === id) {
          setUnordered((prev) => [...prev, item]);
        } else {
          setRecommended([]);
          setRecommended((pre) => [...pre, item]);
        }
      });
    });
  }, [Courses, Cart]);

  return (
    <div className="MainContainer">
      <Banner header="Discover Latest Courses on React" />
      <div className="HomeContainer">
        <div className="left">
          <div className="HeadingContainer">
            <div className="Header">{unordered.length} Courses in Cart</div>
          </div>
          <div className="CoursesContainer">
            {unordered &&
              unordered.map((item) => (
                <CourseCard
                  where="Cart"
                  key={item.id}
                  courseCreator={item.courseCreator}
                  courseDescription={item.courseDescription}
                  discount={item.discount}
                  discountValidTill={item.discountValidTill}
                  price={item.price}
                  id={item.id}
                  tags={item.tags}
                  title={item.title}
                />
              ))}
          </div>

          <div style={{ marginTop: "30px" }} className="HeadingContainer">
            <div className="Header">Recommended Courses</div>
          </div>
          <div className="CoursesContainer">
            {recommended &&
              recommended.map((item) => (
                <CourseCard
                  where="Recommended"
                  key={item.id}
                  courseCreator={item.courseCreator}
                  courseDescription={item.courseDescription}
                  discount={item.discount}
                  discountValidTill={item.discountValidTill}
                  price={item.price}
                  id={item.id}
                  tags={item.tags}
                  title={item.title}
                />
              ))}
          </div>
        </div>
        <div className="right">
          <Checkout />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
