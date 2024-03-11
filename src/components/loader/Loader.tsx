import { RotatingLines } from "react-loader-spinner";
export const Loader: React.FC = () => {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 20,
        padding: "20px",
      }}
    >
      <RotatingLines
        strokeColor="#85aa9f"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};
