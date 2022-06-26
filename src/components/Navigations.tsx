import Logo from "../Assets/Logo-2.png";
import Shopping_cart from "../Assets/shopping-cart.png";
import Profile from "../Assets/noun_profile_2068277.png";
import "./Navigation.css";
import NavigationItem from "../Helpers/NavigationItem";

const Navigation = () => {
  return (
    <ul className="Hashedin__Navigation">
      <div className="Navigation__left">
        {" "}
        <NavigationItem url="/" className="hashedin">
          <img src={Logo} alt="Hashedin Logo" />
        </NavigationItem>
      </div>
      <div className="Navigation__right">
        <NavigationItem url="/" className="Courses">
          COURSES
        </NavigationItem>
        <NavigationItem url="/wishlist" className="Wishkist">
          MY WISHLIST
        </NavigationItem>
        <NavigationItem url="/cart" className="Cart">
          <img src={Shopping_cart} alt="Cart Logo" />
        </NavigationItem>
        <NavigationItem url="/profile" className="Profile">
          <img src={Profile} alt="Profile Logo" />
        </NavigationItem>
      </div>
    </ul>
  );
};

export default Navigation;
