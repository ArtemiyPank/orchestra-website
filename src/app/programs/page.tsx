"use client";

import { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import ProgramsClient from "./ProgramsClient";
import { Program } from "@/types/Program";

const ProgramsPage = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const locale = "en";

  useEffect(() => {
    const loadPrograms = async () => {
      const data = await fetchData("programs", locale);
      setPrograms(data);
    };
    loadPrograms();
  }, []);

  return (
    <div className="p-8">
      <ProgramsClient initialPrograms={programs} />
    </div>
  );
};

export default ProgramsPage;
