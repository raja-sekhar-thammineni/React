import React, { useState, useEffect } from "react";
import Banner from "../../Helpers/Banner";
import CourseCard from "../../components/CourseCard";

import HomeCartView from "../../components/HomeCartView";
import "./Homepage.css";
import Course from "../../models/Course";
import { useAppSelector } from "../../hooks";

const Wishlist = () => {
  const Courses: Course[] = useAppSelector(
    (state) => state.HomeReducer.Courses
  );
  const [unordered, setUnordered] = useState(Courses);
  const WishList: String[] = useAppSelector(
    (state) => state.CartReducer.WishList
  );

  useEffect(() => {
    setUnordered([]);
    Courses.forEach((item) => {
      WishList.forEach((id) => {
        if (item.id === id) {
          setUnordered((prev) => [...prev, item]);
        }
      });
    });
  }, [Courses, WishList]);
  const onChangeHandler = (event: any): void => {
    console.log(event.target.value);
    const myData = [...unordered].sort((a, b) => (a.price > b.price ? 1 : -1));
    if (event.target.value === "High") {
      myData.reverse();
      setUnordered(myData);
    } else {
      setUnordered(myData);
    }
  };
  return (
    <div className="MainContainer">
      <Banner header="Discover Latest Courses on React" />
      <div className="HomeContainer">
        <div className="left">
          <div className="HeadingContainer">
            <div className="Header">My Wishlist</div>
            <div className="Sorting">
              <select
                id="sort"
                onChange={onChangeHandler}
                placeholder="choose price"
              >
                <option value="High">High to Low</option>
                <option value="Low">Low to High</option>
              </select>
            </div>
          </div>
          <div className="CoursesContainer">
            {unordered &&
              unordered.map((item) => (
                <CourseCard
                  where="Wishlist"
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
          <HomeCartView />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
