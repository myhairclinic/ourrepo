import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GalleryItem } from "@shared/schema";
import { GalleryType } from "@shared/types";

export default function GalleryManager() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const { data: galleryItems, isLoading } = useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery"],
  });
  
  const filteredItems = activeFilter 
    ? galleryItems?.filter(item => item.type === activeFilter)
    : galleryItems;
  
  return (
    <div className="min-h-screen bg-neutral-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gallery Management</h1>
          <button 
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add New Image/Video
          </button>
        </div>
        
        <div className="mb-6 flex space-x-2">
          <button
            className={`px-4 py-2 rounded-md ${activeFilter === null ? 'bg-primary text-white' : 'bg-white text-neutral-700'}`}
            onClick={() => setActiveFilter(null)}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activeFilter === GalleryType.BeforeAfter ? 'bg-primary text-white' : 'bg-white text-neutral-700'}`}
            onClick={() => setActiveFilter(GalleryType.BeforeAfter)}
          >
            Before/After
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activeFilter === GalleryType.Clinic ? 'bg-primary text-white' : 'bg-white text-neutral-700'}`}
            onClick={() => setActiveFilter(GalleryType.Clinic)}
          >
            Clinic
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activeFilter === GalleryType.Video ? 'bg-primary text-white' : 'bg-white text-neutral-700'}`}
            onClick={() => setActiveFilter(GalleryType.Video)}
          >
            Videos
          </button>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">Loading gallery items...</div>
        ) : filteredItems && filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
                {item.type === GalleryType.Video ? (
                  <div className="aspect-video bg-neutral-200 flex items-center justify-center">
                    <span>Video Thumbnail</span>
                  </div>
                ) : (
                  <img 
                    src={item.imageUrl} 
                    alt={item.title || 'Gallery image'} 
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{item.title || 'Untitled'}</h3>
                  <p className="text-neutral-500 text-sm mb-4">{item.type}</p>
                  <div className="flex space-x-2">
                    <button 
                      className="text-primary hover:text-primary/80"
                      onClick={() => setEditingItem(item)}
                    >
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <p className="text-neutral-500">No gallery items found. Add your first image or video!</p>
          </div>
        )}
      </div>
      
      {/* Modals for adding/editing gallery items would go here */}
    </div>
  );
}