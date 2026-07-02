import InfiniteCanvas from "../components/canvas/InfiniteCanvas";

const ThinkingBlockPage = () => {
  return (
    <InfiniteCanvas>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,

          width: 300,
          height: 150,

          background: "#fff",
          borderRadius: 12,
        }}
      >
        Thinking Block
      </div>
    </InfiniteCanvas>
  );
};
export default ThinkingBlockPage;
