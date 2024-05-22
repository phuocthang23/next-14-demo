"use client";
import React from "react";

interface IDetail {
  params: {
    id: string;
  };
}
const Blogs = ({ params }: IDetail) => {
  return <div>this is blogs {params.id}</div>;
};

export default Blogs;
