import { Request, Response } from "express";
import { storage } from "../storage";
import { insertBlogPostSchema } from "@shared/schema";
import { z } from "zod";

// Get all blog posts
export const getBlogPosts = async (req: Request, res: Response) => {
  try {
    const posts = await storage.getBlogPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blog posts" });
  }
};

// Get paginated blog posts
export const getPaginatedBlogPosts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const category = req.query.category as string || undefined;
    const tag = req.query.tag as string || undefined;
    const search = req.query.search as string || undefined;
    const sort = req.query.sort as string || 'newest';
    
    const result = await storage.getPaginatedBlogPosts({
      page,
      limit,
      category,
      tag,
      search,
      sort
    });
    
    res.json({
      posts: result.posts,
      totalPosts: result.totalPosts,
      totalPages: result.totalPages,
      currentPage: page
    });
  } catch (error) {
    console.error("Error fetching paginated blog posts:", error);
    res.status(500).json({ message: "Failed to fetch blog posts" });
  }
};

// Get a blog post by slug
export const getBlogPostBySlug = async (req: Request, res: Response) => {
  try {
    const post = await storage.getBlogPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blog post" });
  }
};

// Create a new blog post (admin only)
export const createBlogPost = async (req: Request, res: Response) => {
  // Check if user is authenticated admin
  if (!req.isAuthenticated() || req.user?.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  
  try {
    // Validate request body
    const validData = insertBlogPostSchema.parse(req.body);
    
    // Check if blog post with this slug already exists
    const existingPost = await storage.getBlogPostBySlug(validData.slug);
    if (existingPost) {
      return res.status(400).json({ message: "Blog post with this slug already exists" });
    }
    
    // Create blog post in storage
    const post = await storage.createBlogPost(validData);
    
    res.status(201).json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to create blog post" });
  }
};

// Update a blog post (admin only)
export const updateBlogPost = async (req: Request, res: Response) => {
  // Check if user is authenticated admin
  if (!req.isAuthenticated() || req.user?.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  
  try {
    const id = parseInt(req.params.id);
    
    // Validate request body
    const validData = insertBlogPostSchema.partial().parse(req.body);
    
    // Check if updating slug and it already exists on a different post
    if (validData.slug) {
      const existingPost = await storage.getBlogPostBySlug(validData.slug);
      if (existingPost && existingPost.id !== id) {
        return res.status(400).json({ message: "Blog post with this slug already exists" });
      }
    }
    
    // Update blog post in storage
    const post = await storage.updateBlogPost(id, validData);
    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    
    res.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to update blog post" });
  }
};

// Delete a blog post (admin only)
export const deleteBlogPost = async (req: Request, res: Response) => {
  // Check if user is authenticated admin
  if (!req.isAuthenticated() || req.user?.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  
  try {
    const id = parseInt(req.params.id);
    const result = await storage.deleteBlogPost(id);
    if (!result) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete blog post" });
  }
};
