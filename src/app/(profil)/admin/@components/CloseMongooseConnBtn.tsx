"use client";

import Button from "@/components/ui/Button";
import axios from "axios";
import { toast } from "react-hot-toast";

interface CloseMongooseConnBtnProps {}

const CloseMongooseConnBtn = ({}: CloseMongooseConnBtnProps) => {
  const handleClick = async () => {
    try {
      await axios.get("/admin/close-mongoose");
      toast.success("Sukces");
    } catch (e) {
      toast.error("Błąd");
    }
  };

  return <Button onClick={handleClick}>Close Mongoose Connection</Button>;
};

export default CloseMongooseConnBtn;
