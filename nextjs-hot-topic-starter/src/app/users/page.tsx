import React from "react";
import UserTable from "@/components/user-table";
const page = async (props: any) => {
  const limit = 1;
  const page = props?.searchParams?.page ?? 1;
  const res = await fetch(
    `http://localhost:8000/users?_page=${page}&_limit=${limit}`
  );
  const data = await res.json();

  return (
    <div>
      <h1>users</h1>
      <UserTable users={data ? data : []} />
    </div>
  );
};

export default page;
