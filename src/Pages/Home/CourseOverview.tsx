import { useParams } from "react-router-dom";
import Banner from "../../Helpers/Banner";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Course from "../../models/Course";
import { addToCart, addToWishlist } from "../../Reducers/CartReducer";
import { toggle } from "../../Reducers/Modal";
import { Link } from "react-router-dom";
import "./CourseOverview.css";

const CourseOverview = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const id: string | undefined = params.id;
  const courses: Course[] = useAppSelector(
    (state) => state.HomeReducer.Courses
  );
  const { Cart, WishList } = useAppSelector((state) => state.CartReducer);
  const Course: Course = courses.filter((item) => item.id === id)[0];
  const addToCartHandler = () => {
    if (!Cart.includes(id as string)) {
      dispatch(addToCart(id as string));
      dispatch(toggle("Course successfully added in the cart"));
    } else dispatch(toggle("Already Exist in cart"));
  };
  const addToWishlistHandler = () => {
    if (!WishList.includes(id as string)) {
      dispatch(addToWishlist(id as string));
      dispatch(toggle("Course successfully added in the Wishlist"));
    } else dispatch(toggle("Already Exist in Wishlist"));
  };

  return (
    <div className="Course__Overview">
      <Banner header="Discover Latest Courses on React" />
      <h2 className=""> <Link to="/" >All Courses &gt; Responsive Design Course</Link></h2>
      <div className="OverViewContainer">
        <div className="courseName">
          <div className="title">{Course && Course.title}</div>
          <div className="details">{Course && Course.courseDescription}</div>
          <div className="name">{Course && Course.courseCreator}</div>
          <div className="tags">
            {Course &&
              Course.tags.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
        <div className="courseDetails">
          <div>
            <h2 className="name">Course Details</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div>
            <div className="video">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/poQXNp9ItL4"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
            <div>
              <div className="price">Rs 563/-</div>
              <div className="discountPrice">Rs 923/-</div>
              <div className="timeleft">
                {(new Date().getHours() - Math.random() * 10).toFixed(0)} hours
                left for this price
              </div>
              <div className="buttons">
                <button onClick={addToCartHandler}>Add to Cart</button>{" "}
                <button onClick={addToWishlistHandler}>Add to wishlist</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
