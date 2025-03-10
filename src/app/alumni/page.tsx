"use client";

import { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import AlumniClient from "./AlumniClient";
import { Alumni } from "@/types/Alumni";

const AlumniPage = () => {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const locale = "en";

  useEffect(() => {
    const loadAlumni = async () => {
      const data = await fetchData("alumni", locale);
      setAlumni(data);
    };
    loadAlumni();
  }, []);

  return (
    <div className="p-8">
      <AlumniClient alumni={alumni} />
    </div>
  );
};

export default AlumniPage;
