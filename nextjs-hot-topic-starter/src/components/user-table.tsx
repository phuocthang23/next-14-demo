"use client";
import React from "react";
import { Space, Table } from "antd";
import type { TableProps } from "antd";
import { IUser } from "@/types/user";

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
    title: "Action",
    key: "action",
    render: (_) => (
      <Space size="middle">
        <a>Invite </a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const UserTable: React.FC<{ users: IUser[] }> = ({ users }) => {
  return (
    <div>
      <Table
        columns={columns}
        dataSource={users}
        pagination={{
          current: 1,
          pageSize: 5,
          total: users.length,
        }}
      />
    </div>
  );
};

export default UserTable;
