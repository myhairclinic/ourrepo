import { Request, Response } from "express";
import { db } from "../db";
import { blogPosts } from "@shared/schema";
import { eq } from "drizzle-orm";

// Get all blog posts
export const getAllBlogPosts = async (req: Request, res: Response) => {
  try {
    const posts = await db.select().from(blogPosts).orderBy(blogPosts.createdAt);
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
    const { slug } = req.body;
    const existingPost = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    
    if (existingPost.length > 0) {
      return res.status(400).json({ message: "A blog post with this slug already exists" });
    }
    
    const newPost = await db.insert(blogPosts).values({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();
    
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
    
    const [updatedPost] = await db.update(blogPosts)
      .set({
        ...req.body,
        updatedAt: new Date()
      })
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