import { Link } from "react-router-dom";

import WishlistLogo from "../Assets/Path 28.png";
import AlreadyExist from "../Assets/Path 28 (2).png";
import Arrow from "../Assets/Path 20.png";
import Delete from "../Assets/Path 22.svg";
import ReactLogo from "../Assets/download.png";
import "./CourseCard.css";
import Course from "../models/Course";

import {
  addToCart,
  addToWishlist,
  removeFromCart,
  removeFromWishList,
} from "../Reducers/CartReducer";

import { useAppDispatch, useAppSelector } from "../hooks";

import { toggle } from "../Reducers/Modal";
const CourseCard=({
  id,
  discount,
  courseCreator,
  courseDescription,
  discountValidTill,
  price,
  tags,
  title,
  where = "Dashboard",
}: Course)=> {
  const afterDiscount = price - (price / 100) * discount;
  const dispatch = useAppDispatch();

  const { WishList, Cart } = useAppSelector((state) => state.CartReducer);

  const onClickHandler = (type: string, from: string, itemId: string) => {
    console.log(type, from, itemId);

    if (type === "Wishlistpluseremove") {
      dispatch(addToWishlist(itemId));

      dispatch(toggle("Course successfully added in the Wishlist"));
      dispatch(removeFromCart(itemId));
      return;
    }
    if (type === "Cartandremovefromwishlist") {
      dispatch(addToCart(itemId));

      dispatch(toggle("Course successfully added in the Cart"));
      dispatch(removeFromWishList(itemId));
      return;
    }
    if (type === "Delete") {
      if (from === "Wishlist") {
        dispatch(removeFromWishList(itemId));
        dispatch(toggle("Course successfully removed from the Wishlist"));
      } else {
        dispatch(removeFromCart(itemId));
        dispatch(toggle("Course successfully removed from the cart"));
      }
    } else {
      if (type !== "Course Overview")
        if (type === "Wishlist") {
          if (!WishList.includes(itemId)) {
            dispatch(addToWishlist(itemId));

            dispatch(toggle("Course successfully added in the Wishlist"));
          } else {
            dispatch(toggle("Already Exist in Wishlist"));
          }
        } else {
          if (!Cart.includes(itemId)) {
            dispatch(addToCart(itemId));
            dispatch(toggle("Course successfully added in the cart"));
          } else {
            dispatch(toggle("Already Exist in cart"));
          }
        }
    }
  };

  return (
    <div className="Course__Card">
      <div className="Left">
        <img src={ReactLogo} alt="Course Logo" />
      </div>
      <div className="right">
        <div className="Name__Container">
          <div className="Name">{courseDescription}</div>
          <div className="tags">
            {where === "Cart" ? (
              <div className="Author">{courseCreator}</div>
            ) : (
              tags.map((item) => <span key={item}>{item}</span>)
            )}
          </div>
        </div>
        {where !== "Cart" && <div className="Author">{courseCreator}</div>}
        {WishList.includes(id) ? (
          where === "Recommended" ? (
            ""
          ) : where === "Wishlist" ? (
            ""
          ) : (
            <div className="Wishlist">
              <img
                onClick={() => onClickHandler("Wishlist", where, id)}
                src={AlreadyExist}
                alt="Wishlist"
              />
            </div>
          )
        ) : where === "Recommended" ? (
          ""
        ) : where === "Wishlist" ? (
          ""
        ) : where === "Cart" ? (
          <div className="Wishlist">
            <span
              onClick={() => onClickHandler("Wishlistpluseremove", where, id)}
            >
              Move to Wishlist
            </span>
          </div>
        ) : (
          <div className="Wishlist">
            <img
              onClick={() => onClickHandler("Wishlist", where, id)}
              src={WishlistLogo}
              alt="Wishlist"
            />
          </div>
        )}

        <div className="DiscountPrice">Rs {afterDiscount} /-</div>
        {where !== "Cart" && <div className="OriginalPrice">Rs {price} /-</div>}
        {where === "Cart" ? (
          ""
        ) : where === "Wishlist" ? (
          <div className="AddToCart">
            <button
              onClick={() =>
                onClickHandler("Cartandremovefromwishlist", where, id)
              }
            >
              ADD TO CART
            </button>
          </div>
        ) : (
          <div className="AddToCart">
            <button onClick={() => onClickHandler("Cart", where, id)}>
              ADD TO CART
            </button>
          </div>
        )}
        <div className="Overview">
          {(where === "Dashboard" || where === "Recommended") && (
            <Link to={`/overview/${id}`}>
              <img
                onClick={() => onClickHandler("Course Overview", where, id)}
                src={Arrow}
                alt="Overview"
              />
            </Link>
          )}
          {(where === "Cart" || where === "Wishlist") && (
            <img
              onClick={() => onClickHandler("Delete", where, id)}
              src={Delete}
              alt="Overview"
            />
          )}
          {where === "Wishlist" && (
            <Link to={`/overview/${id}`}>
              <img
                onClick={() => onClickHandler("Course Overview", where, id)}
                src={Arrow}
                alt="Overview"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;