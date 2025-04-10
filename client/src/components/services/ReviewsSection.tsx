import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { ReviewForm } from "./ReviewForm";
import { ReviewsList } from "./ReviewsList";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ReviewsSectionProps {
  serviceId?: number | null;
}

export function ReviewsSection({ serviceId }: ReviewsSectionProps) {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [activeTab, setActiveTab] = useState("read");

  return (
    <section className="py-12 border-t">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {t({
            TR: "Müşteri Yorumları",
            EN: "Customer Reviews",
            RU: "Отзывы клиентов",
            KA: "მომხმარებელთა მიმოხილვები",
          })}
        </h2>
        
        <Tabs 
          defaultValue="read" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="max-w-4xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <TabsList>
              <TabsTrigger value="read">
                {t({
                  TR: "Yorumları Oku",
                  EN: "Read Reviews",
                  RU: "Читать отзывы",
                  KA: "წაიკითხეთ მიმოხილვები",
                })}
              </TabsTrigger>
              <TabsTrigger value="write">
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
                variant="outline" 
                onClick={() => setActiveTab("write")}
                className="mt-4 sm:mt-0"
              >
                {t({
                  TR: "Yorum Ekle",
                  EN: "Add Review",
                  RU: "Добавить отзыв",
                  KA: "დაამატეთ მიმოხილვა",
                })}
              </Button>
            )}
          </div>
          
          <TabsContent value="read" className="mt-6">
            <ReviewsList serviceId={serviceId} />
          </TabsContent>
          
          <TabsContent value="write" className="mt-6">
            <ReviewForm serviceId={serviceId} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}