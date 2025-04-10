import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { API_ROUTES } from "@/lib/constants";
import { getTranslation } from "@/lib/translations";
import { Language } from "@shared/types";
import { ChevronDown, Loader2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FaqsSectionProps {
  serviceId?: number;
}

export default function FaqsSection({ serviceId }: FaqsSectionProps) {
  const { language, getTranslation } = useLanguage();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Fetch FAQs related to the specific service (if serviceId is provided) or general FAQs (if no serviceId)
  const { data: faqs, isLoading } = useQuery({
    queryKey: [API_ROUTES.FAQS, serviceId],
    queryFn: async () => {
      const url = serviceId 
        ? `${API_ROUTES.FAQS}?serviceId=${serviceId}` 
        : `${API_ROUTES.FAQS}?general=true`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("FAQs could not be loaded");
      return res.json();
    },
  });

  const sectionTitle = {
    TR: "Sıkça Sorulan Sorular",
    EN: "Frequently Asked Questions",
    RU: "Часто задаваемые вопросы",
    KA: "ხშირად დასმული კითხვები"
  };

  const noQuestionsText = {
    TR: "Henüz soru eklenmemiş",
    EN: "No questions added yet",
    RU: "Вопросы еще не добавлены",
    KA: "კითხვები ჯერ არ არის დამატებული"
  };

  // Filter to only show active FAQs and sort by order
  const activeFaqs = faqs?.filter((faq: any) => faq.isActive)
    .sort((a: any, b: any) => a.order - b.order);

  // Get the question and answer in the current language
  const getQuestion = (faq: any) => {
    switch (language) {
      case 'TR': return faq.questionTR;
      case 'EN': return faq.questionEN;
      case 'RU': return faq.questionRU;
      case 'KA': return faq.questionKA;
      default: return faq.questionEN;
    }
  };

  const getAnswer = (faq: any) => {
    switch (language) {
      case 'TR': return faq.answerTR;
      case 'EN': return faq.answerEN;
      case 'RU': return faq.answerRU;
      case 'KA': return faq.answerKA;
      default: return faq.answerEN;
    }
  };

  const handleExpandItem = (value: string) => {
    setExpandedItems(current => 
      current.includes(value) 
        ? current.filter(item => item !== value) 
        : [...current, value]
    );
  };

  // If loading, show a spinner
  if (isLoading) {
    return (
      <div className="py-8 flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  // If no FAQs, don't render the section
  if (!activeFaqs || activeFaqs.length === 0) {
    return null;
  }

  return (
    <section className="py-12 px-4 bg-muted/30">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">{getTranslation(sectionTitle)}</h2>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="multiple" value={expandedItems} className="space-y-4">
            {activeFaqs.map((faq: any) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id.toString()}
                className="border rounded-lg overflow-hidden"
              >
                <AccordionTrigger 
                  className="px-6 py-4 bg-white hover:bg-primary/5 hover:no-underline"
                  onClick={() => handleExpandItem(faq.id.toString())}
                >
                  <div className="flex justify-between items-center w-full text-left">
                    <span className="font-medium text-lg">{getQuestion(faq)}</span>
                    <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-white">
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: getAnswer(faq) }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}