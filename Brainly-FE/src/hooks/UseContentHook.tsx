import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";

export function UseContent() {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setContents(res.data.content);
      });
  }, []);

  return contents;
}
