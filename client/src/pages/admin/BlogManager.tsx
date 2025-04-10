import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@shared/schema";

export default function BlogManager() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });
  
  return (
    <div className="min-h-screen bg-neutral-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
          <button 
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add New Post
          </button>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">Loading blog posts...</div>
        ) : posts && posts.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{post.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{post.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(post.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        className="text-primary hover:text-primary/80 mr-4"
                        onClick={() => setEditingPost(post)}
                      >
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <p className="text-neutral-500">No blog posts found. Create your first post!</p>
          </div>
        )}
      </div>
      
      {/* Modals for adding/editing blog posts would go here */}
    </div>
  );
}