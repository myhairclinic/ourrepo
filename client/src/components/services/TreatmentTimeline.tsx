import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ChevronDown, Clock, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/hooks/use-translation";
import { Badge } from "@/components/ui/badge";

export interface TimelineStep {
  id: number;
  title: string;
  description: string;
  duration?: string;
  icon?: string;
  highlights?: (string | undefined)[];
}

interface TreatmentTimelineProps {
  steps: TimelineStep[];
  title?: string;
  subtitle?: string;
  expandAll?: boolean;
}

export function TreatmentTimeline({
  steps,
  title,
  subtitle,
  expandAll = false,
}: TreatmentTimelineProps) {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [expandedSteps, setExpandedSteps] = useState<number[]>(
    expandAll ? steps.map(step => step.id) : []
  );

  const toggleStep = (stepId: number) => {
    if (expandedSteps.includes(stepId)) {
      setExpandedSteps(expandedSteps.filter(id => id !== stepId));
    } else {
      setExpandedSteps([...expandedSteps, stepId]);
    }
  };

  return (
    <div className="mb-12">
      {title && (
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
      )}
      
      {subtitle && (
        <p className="text-muted-foreground mb-8">{subtitle}</p>
      )}
      
      <div className="relative">
        {/* Timeline track */}
        <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-border" />
        
        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex items-start">
                {/* Step circle */}
                <div className="flex-shrink-0 mr-4 w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10">
                  <span className="font-bold text-primary">{index + 1}</span>
                </div>
                
                {/* Step content */}
                <div className="flex-grow pt-2 pb-6">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleStep(step.id)}
                  >
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                      
                      {step.duration && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{step.duration}</span>
                        </Badge>
                      )}
                    </div>
                    
                    <motion.div
                      animate={{ rotate: expandedSteps.includes(step.id) ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedSteps.includes(step.id) ? "auto" : 0,
                      opacity: expandedSteps.includes(step.id) ? 1 : 0,
                      marginTop: expandedSteps.includes(step.id) ? 16 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-muted-foreground mb-4">
                      {step.description}
                    </p>
                    
                    {step.highlights && step.highlights.length > 0 && (
                      <ul className="space-y-2">
                        {step.highlights.map((highlight, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: i * 0.1 }}
                            className="flex items-start gap-2"
                          >
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                </div>
              </div>
              
              {/* Add "now" and "future" indicators */}
              {index === 0 && (
                <div className="absolute -left-24 top-3 flex items-center">
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    {t("Start")}
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground ml-1" />
                </div>
              )}
              
              {index === steps.length - 1 && (
                <div className="absolute -left-24 bottom-3 flex items-center">
                  <Badge className="bg-muted text-muted-foreground border-muted">
                    {t("Complete")}
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground ml-1" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}