import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/ui/star-rating";
import { API_ROUTES } from "@/lib/constants";
import { apiRequest, queryClient } from "@/lib/queryClient";

const reviewSchema = z.object({
  name: z.string().min(2, {
    message: "İsim en az 2 karakter olmalıdır",
  }),
  email: z.string().email({
    message: "Geçerli bir e-posta adresi giriniz",
  }),
  rating: z.number().min(1, {
    message: "Lütfen bir derecelendirme seçin",
  }).max(5),
  comment: z.string().min(10, {
    message: "Yorum en az 10 karakter olmalıdır",
  }),
  serviceId: z.number().nullable().optional(),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  serviceId?: number | null;
}

export function ReviewForm({ serviceId }: ReviewFormProps) {
  const { toast } = useToast();
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: "",
      email: "",
      rating: 0,
      comment: "",
      serviceId: serviceId || null,
    },
  });

  const reviewMutation = useMutation({
    mutationFn: async (data: ReviewFormData) => {
      const res = await apiRequest("POST", API_ROUTES.REVIEWS, {
        ...data,
        language: language,
      });
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: t({
          TR: "Yorumunuz gönderildi",
          EN: "Your review has been submitted",
          RU: "Ваш отзыв отправлен",
          KA: "თქვენი მიმოხილვა გაგზავნილია",
        }),
        description: t({
          TR: "Yorumunuz onaylandıktan sonra sitede yayınlanacaktır.",
          EN: "Your review will be published on the site after approval.",
          RU: "Ваш отзыв будет опубликован на сайте после одобрения.",
          KA: "თქვენი მიმოხილვა გამოქვეყნდება საიტზე დამტკიცების შემდეგ.",
        }),
      });
      setIsSubmitted(true);
      form.reset();
      // Invalidate the reviews query to refresh the data
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.REVIEWS] });
      if (serviceId) {
        queryClient.invalidateQueries({ queryKey: [`${API_ROUTES.REVIEWS}/${serviceId}`] });
      }
    },
    onError: (error: Error) => {
      toast({
        title: t({
          TR: "Hata",
          EN: "Error",
          RU: "Ошибка",
          KA: "შეცდომა",
        }),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: ReviewFormData) {
    reviewMutation.mutate(data);
  }

  if (isSubmitted) {
    return (
      <div className="bg-muted p-6 rounded-lg text-center">
        <h3 className="text-xl font-semibold mb-2">
          {t({
            TR: "Yorumunuz için teşekkürler!",
            EN: "Thank you for your review!",
            RU: "Спасибо за ваш отзыв!",
            KA: "მადლობა თქვენი მიმოხილვისთვის!",
          })}
        </h3>
        <p className="text-muted-foreground mb-4">
          {t({
            TR: "Yorumunuz onaylandıktan sonra sitede yayınlanacaktır.",
            EN: "Your review will be published on the site after approval.",
            RU: "Ваш отзыв будет опубликован на сайте после одобрения.",
            KA: "თქვენი მიმოხილვა გამოქვეყნდება საიტზე დამტკიცების შემდეგ.",
          })}
        </p>
        <Button 
          onClick={() => setIsSubmitted(false)}
        >
          {t({
            TR: "Yeni Yorum Ekle",
            EN: "Add New Review",
            RU: "Добавить новый отзыв",
            KA: "ახალი მიმოხილვის დამატება",
          })}
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card shadow-sm border rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-6">
        {t({
          TR: "Yorum Yap",
          EN: "Write a Review",
          RU: "Написать отзыв",
          KA: "დაწერეთ მიმოხილვა",
        })}
      </h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t({
                      TR: "Adınız",
                      EN: "Your Name",
                      RU: "Ваше имя",
                      KA: "თქვენი სახელი",
                    })}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t({
                      TR: "Adınızı girin",
                      EN: "Enter your name",
                      RU: "Введите ваше имя",
                      KA: "შეიყვანეთ თქვენი სახელი",
                    })} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t({
                      TR: "E-posta Adresiniz",
                      EN: "Your Email",
                      RU: "Ваш адрес электронной почты",
                      KA: "თქვენი ელ.ფოსტა",
                    })}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t({
                      TR: "E-posta adresinizi girin",
                      EN: "Enter your email",
                      RU: "Введите ваш адрес электронной почты",
                      KA: "შეიყვანეთ თქვენი ელ.ფოსტა",
                    })} type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t({
                    TR: "Değerlendirme",
                    EN: "Rating",
                    RU: "Рейтинг",
                    KA: "შეფასება",
                  })}
                </FormLabel>
                <FormControl>
                  <StarRating 
                    value={field.value} 
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t({
                    TR: "Yorumunuz",
                    EN: "Your Review",
                    RU: "Ваш отзыв",
                    KA: "თქვენი მიმოხილვა",
                  })}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t({
                      TR: "Deneyiminizi paylaşın",
                      EN: "Share your experience",
                      RU: "Поделитесь своим опытом",
                      KA: "გაუზიარეთ თქვენი გამოცდილება",
                    })}
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={reviewMutation.isPending}
          >
            {reviewMutation.isPending ? (
              t({
                TR: "Gönderiliyor...",
                EN: "Submitting...",
                RU: "Отправка...",
                KA: "იგზავნება...",
              })
            ) : (
              t({
                TR: "Yorumu Gönder",
                EN: "Submit Review",
                RU: "Отправить отзыв",
                KA: "გაგზავნეთ მიმოხილვა",
              })
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}