"use client";

import axios from "axios";
import Button from "./ui/Button";

const handleClick = async () => {
  console.log("posting");
  axios
    .post("/api/postFakeData", { name: "hello" })
    .then((res) => console.log(res))
    .catch((e) => {
      console.log(e);
    });
};

const FakeBtn = () => {
  return <Button onClick={() => handleClick()}>POST REQUEST</Button>;
};

export default FakeBtn;
