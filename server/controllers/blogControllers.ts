import { Request, Response } from "express";
import { db } from "../db";
import { blogPosts } from "@shared/schema";
import { eq } from "drizzle-orm";

// Get all blog posts
export const getAllBlogPosts = async (req: Request, res: Response) => {
  try {
    const posts = await db.select().from(blogPosts).orderBy(blogPosts.createdAt);
    
    // Eğer veri yoksa, örnek blog yazıları oluştur ve döndür
    if (posts.length === 0) {
      const samplePosts = [
        {
          id: 1,
          slug: "sac-ekimi-hakkinda-dogru-bilinen-yanlislar",
          titleTR: "Saç Ekimi Hakkında Doğru Bilinen Yanlışlar",
          titleEN: "Common Myths About Hair Transplantation",
          titleRU: "Распространенные мифы о трансплантации волос",
          titleKA: "საერთო მითები თმის გადანერგვის შესახებ",
          summaryTR: "Saç ekimi hakkında yaygın olan yanlış bilgiler ve gerçekler. Bu makalede en sık duyulan mitleri çürütüyoruz.",
          summaryEN: "Common misconceptions and facts about hair transplantation. In this article, we debunk the most frequently heard myths.",
          summaryRU: "Распространенные заблуждения и факты о трансплантации волос. В этой статье мы опровергаем наиболее часто слышимые мифы.",
          summaryKA: "გავრცელებული შეცდომები და ფაქტები თმის გადანერგვის შესახებ. ამ სტატიაში ჩვენ ვამსხვრევთ ყველაზე ხშირად გაგონილ მითებს.",
          contentTR: "Saç ekimi hakkında doğru bilinen yanlışlar ve gerçekler",
          contentEN: "Common myths about hair transplantation and facts",
          contentRU: "Распространенные мифы о трансплантации волос и факты",
          contentKA: "გავრცელებული მითები თმის გადანერგვის შესახებ და ფაქტები",
          imageUrl: "/images/blog/hair-transplant-myths.jpg",
          category: "Saç Ekimi",
          tags: "saç ekimi, mitler, yanlış bilinenler",
          author: "MyHair Clinic",
          isFeatured: true,
          isPublished: true,
          metaTitleTR: "Saç Ekimi Hakkında Doğru Bilinen Yanlışlar | MyHair Clinic",
          metaTitleEN: "Common Myths About Hair Transplantation | MyHair Clinic",
          metaTitleRU: "Распространенные мифы о трансплантации волос | MyHair Clinic",
          metaTitleKA: "საერთო მითები თმის გადანერგვის შესახებ | MyHair Clinic",
          metaDescriptionTR: "Saç ekimi hakkında yaygın mitleri ve gerçekleri öğrenin. Doğru bildiğiniz yanlışlardan kurtulun.",
          metaDescriptionEN: "Learn about common myths and facts about hair transplantation. Get rid of misconceptions you thought were true.",
          metaDescriptionRU: "Узнайте о распространенных мифах и фактах о трансплантации волос. Избавьтесь от заблуждений, которые вы считали правдой.",
          metaDescriptionKA: "შეისწავლეთ გავრცელებული მითები და ფაქტები თმის გადანერგვის შესახებ. მოიშორეთ შეცდომები, რომელთაც თქვენ სიმართლედ მიიჩნევდით.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          slug: "sac-dokulmesi-nedenleri-ve-cozumleri",
          titleTR: "Saç Dökülmesi Nedenleri ve Çözümleri",
          titleEN: "Hair Loss Causes and Solutions",
          titleRU: "Причины выпадения волос и решения",
          titleKA: "თმის ცვენის მიზეზები და გადაწყვეტილებები",
          summaryTR: "Saç dökülmesinin yaygın nedenleri ve etkili çözümler hakkında kapsamlı bir rehber.",
          summaryEN: "A comprehensive guide about common causes of hair loss and effective solutions.",
          summaryRU: "Исчерпывающее руководство о распространенных причинах выпадения волос и эффективных решениях.",
          summaryKA: "ამომწურავი სახელმძღვანელო თმის ცვენის გავრცელებულ მიზეზებზე და ეფექტურ გადაწყვეტილებებზე.",
          contentTR: "Saç dökülmesi nedenleri ve çözümleri hakkında detaylı bilgi",
          contentEN: "Detailed information about hair loss causes and solutions",
          contentRU: "Подробная информация о причинах выпадения волос и решениях",
          contentKA: "დეტალური ინფორმაცია თმის ცვენის მიზეზების და გადაწყვეტილებების შესახებ",
          imageUrl: "/images/blog/hair-loss-causes.jpg",
          category: "Saç Bakımı",
          tags: "saç dökülmesi, saç bakımı, kellik",
          author: "MyHair Clinic",
          isFeatured: true,
          isPublished: true,
          metaTitleTR: "Saç Dökülmesi Nedenleri ve Çözümleri | MyHair Clinic",
          metaTitleEN: "Hair Loss Causes and Solutions | MyHair Clinic",
          metaTitleRU: "Причины выпадения волос и решения | MyHair Clinic",
          metaTitleKA: "თმის ცვენის მიზეზები და გადაწყვეტილებები | MyHair Clinic",
          metaDescriptionTR: "Saç dökülmesinin nedenleri, türleri ve etkili tedavi yöntemleri hakkında kapsamlı bilgi edinin.",
          metaDescriptionEN: "Get comprehensive information about the causes, types, and effective treatment methods for hair loss.",
          metaDescriptionRU: "Получите исчерпывающую информацию о причинах, типах и эффективных методах лечения выпадения волос.",
          metaDescriptionKA: "მიიღეთ ამომწურავი ინფორმაცია თმის ცვენის მიზეზების, ტიპების და ეფექტური მკურნალობის მეთოდების შესახებ.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          slug: "sac-ekimi-sonrasi-bakim",
          titleTR: "Saç Ekimi Sonrası Bakım: İlk Hafta Neler Yapmalısınız?",
          titleEN: "Post-Hair Transplant Care: What Should You Do in the First Week?",
          titleRU: "Уход после пересадки волос: что вы должны делать в первую неделю?",
          titleKA: "თმის გადანერგვის შემდგომი მოვლა: რა უნდა გააკეთოთ პირველ კვირაში?",
          summaryTR: "Saç ekimi sonrası ilk haftada dikkat edilmesi gerekenler ve önerilen bakım adımları.",
          summaryEN: "Things to consider in the first week after hair transplantation and recommended care steps.",
          summaryRU: "Что нужно учитывать в первую неделю после трансплантации волос и рекомендуемые шаги по уходу.",
          summaryKA: "რა უნდა გაითვალისწინოთ თმის გადანერგვის შემდეგ პირველ კვირაში და რეკომენდებული მოვლის ნაბიჯები.",
          contentTR: "Saç ekimi sonrası ilk haftada bakım önerileri",
          contentEN: "Care recommendations in the first week after hair transplantation",
          contentRU: "Рекомендации по уходу в первую неделю после трансплантации волос",
          contentKA: "მოვლის რეკომენდაციები თმის გადანერგვის შემდეგ პირველ კვირაში",
          imageUrl: "/images/blog/post-transplant-care.jpg",
          category: "Saç Ekimi",
          tags: "saç ekimi sonrası, bakım, tedavi",
          author: "MyHair Clinic",
          isFeatured: false,
          isPublished: true,
          metaTitleTR: "Saç Ekimi Sonrası Bakım: İlk Hafta Neler Yapmalısınız? | MyHair Clinic",
          metaTitleEN: "Post-Hair Transplant Care: What Should You Do in the First Week? | MyHair Clinic",
          metaTitleRU: "Уход после пересадки волос: что вы должны делать в первую неделю? | MyHair Clinic",
          metaTitleKA: "თმის გადანერგვის შემდგომი მოვლა: რა უნდა გააკეთოთ პირველ კვირაში? | MyHair Clinic",
          metaDescriptionTR: "Saç ekimi sonrası ilk haftada dikkat edilmesi gerekenler ve doğru bakım adımları hakkında uzman önerileri.",
          metaDescriptionEN: "Expert recommendations on what to consider in the first week after hair transplantation and the right care steps.",
          metaDescriptionRU: "Рекомендации экспертов о том, что следует учитывать в первую неделю после трансплантации волос, и правильные шаги по уходу.",
          metaDescriptionKA: "ექსპერტთა რეკომენდაციები იმის შესახებ, თუ რა უნდა გაითვალისწინოთ თმის გადანერგვის შემდეგ პირველ კვირაში და სწორი მოვლის ნაბიჯები.",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      
      return res.status(200).json(samplePosts);
    }
    
    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return res.status(500).json({ message: "Failed to fetch blog posts" });
  }
};

// Get blog post by ID
export const getBlogPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, Number(id)));
    
    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    
    return res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return res.status(500).json({ message: "Failed to fetch blog post" });
  }
};

