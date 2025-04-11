import { Request, Response } from 'express';
import { db } from '../db';
import { 
  services, 
  blogPosts, 
  packages, 
  products, 
  appointments, 
  messages, 
  userReviews as reviews,
  faqs,
  aftercareGuides
} from '@shared/schema';
import { and, count, eq, gte, sql } from 'drizzle-orm';

// Get count of services
export async function getServicesCount(req: Request, res: Response) {
  try {
    const result = await db.select({ count: count() }).from(services).where(eq(services.isActive, true));
    res.json({ count: result[0].count });
  } catch (error) {
    console.error('Error fetching services count:', error);
    res.status(500).json({ message: 'Error fetching services count' });
  }
}

// Get count of blog posts
export async function getBlogPostsCount(req: Request, res: Response) {
  try {
    const result = await db.select({ count: count() }).from(blogPosts).where(eq(blogPosts.isPublished, true));
    res.json({ count: result[0].count });
  } catch (error) {
    console.error('Error fetching blog posts count:', error);
    res.status(500).json({ message: 'Error fetching blog posts count' });
  }
}

// Get count of packages
export async function getPackagesCount(req: Request, res: Response) {
  try {
    const result = await db.select({ count: count() }).from(packages).where(eq(packages.isActive, true));
    res.json({ count: result[0].count });
  } catch (error) {
    console.error('Error fetching packages count:', error);
    res.status(500).json({ message: 'Error fetching packages count' });
  }
}

// Get count of products
export async function getProductsCount(req: Request, res: Response) {
  try {
    const result = await db.select({ count: count() }).from(products).where(eq(products.isActive, true));
    res.json({ count: result[0].count });
  } catch (error) {
    console.error('Error fetching products count:', error);
    res.status(500).json({ message: 'Error fetching products count' });
  }
}

// Get count of appointments (pending)
export async function getAppointmentsCount(req: Request, res: Response) {
  try {
    const result = await db.select({ count: count() }).from(appointments).where(eq(appointments.status, 'pending'));
    res.json({ count: result[0].count });
  } catch (error) {
    console.error('Error fetching appointments count:', error);
    res.status(500).json({ message: 'Error fetching appointments count' });
  }
}

// Get count of unread messages
export async function getMessagesCount(req: Request, res: Response) {
  try {
    const result = await db.select({ count: count() }).from(messages).where(eq(messages.isRead, false));
    res.json({ count: result[0].count });
  } catch (error) {
    console.error('Error fetching messages count:', error);
    res.status(500).json({ message: 'Error fetching messages count' });
  }
}

// Get count of unapproved reviews
export async function getReviewsCount(req: Request, res: Response) {
  try {
    const result = await db.select({ count: count() }).from(reviews).where(eq(reviews.isApproved, false));
    res.json({ count: result[0].count });
  } catch (error) {
    console.error('Error fetching reviews count:', error);
    res.status(500).json({ message: 'Error fetching reviews count' });
  }
}

// Get count of FAQs
export async function getFaqsCount(req: Request, res: Response) {
  try {
    const result = await db.select({ count: count() }).from(faqs).where(eq(faqs.isActive, true));
    res.json({ count: result[0].count });
  } catch (error) {
    console.error('Error fetching FAQs count:', error);
    res.status(500).json({ message: 'Error fetching FAQs count' });
  }
}

// Get count of aftercare guides
export async function getAftercareGuidesCount(req: Request, res: Response) {
  try {
    const result = await db.select({ count: count() }).from(aftercareGuides);
    res.json({ count: result[0].count });
  } catch (error) {
    console.error('Error fetching aftercare guides count:', error);
    res.status(500).json({ message: 'Error fetching aftercare guides count' });
  }
}

