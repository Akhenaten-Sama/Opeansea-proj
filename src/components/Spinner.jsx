import { Space, Spin } from "antd";

const Spinner = () => {
  return (
    <div style={{ margin: "50vh 50%" }}>
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  );
};


export default Spinner