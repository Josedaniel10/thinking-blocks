import InfiniteCanvas from "../components/canvas/InfiniteCanvas";

const SpaceBlockPage = () => {
  return (
    <InfiniteCanvas>
      <div
        style={{
          position: "absolute",
          left: 200,
          top: 200,

          width: 300,
          height: 150,

          background: "#fff",
          borderRadius: 12,
        }}
      >
        Canvas del Space Block
      </div>
    </InfiniteCanvas>
  );
};
export default SpaceBlockPage;
