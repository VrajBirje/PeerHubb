// import styles from "../asset/css/loading.module.css";
import SquareLoader from "react-spinners/SquareLoader";
{/* <BarLoader color="blue" /> */}
const Loading = () => {
  return (
    <div className="bg-white w-[100%] h-[90vh] flex justify-center items-center">
      <SquareLoader color="yellow" />

    </div>
  );
};

export default Loading;
