"use client";
import React from "react";
import { Space, Table } from "antd";
import type { TableProps } from "antd";
import { IUser } from "@/types/user";
import { usePathname, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const pathname = usePathname();

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
        dataSource={users}
        onChange={handlePagination}
        pagination={{
          current: 1,
          pageSize: 10,
          total: users.length,
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
    </div>
  );
};

export default UserTable;
