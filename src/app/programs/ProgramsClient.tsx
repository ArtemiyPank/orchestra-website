"use client";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import CardProgram from "@/components/CardProgram";
import type { Program } from "@/types/Program";
import { motion } from "framer-motion";

type ProgramsClientProps = {
  initialPrograms: Program[];
};

const ProgramsClient = ({ initialPrograms }: ProgramsClientProps) => {
  const { t, ready } = useTranslation("programs");
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);

  useEffect(() => {
    // Если потребуется, можно загрузить данные заново.
    setPrograms(initialPrograms);
  }, [initialPrograms]);

  if (!ready) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  if (!programs || programs.length === 0) {
    return (
      <div className="text-center text-muted-foreground text-lg">
        {t("noPrograms", "No programs available at the moment.")}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          {t("title", { defaultValue: "Our Programs" })}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t("subtitle", "Explore our diverse musical performances and programs")}
        </p>
      </motion.div>

      <div className="space-y-16">
        {programs.map((program) => (
          <CardProgram
            key={program.id}
            program={program}
            viewProgramText={t("viewProgram", "View Program")}
            buyTicketsText={t("buyTickets", "Buy Tickets")}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgramsClient;
