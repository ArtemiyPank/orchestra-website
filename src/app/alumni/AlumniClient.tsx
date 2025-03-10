"use client";

import { useTranslation } from "react-i18next";
import CardAlumni from "@/components/CardAlumni";
import type { Alumni } from "@/types/Alumni";
import { motion } from "framer-motion";

type AlumniClientProps = {
  alumni: Alumni[];
};

const AlumniClient = ({ alumni }: AlumniClientProps) => {
  const { t, ready } = useTranslation("alumni");

  if (!ready) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  if (!alumni || alumni.length === 0) {
    return (
      <div className="text-center text-muted-foreground text-lg">
        {t("noAlumni", "No alumni available at the moment.")}
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
          {t("title", { defaultValue: "Our Alumni" })}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t("subtitle", "Meet the talented musicians who have been part of our orchestra")}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {alumni.map((person) => (
          <CardAlumni key={person.name} {...person} />
        ))}
      </div>
    </div>
  );
};

export default AlumniClient;
