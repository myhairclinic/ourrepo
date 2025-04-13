import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/hooks/use-translation";
import { SearchIcon, PlusIcon, MinusIcon, MessageSquareIcon, HelpCircleIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

interface EnhancedFAQsProps {
  faqs: FAQItem[];
  title?: string;
  subtitle?: string;
  categories?: boolean;
}

export function EnhancedFAQs({
  faqs,
  title,
  subtitle,
  categories = false,
}: EnhancedFAQsProps) {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Extract unique categories
  const uniqueCategories = categories
    ? Array.from(
        new Set(
          faqs
            .filter(faq => faq.category)
            .map(faq => faq.category as string)
        )
      )
    : [];

  // Filter FAQs based on search query and selected category
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = searchQuery === "" ? true : 
      (faq.question && faq.question.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (faq.answer && faq.answer.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = 
      !selectedCategory || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleCategory = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const toggleAccordion = (value: string) => {
    if (expandedItems.includes(value)) {
      setExpandedItems(expandedItems.filter(item => item !== value));
    } else {
      setExpandedItems([...expandedItems, value]);
    }
  };

  return (
    <div className="mb-8 md:mb-12">
      {title && (
        <h2 className="text-xl md:text-2xl font-bold mb-2">{title}</h2>
      )}
      
      {subtitle && (
        <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-6">{subtitle}</p>
      )}
      
      <div className="relative mb-4 md:mb-6">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-3.5 w-3.5 md:h-4 md:w-4" />
        <Input
          type="text"
          placeholder={t("Search FAQs...")}
          className="pl-10 text-sm h-9 md:h-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Category filters */}
      {categories && uniqueCategories.length > 0 && (
        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-6 md:mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm transition-colors ${
              !selectedCategory
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            {t("All")}
          </button>
          
          {uniqueCategories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm transition-colors ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      
      {/* FAQ accordion */}
      {filteredFaqs.length > 0 ? (
        <div className="space-y-3 md:space-y-4">
          {filteredFaqs.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card border rounded-lg overflow-hidden shadow-sm"
            >
              <div
                className="p-3 md:p-4 flex items-center justify-between cursor-pointer"
                onClick={() => toggleAccordion(`faq-${faq.id}`)}
              >
                <div className="flex items-start gap-2 md:gap-3">
                  <HelpCircleIcon className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 md:mt-1 flex-shrink-0" />
                  <h3 className="font-medium text-sm md:text-base">{faq.question}</h3>
                </div>
                
                <div className="h-5 w-5 md:h-6 md:w-6 rounded-full border flex items-center justify-center flex-shrink-0 ml-2">
                  {expandedItems.includes(`faq-${faq.id}`) ? (
                    <MinusIcon className="h-2.5 w-2.5 md:h-3 md:w-3" />
                  ) : (
                    <PlusIcon className="h-2.5 w-2.5 md:h-3 md:w-3" />
                  )}
                </div>
              </div>
              
              <AnimatePresence>
                {expandedItems.includes(`faq-${faq.id}`) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 md:px-4 pb-3 md:pb-4 pt-0 border-t">
                      <div className="pt-3 md:pt-4 flex gap-2 md:gap-3">
                        <MessageSquareIcon className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground mt-0.5 md:mt-1 flex-shrink-0" />
                        <div 
                          className="text-muted-foreground text-xs md:text-sm" 
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 md:py-12 bg-muted/30 rounded-lg border border-dashed">
          <HelpCircleIcon className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground/50 mx-auto mb-3 md:mb-4" />
          <h3 className="text-base md:text-lg font-medium mb-1.5 md:mb-2">
            {t("No FAQs Found")}
          </h3>
          <p className="text-muted-foreground text-xs md:text-sm">
            {t("Try adjusting your search or filter criteria")}
          </p>
        </div>
      )}
    </div>
  );
}