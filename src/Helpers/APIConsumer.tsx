import { useEffect, useState } from "react";
import Course from "../models/Course";

export default function useAPIConsumer() {
  const [data, setData] = useState<Course[]>([]);

  useEffect(() => {
    fetch("https://62b44d18530b26da4cbb54d5.mockapi.io/api/v1/Courses")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  return { data };
}
