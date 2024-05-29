"use client";
import React, { useEffect, useState } from "react";
import { Table, Popconfirm } from "antd";
import type { TableProps } from "antd";
import { IUser } from "@/types/user";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PlusOutlined, DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
// import CreateUser from "./create.user";
// import UpdateUser from "./update.user";

interface IProps {
  users: IUser[] | [];
  meta: {
    current: number;
    pageSize: number;
    total: number;
  };
}

const UserTable: React.FC<IProps> = (props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const { users, meta } = props;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<any>(null);

  useEffect(() => {
    if (users) setIsFetching(false);
  }, [users]);

  const columns: TableProps<IUser>["columns"] = [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Actions",
      align: "center",
      render: (text, record, index) => {
        return (
          <>
            <EditTwoTone
              twoToneColor="#f57800"
              style={{ cursor: "pointer", margin: "0 20px" }}
              onClick={() => {
                setIsUpdateModalOpen(true);
                setDataUpdate(record);
              }}
            />

            <Popconfirm
              placement="leftTop"
              title={"Xác nhận xóa user"}
              description={"Bạn có chắc chắn muốn xóa user này ?"}
              onConfirm={() => handleDeleteUser(record)}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <span style={{ cursor: "pointer" }}>
                <DeleteTwoTone twoToneColor="#ff4d4f" />
              </span>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const handleDeleteUser = async (user: any) => {
    await handleDeleteUserAction({ id: user.id });
  };

  const renderHeader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Table List Users</span>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Thêm mới
        </Button>
      </div>
    );
  };

  const handlePagination = (
    pagination: any,
    filters: any,
    sorter: any,
    extra: any
  ) => {
    if (pagination && pagination.current) {
      const params = new URLSearchParams(searchParams);
      params.set("page", pagination.current);
      replace(`${pathname}?${params.toString()}`);
      setIsFetching(true);
    }
  };

  return (
    <div>
      <Table
        rowKey={"id"}
        columns={columns}
        loading={isFetching}
        bordered
        dataSource={users}
        onChange={handlePagination}
        pagination={{
          ...meta,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
      />
      {/* <CreateUser
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />

      <UpdateUser
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      /> */}
    </div>
  );
};

export default UserTable;
