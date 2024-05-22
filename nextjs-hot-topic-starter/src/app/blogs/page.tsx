import UserTable from "@/components/user-table";

const BlogPage = async () => {
  const res = await fetch("http://localhost:8000/users");

  const data = await res.json();
  console.log(data);
  return (
    <div>
      <h1>Blog Page</h1>
      <UserTable users={data ? data: []} />
    </div>
  );
};
export default BlogPage;