// Get analytics data for dashboard
export async function getAnalyticsData(req: Request, res: Response) {
  try {
    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Get date 30 days ago
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // New appointments in last 30 days
    const newAppointments = await db.select({ count: count() })
      .from(appointments)
      .where(gte(appointments.createdAt, thirtyDaysAgo));
    
    // New reviews in last 30 days
    const newReviews = await db.select({ count: count() })
      .from(reviews)
      .where(gte(reviews.createdAt, thirtyDaysAgo));
    
    // New messages in last 30 days
    const newMessages = await db.select({ count: count() })
      .from(messages)
      .where(gte(messages.createdAt, thirtyDaysAgo));
    
    // Most requested services
    const popularServices = await db
      .select({
        serviceId: appointments.serviceId,
        count: count(),
      })
      .from(appointments)
      .where(gte(appointments.createdAt, thirtyDaysAgo))
      .groupBy(appointments.serviceId)
      .orderBy(sql`count DESC`)
      .limit(5);
    
    // Get service details for the popular services
    const serviceDetails = await Promise.all(
      popularServices.map(async (item) => {
        const service = await db
          .select({ id: services.id, titleTR: services.titleTR })
          .from(services)
          .where(eq(services.id, item.serviceId))
          .limit(1);
        
        return {
          id: service[0]?.id || item.serviceId,
          name: service[0]?.titleTR || `Service ${item.serviceId}`,
          count: item.count,
        };
      })
    );
    
    // Calculate percentages
    const totalRequests = popularServices.reduce((sum, item) => sum + Number(item.count), 0);
    const servicesWithPercentages = serviceDetails.map(service => ({
      ...service,
      percentage: totalRequests > 0 ? Math.round((Number(service.count) / totalRequests) * 100) : 0
    }));
    
    res.json({
      newAppointments: newAppointments[0].count,
      newReviews: newReviews[0].count,
      newMessages: newMessages[0].count,
      popularServices: servicesWithPercentages
    });
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    res.status(500).json({ message: 'Error fetching analytics data' });
  }
}

// Get recent activity for dashboard
export async function getRecentActivity(req: Request, res: Response) {
  try {
    // Recent appointments (last 5)
    const recentAppointments = await db
      .select({
        id: appointments.id,
        type: sql<string>`'appointment'`,
        name: appointments.name,
        createdAt: appointments.createdAt,
        status: appointments.status
      })
      .from(appointments)
      .orderBy(sql`appointments.created_at DESC`)
      .limit(5);
    
    // Recent messages (last 5)
    const recentMessages = await db
      .select({
        id: messages.id,
        type: sql<string>`'message'`,
        name: messages.name,
        createdAt: messages.createdAt,
        status: sql<string>`CASE WHEN messages.is_read THEN 'read' ELSE 'unread' END`
      })
      .from(messages)
      .orderBy(sql`messages.created_at DESC`)
      .limit(5);
    
    // Recent reviews (last 5)
    const recentReviews = await db
      .select({
        id: reviews.id,
        type: sql<string>`'review'`,
        name: reviews.name,
        createdAt: reviews.createdAt,
        status: sql<string>`CASE WHEN reviews.is_approved THEN 'approved' ELSE 'pending' END`
      })
      .from(reviews)
      .orderBy(sql`reviews.created_at DESC`)
      .limit(5);
    
    // Combine and sort by createdAt
    const allActivity = [...recentAppointments, ...recentMessages, ...recentReviews]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);
    
    // Format the timestamps as relative time
    const formattedActivity = allActivity.map(item => {
      const now = new Date();
      const createdAt = new Date(item.createdAt);
      const diffMs = now.getTime() - createdAt.getTime();
      const diffMins = Math.round(diffMs / (1000 * 60));
      const diffHours = Math.round(diffMs / (1000 * 60 * 60));
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
      
      let formattedDate;
      if (diffMins < 60) {
        formattedDate = `${diffMins} dakika önce`;
      } else if (diffHours < 24) {
        formattedDate = `${diffHours} saat önce`;
      } else {
        formattedDate = `${diffDays} gün önce`;
      }
      
      return {
        ...item,
        date: formattedDate
      };
    });
    
    res.json(formattedActivity);
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    res.status(500).json({ message: 'Error fetching recent activity' });
  }
}