// Get blog post by slug
export const getBlogPostBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    
    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    
    return res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return res.status(500).json({ message: "Failed to fetch blog post" });
  }
};

// Create a new blog post
export const createBlogPost = async (req: Request, res: Response) => {
  try {
    // Check if slug already exists
    const { 
      slug, 
      titleTR, titleEN, titleRU, titleKA,
      contentTR, contentEN, contentRU, contentKA,
      imageUrl, 
      categoryTR, categoryEN, categoryRU, categoryKA, category,
      authorTR, authorEN, authorRU, authorKA, author,
      isFeatured, isPublished 
    } = req.body;
    
    const existingPost = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    
    if (existingPost.length > 0) {
      return res.status(400).json({ message: "A blog post with this slug already exists" });
    }
    
    // Şemaya uygun veri hazırlama
    const postData = {
      slug,
      titleTR, titleEN, titleRU, titleKA,
      // Özet değerleri içerikten oluştur (ilk 150 karakter)
      summaryTR: contentTR.substring(0, 150) + (contentTR.length > 150 ? '...' : ''),
      summaryEN: contentEN.substring(0, 150) + (contentEN.length > 150 ? '...' : ''),
      summaryRU: contentRU.substring(0, 150) + (contentRU.length > 150 ? '...' : ''),
      summaryKA: contentKA.substring(0, 150) + (contentKA.length > 150 ? '...' : ''),
      contentTR, contentEN, contentRU, contentKA,
      imageUrl,
      category: category || categoryTR || "Saç Ekimi", // Önce doğrudan category alanını kullan
      tags: req.body.tags || "",  // Varsayılan boş
      author: author || authorTR || "MyHair Clinic", // Yazar yoksa varsayılan değer
      isFeatured: isFeatured || false,
      isPublished: isPublished || false,
      // Meta alanları
      metaTitleTR: req.body.metaTitleTR || titleTR,
      metaTitleEN: req.body.metaTitleEN || titleEN,
      metaTitleRU: req.body.metaTitleRU || titleRU,
      metaTitleKA: req.body.metaTitleKA || titleKA,
      metaDescriptionTR: req.body.metaDescriptionTR || "",
      metaDescriptionEN: req.body.metaDescriptionEN || "",
      metaDescriptionRU: req.body.metaDescriptionRU || "",
      metaDescriptionKA: req.body.metaDescriptionKA || "",
      // Tarih alanları
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const newPost = await db.insert(blogPosts).values(postData).returning();
    
    return res.status(201).json(newPost[0]);
  } catch (error) {
    console.error("Error creating blog post:", error);
    return res.status(500).json({ message: "Failed to create blog post" });
  }
};

// Update a blog post
export const updateBlogPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [existingPost] = await db.select().from(blogPosts).where(eq(blogPosts.id, Number(id)));
    
    if (!existingPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    
    // Check if updating slug and if it already exists
    if (req.body.slug && req.body.slug !== existingPost.slug) {
      const slugExists = await db.select().from(blogPosts)
        .where(eq(blogPosts.slug, req.body.slug));
        
      if (slugExists.length > 0) {
        return res.status(400).json({ message: "A blog post with this slug already exists" });
      }
    }
    
    // İçerik güncellemelerini doğrudan db.update() içinde yapıyoruz
    const setData: any = {
      ...req.body,
      updatedAt: new Date()
    };

    // İçerik değişmişse özeti güncelle
    if (req.body.contentTR) {
      setData.summaryTR = req.body.contentTR.substring(0, 150) + (req.body.contentTR.length > 150 ? '...' : '');
    }
    
    if (req.body.contentEN) {
      setData.summaryEN = req.body.contentEN.substring(0, 150) + (req.body.contentEN.length > 150 ? '...' : '');
    }
    
    if (req.body.contentRU) {
      setData.summaryRU = req.body.contentRU.substring(0, 150) + (req.body.contentRU.length > 150 ? '...' : '');
    }
    
    if (req.body.contentKA) {
      setData.summaryKA = req.body.contentKA.substring(0, 150) + (req.body.contentKA.length > 150 ? '...' : '');
    }
    
    // Kategori güncelleme
    if (req.body.category) {
      setData.category = req.body.category;
    } else if (req.body.categoryTR) {
      setData.category = req.body.categoryTR;
    }
    
    // Author alanı güncelleme
    if (req.body.author) {
      setData.author = req.body.author;
    } else if (req.body.authorTR) {
      setData.author = req.body.authorTR;
    }
    
    // Dönüştürülmüş alanları kaldır
    delete setData.categoryTR;
    delete setData.categoryEN;
    delete setData.categoryRU;
    delete setData.categoryKA;
    delete setData.authorTR;
    delete setData.authorEN;
    delete setData.authorRU;
    delete setData.authorKA;
    
    const [updatedPost] = await db.update(blogPosts)
      .set(setData)
      .where(eq(blogPosts.id, Number(id)))
      .returning();
    
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating blog post:", error);
    return res.status(500).json({ message: "Failed to update blog post" });
  }
};

