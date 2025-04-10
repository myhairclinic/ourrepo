import React from 'react';
import { useTranslation } from '@/lib/translations';
import { Language } from '@shared/types';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Award, Clock, Globe } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center"
    >
      <div className="mb-2 text-primary bg-primary/10 p-3 rounded-full">{icon}</div>
      <h3 className="text-3xl md:text-4xl font-bold mb-1">{value}</h3>
      <p className="text-muted-foreground text-sm">{label}</p>
    </motion.div>
  );
};

export const ResultsStats: React.FC<{ language: Language }> = ({ language }) => {
  const { t } = useTranslation(language);

  return (
    <div className="my-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-sm tracking-widest text-primary font-semibold mb-3">
          {t("services.resultsStats")}
        </h2>
        <p className="text-2xl md:text-3xl font-bold max-w-2xl mx-auto">
          {t("services.resultsDescription")}
        </p>
      </motion.div>

      <Card className="border border-primary/10 bg-gradient-to-br from-background to-primary/5 backdrop-blur shadow-xl">
        <CardContent className="p-6 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem
              icon={<CheckCircle className="w-6 h-6" />}
              value="5,000+"
              label={t("services.statHappyPatients")}
              delay={0.1}
            />
            <StatItem
              icon={<Award className="w-6 h-6" />}
              value="98%"
              label={t("services.statSuccessRate")}
              delay={0.2}
            />
            <StatItem
              icon={<Clock className="w-6 h-6" />}
              value="10+"
              label={t("services.statYearsExperience")}
              delay={0.3}
            />
            <StatItem
              icon={<Globe className="w-6 h-6" />}
              value="50+"
              label={t("services.statCountries")}
              delay={0.4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsStats;