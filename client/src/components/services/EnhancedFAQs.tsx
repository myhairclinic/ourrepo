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
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
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
    <div className="mb-12">
      {title && (
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
      )}
      
      {subtitle && (
        <p className="text-muted-foreground mb-6">{subtitle}</p>
      )}
      
      <div className="relative mb-6">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder={t("Search FAQs...")}
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Category filters */}
      {categories && uniqueCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
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
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
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
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card border rounded-lg overflow-hidden"
            >
              <div
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => toggleAccordion(`faq-${faq.id}`)}
              >
                <div className="flex items-start gap-3">
                  <HelpCircleIcon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <h3 className="font-medium">{faq.question}</h3>
                </div>
                
                <div className="h-6 w-6 rounded-full border flex items-center justify-center flex-shrink-0">
                  {expandedItems.includes(`faq-${faq.id}`) ? (
                    <MinusIcon className="h-3 w-3" />
                  ) : (
                    <PlusIcon className="h-3 w-3" />
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
                    <div className="px-4 pb-4 pt-0 border-t">
                      <div className="pt-4 flex gap-3">
                        <MessageSquareIcon className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                        <div 
                          className="text-muted-foreground" 
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
        <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
          <HelpCircleIcon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">
            {t("No FAQs Found")}
          </h3>
          <p className="text-muted-foreground">
            {t("Try adjusting your search or filter criteria")}
          </p>
        </div>
      )}
    </div>
  );
}