import { Alert, Flex, Spin } from "antd";

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};

const content = <div style={contentStyle} />;
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div>
      <Flex gap="small" vertical>
        <Spin tip="Loading...">
          <Alert
            message="Alert message title"
            description="Further details about the context of this alert."
            type="info"
          />
        </Spin>
      </Flex>
    </div>
  );
}
