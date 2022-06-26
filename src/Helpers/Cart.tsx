import CourseLogo from "../Assets/download.png";
import "./Cart.css";
export interface ICartProps {
  price: number;
  name: string;
}

const Cart = ({ name, price }: ICartProps) => {
  return (
    <div className="cartContainer">
      <div className="image">
        <img src={CourseLogo} alt="logo" />
        <span className="name">{name}</span>
      </div>
      <p className="price">Rs {price} /-</p>
    </div>
  );
};

export default Cart;
