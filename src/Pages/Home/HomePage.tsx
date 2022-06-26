import { useState } from "react";
import Banner from "../../Helpers/Banner";
import CourseCard from "../../components/CourseCard";

import HomeCartView from "../../components/HomeCartView";
import "./Homepage.css";
import SearchLogo from "../../Assets/Group 35.png";
import Course from "../../models/Course";
import { useAppSelector } from "../../hooks";

const Homepage = () => {
  const Courses: Course[] = useAppSelector(
    (state) => state.HomeReducer.Courses
  );
  const [unordered, setUnordered] = useState(Courses);

  const [input, setInput] = useState<string>("");
  const onChnageHandlerForSearch = () => {
    setUnordered(
      Courses.filter(
        (item) =>
          item.title.toLowerCase().includes(input) ||
          item.tags[0].toLowerCase().includes(input) ||
          item.courseCreator.toLowerCase().includes(input)
      )
    );
  };

  const onChangeHandler = (event: any): void => {
    const myData = [...Courses].sort((a, b) => (a.price > b.price ? 1 : -1));
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
            <div className="Header">All Courses</div>
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
            {!unordered.length &&
              Courses.map((item) => (
                <CourseCard
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
            {unordered &&
              unordered.map((item) => (
                <CourseCard
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
          <div className="Search">
            <input
              type="text"
              placeholder="Search here"
              onChange={(e) => setInput(e.target.value.toLowerCase())}
            />
            <img
              src={SearchLogo}
              alt="Search"
              onClick={onChnageHandlerForSearch}
            />
          </div>
          <HomeCartView />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