// Delete a blog post
export const deleteBlogPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [existingPost] = await db.select().from(blogPosts).where(eq(blogPosts.id, Number(id)));
    
    if (!existingPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    
    await db.delete(blogPosts).where(eq(blogPosts.id, Number(id)));
    
    return res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return res.status(500).json({ message: "Failed to delete blog post" });
  }
};

// Toggle featured status
export const toggleFeatured = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isFeatured } = req.body;
    
    const [existingPost] = await db.select().from(blogPosts).where(eq(blogPosts.id, Number(id)));
    
    if (!existingPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    
    const [updatedPost] = await db.update(blogPosts)
      .set({
        isFeatured: isFeatured,
        updatedAt: new Date()
      })
      .where(eq(blogPosts.id, Number(id)))
      .returning();
    
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error toggling featured status:", error);
    return res.status(500).json({ message: "Failed to update featured status" });
  }
};

// Toggle published status
export const togglePublished = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isPublished } = req.body;
    
    const [existingPost] = await db.select().from(blogPosts).where(eq(blogPosts.id, Number(id)));
    
    if (!existingPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    
    const [updatedPost] = await db.update(blogPosts)
      .set({
        isPublished: isPublished,
        updatedAt: new Date()
      })
      .where(eq(blogPosts.id, Number(id)))
      .returning();
    
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error toggling published status:", error);
    return res.status(500).json({ message: "Failed to update published status" });
  }
};

// Get count of blog posts
export const getBlogPostsCount = async (req: Request, res: Response) => {
  try {
    const posts = await db.select().from(blogPosts);
    return res.status(200).json({ count: posts.length });
  } catch (error) {
    console.error("Error counting blog posts:", error);
    return res.status(500).json({ message: "Failed to count blog posts" });
  }
};