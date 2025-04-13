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
    <div className="mb-8 md:mb-10 lg:mb-12">
      {title && (
        <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{title}</h2>
      )}
      
      {subtitle && (
        <p className="text-muted-foreground text-xs md:text-sm mb-5 md:mb-6">{subtitle}</p>
      )}
      
      <div className="relative">
        {/* Timeline track */}
        <div className="absolute left-3.5 md:left-5 lg:left-6 top-5 md:top-6 lg:top-8 bottom-0 w-px md:w-0.5 bg-border" />
        
        {/* Steps */}
        <div className="space-y-4 md:space-y-5 lg:space-y-6">
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
                <div className="flex-shrink-0 mr-2.5 md:mr-3 lg:mr-4 w-7 h-7 md:w-9 md:h-9 lg:w-12 lg:h-12 rounded-full bg-background border-[1.5px] md:border-2 border-primary flex items-center justify-center z-10 shadow-sm">
                  <span className="font-bold text-primary text-xs md:text-sm lg:text-base">{index + 1}</span>
                </div>
                
                {/* Step content */}
                <div className="flex-grow pt-0.5 md:pt-1 lg:pt-2 pb-3 md:pb-4 lg:pb-6">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleStep(step.id)}
                  >
                    <div className="flex flex-wrap items-center gap-1.5 md:gap-2 lg:gap-3">
                      <h3 className="text-sm md:text-base lg:text-lg font-semibold">{step.title}</h3>
                      
                      {step.duration && (
                        <Badge variant="outline" className="flex items-center gap-1 text-[8px] md:text-[10px] lg:text-xs h-4 md:h-5 lg:h-6 px-1 md:px-1.5 lg:px-2">
                          <Clock className="h-2 w-2 md:h-2.5 md:w-2.5 lg:h-3 lg:w-3" />
                          <span>{step.duration}</span>
                        </Badge>
                      )}
                    </div>
                    
                    <motion.div
                      animate={{ rotate: expandedSteps.includes(step.id) ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-1.5 md:ml-2"
                    >
                      <ChevronDown className="h-3.5 w-3.5 md:h-4 md:w-4 lg:h-5 lg:w-5 text-muted-foreground" />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedSteps.includes(step.id) ? "auto" : 0,
                      opacity: expandedSteps.includes(step.id) ? 1 : 0,
                      marginTop: expandedSteps.includes(step.id) ? 8 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-muted-foreground text-[10px] md:text-xs lg:text-sm mb-2 md:mb-3 lg:mb-4">
                      {step.description}
                    </p>
                    
                    {step.highlights && step.highlights.length > 0 && (
                      <ul className="space-y-1 md:space-y-1.5 lg:space-y-2">
                        {step.highlights.map((highlight, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: i * 0.1 }}
                            className="flex items-start gap-1 md:gap-1.5 lg:gap-2"
                          >
                            <CheckCircle className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-[10px] md:text-xs lg:text-sm">{highlight}</span>
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                </div>
              </div>
              
              {/* Add "now" and "future" indicators */}
              {index === 0 && (
                <div className="absolute -left-12 md:-left-16 lg:-left-24 top-1 md:top-2 lg:top-3 hidden md:flex items-center">
                  <Badge className="bg-primary/20 text-primary border-primary/30 text-[8px] md:text-[10px] lg:text-xs h-4 md:h-5 px-1 md:px-1.5">
                    {t("Start")}
                  </Badge>
                  <ArrowRight className="h-2.5 w-2.5 md:h-3 md:w-3 lg:h-4 lg:w-4 text-muted-foreground ml-1" />
                </div>
              )}
              
              {index === steps.length - 1 && (
                <div className="absolute -left-12 md:-left-16 lg:-left-24 bottom-1 md:bottom-2 lg:bottom-3 hidden md:flex items-center">
                  <Badge className="bg-muted text-muted-foreground border-muted text-[8px] md:text-[10px] lg:text-xs h-4 md:h-5 px-1 md:px-1.5">
                    {t("Complete")}
                  </Badge>
                  <ArrowRight className="h-2.5 w-2.5 md:h-3 md:w-3 lg:h-4 lg:w-4 text-muted-foreground ml-1" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}