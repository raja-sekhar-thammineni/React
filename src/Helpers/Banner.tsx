import "./Banner.css";
export interface IBannerProps {
  header: string;
}

const Banner = ({ header }: IBannerProps) => {
  return (
    <div className="Banner">
      <h1>{header}</h1>
    </div>
  );
};

export default Banner;
