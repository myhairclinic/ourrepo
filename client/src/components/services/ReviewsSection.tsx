import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { ReviewForm } from "./ReviewForm";
import { ReviewsList } from "./ReviewsList";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { StarIcon, MessageSquare, CheckCircle2, ThumbsUp, Heart } from "lucide-react";
import { motion } from "framer-motion";

interface ReviewsSectionProps {
  serviceId?: number | null;
}

export function ReviewsSection({ serviceId }: ReviewsSectionProps) {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [activeTab, setActiveTab] = useState("read");

  // Animation variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            {t("reviews.basedOn")} 500+ {t("reviews")}
          </Badge>
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            {t("reviews.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("reviews.subtitle")}
          </p>
        </div>

        {/* Satisfaction guarantee */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-xl mb-12 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
        >
          <div className="rounded-full bg-white/80 p-3 shadow-sm">
            <ThumbsUp className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold mb-1">{t("reviews.satisfactionGuarantee")}</h3>
            <p className="text-sm text-muted-foreground">
              {t({
                TR: "Hastaların %98'i tedavilerimizden memnun kaldıklarını bildiriyor",
                EN: "98% of patients report being satisfied with our treatments",
                RU: "98% пациентов сообщают, что они довольны нашими процедурами",
                KA: "პაციენტების 98% აცხადებს, რომ კმაყოფილია ჩვენი მკურნალობით"
              })}
            </p>
          </div>
        </motion.div>
        
        {/* Customer category stats */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto"
        >
          {[
            { 
              icon: <StarIcon className="h-5 w-5" />, 
              title: t("reviews.experienceRating"), 
              value: "4.9/5",
              color: "from-yellow-500 to-amber-500"
            },
            { 
              icon: <CheckCircle2 className="h-5 w-5" />, 
              title: t("reviews.staffRating"), 
              value: "4.8/5",
              color: "from-green-500 to-emerald-500"
            },
            { 
              icon: <MessageSquare className="h-5 w-5" />, 
              title: t("reviews.facilityRating"), 
              value: "4.7/5", 
              color: "from-blue-500 to-cyan-500"
            },
            { 
              icon: <Heart className="h-5 w-5" />, 
              title: t("reviews.valueRating"), 
              value: "4.9/5",
              color: "from-red-500 to-pink-500"
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white border rounded-xl p-5 shadow-sm"
            >
              <div className={`flex items-center justify-center w-10 h-10 mb-3 rounded-full bg-gradient-to-r ${stat.color} text-white`}>
                {stat.icon}
              </div>
              <h3 className="text-lg font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <Tabs 
          defaultValue="read" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="max-w-5xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <TabsList className="bg-muted/70 p-1">
              <TabsTrigger value="read" className="rounded-md data-[state=active]:bg-white">
                {t({
                  TR: "Yorumları Oku",
                  EN: "Read Reviews",
                  RU: "Читать отзывы",
                  KA: "წაიკითხეთ მიმოხილვები",
                })}
              </TabsTrigger>
              <TabsTrigger value="write" className="rounded-md data-[state=active]:bg-white">
                {t({
                  TR: "Yorum Yaz",
                  EN: "Write a Review",
                  RU: "Написать отзыв",
                  KA: "დაწერეთ მიმოხილვა",
                })}
              </TabsTrigger>
            </TabsList>
            
            {activeTab === "read" && (
              <Button 
                variant="default" 
                onClick={() => setActiveTab("write")}
                className="mt-4 sm:mt-0 group transition-all duration-300 hover:shadow-md"
              >
                <MessageSquare className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                {t({
                  TR: "Deneyiminizi Paylaşın",
                  EN: "Share Your Experience",
                  RU: "Поделитесь своим опытом",
                  KA: "გაუზიარეთ თქვენი გამოცდილება"
                })}
              </Button>
            )}
          </div>
          
          <TabsContent value="read" className="mt-6">
            <ReviewsList serviceId={serviceId} />
          </TabsContent>
          
          <TabsContent value="write" className="mt-8 border rounded-xl bg-card/50 p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">
                {t({
                  TR: "Deneyiminizi Paylaşın",
                  EN: "Share Your Experience",
                  RU: "Поделитесь своим опытом",
                  KA: "გაუზიარეთ თქვენი გამოცდილება"
                })}
              </h3>
              <p className="text-muted-foreground">
                {t({
                  TR: "Yorumunuz diğer hastalara yardımcı olacak ve hizmetlerimizi iyileştirmemize katkı sağlayacaktır.",
                  EN: "Your review will help other patients and contribute to improving our services.",
                  RU: "Ваш отзыв поможет другим пациентам и будет способствовать улучшению наших услуг.",
                  KA: "თქვენი მიმოხილვა დაეხმარება სხვა პაციენტებს და ხელს შეუწყობს ჩვენი სერვისების გაუმჯობესებას."
                })}
              </p>
            </div>
            <ReviewForm serviceId={serviceId} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}