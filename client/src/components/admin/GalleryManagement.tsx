import React, { useState } from "react";
import { 
  Image, 
  Upload, 
  Trash2, 
  Edit, 
  CheckCircle, 
  XCircle, 
  ArrowLeft,
  ArrowRight,
  Plus,
  Grid,
  List,
  Filter
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Örnek galeri verisi
const mockGalleryItems = [
  {
    id: 1,
    title: "Saç Ekimi Başarılı Sonuç",
    type: "beforeAfter",
    category: "hair-transplant",
    imageUrl: "/images/gallery/hair-transplant-result-1.jpg",
    beforeImageUrl: "/images/gallery/hair-transplant-before-1.jpg",
    afterImageUrl: "/images/gallery/hair-transplant-after-1.jpg",
    isActive: true,
    createdAt: new Date("2025-04-01"),
  },
  {
    id: 2,
    title: "Kliniğimizden Görüntüler",
    type: "image",
    category: "clinic",
    imageUrl: "/images/gallery/clinic-interior-1.jpg",
    isActive: true,
    createdAt: new Date("2025-04-02"),
  },
  {
    id: 3,
    title: "Hasta Memnuniyeti Video",
    type: "video",
    category: "testimonial",
    imageUrl: "/images/gallery/video-thumbnail-1.jpg",
    videoUrl: "https://example.com/videos/testimonial-1.mp4",
    isActive: true,
    createdAt: new Date("2025-04-03"),
  },
  {
    id: 4,
    title: "Sakal Ekimi Sonuçları",
    type: "beforeAfter",
    category: "beard-transplant",
    imageUrl: "/images/gallery/beard-transplant-result-1.jpg",
    beforeImageUrl: "/images/gallery/beard-transplant-before-1.jpg",
    afterImageUrl: "/images/gallery/beard-transplant-after-1.jpg",
    isActive: true,
    createdAt: new Date("2025-04-04"),
  },
  {
    id: 5,
    title: "Saç Ekimi Operasyonu",
    type: "image",
    category: "procedure",
    imageUrl: "/images/gallery/procedure-1.jpg",
    isActive: true,
    createdAt: new Date("2025-04-05"),
  },
  {
    id: 6,
    title: "Doktor Görüşmesi",
    type: "video",
    category: "doctor",
    imageUrl: "/images/gallery/video-thumbnail-2.jpg",
    videoUrl: "https://example.com/videos/doctor-interview-1.mp4",
    isActive: false,
    createdAt: new Date("2025-04-06"),
  },
];

// Galeri kategorileri
const categories = [
  { id: "all", label: "Tümü" },
  { id: "hair-transplant", label: "Saç Ekimi" },
  { id: "beard-transplant", label: "Sakal Ekimi" },
  { id: "clinic", label: "Klinik" },
  { id: "testimonial", label: "Hasta Yorumları" },
  { id: "procedure", label: "Operasyon" },
  { id: "doctor", label: "Doktor" },
];

// Galeri türleri
const types = [
  { id: "all", label: "Tümü" },
  { id: "image", label: "Görsel" },
  { id: "video", label: "Video" },
  { id: "beforeAfter", label: "Öncesi/Sonrası" },
];

interface GalleryManagementProps {
  // Gerekli olduğunda, gerçek veriler için prop'lar ekleyebilirsiniz
}

const GalleryManagement: React.FC<GalleryManagementProps> = () => {
  const [galleryItems, setGalleryItems] = useState(mockGalleryItems);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filtreleme işlevi
  const filteredItems = galleryItems.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesType = selectedType === "all" || item.type === selectedType;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesType && matchesSearch;
  });

  // Sayfalama için
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Detail modal işlemleri
  const openDetailModal = (item: any) => {
    setSelectedItem(item);
    setIsDetailModalOpen(true);
  };

  // Öğe silme işlemi
  const handleDeleteItem = (id: number) => {
    if (window.confirm("Bu öğeyi silmek istediğinizden emin misiniz?")) {
      setGalleryItems(galleryItems.filter((item) => item.id !== id));
    }
  };

  // Öğe aktiflik durumunu değiştirme
  const toggleItemStatus = (id: number) => {
    setGalleryItems(
      galleryItems.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  // Sayfa değiştirme işlevi
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Galeri Yönetimi</h2>
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Upload className="w-4 h-4 mr-2" />
          Yeni Dosya Ekle
        </button>
      </div>

      {/* Filtreler ve Arama */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-gray-700">Kategori:</span>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>

            <span className="text-sm font-medium text-gray-700">Tür:</span>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setCurrentPage(1);
              }}
              className="p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            >
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedType("all");
                setSearchQuery("");
                setCurrentPage(1);
              }}
              className="text-sm text-primary hover:text-blue-700 flex items-center"
            >
              <Filter className="w-4 h-4 mr-1" />
              Filtreleri Temizle
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Galeri içeriği ara..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-3 pr-4 py-2 w-full md:w-64 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>

            <div className="flex border rounded-lg overflow-hidden">
              <button
                className={`p-2 ${
                  viewMode === "grid" ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                className={`p-2 ${
                  viewMode === "list" ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setViewMode("list")}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Galeri Listesi */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedItems.length > 0 ? (
            paginatedItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <button
                      onClick={() => openDetailModal(item)}
                      className="p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100"
                      title="Detaylar"
                    >
                      <Edit className="w-4 h-4 text-blue-500" />
                    </button>
                    <button
                      onClick={() => toggleItemStatus(item.id)}
                      className="p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100"
                      title={item.isActive ? "Pasifleştir" : "Aktifleştir"}
                    >
                      {item.isActive ? (
                        <XCircle className="w-4 h-4 text-orange-500" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100"
                      title="Sil"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                  {item.type === "video" && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 rounded-md text-xs">
                      Video
                    </div>
                  )}
                  {item.type === "beforeAfter" && (
                    <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-0.5 rounded-md text-xs">
                      Öncesi/Sonrası
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        item.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.isActive ? "Aktif" : "Pasif"}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3
                    className="font-medium text-gray-900 truncate text-sm"
                    title={item.title}
                  >
                    {item.title}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {
                        categories.find((c) => c.id === item.category)?.label ||
                        item.category
                      }
                    </span>
                    <span className="text-xs text-gray-500">
                      {item.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center h-40 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500">Gösterilecek öğe bulunamadı.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Görsel
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Başlık
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tür
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Kategori
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tarih
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Durum
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedItems.length > 0 ? (
                  paginatedItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex-shrink-0 h-12 w-12 rounded-md overflow-hidden">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="h-12 w-12 object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                          {item.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {
                            types.find((t) => t.id === item.type)?.label ||
                            item.type
                          }
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded text-center">
                          {
                            categories.find((c) => c.id === item.category)
                              ?.label || item.category
                          }
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.createdAt.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            item.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.isActive ? "Aktif" : "Pasif"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openDetailModal(item)}
                            className="p-1 text-blue-500 hover:text-blue-700"
                            title="Detaylar"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => toggleItemStatus(item.id)}
                            className={`p-1 ${
                              item.isActive
                                ? "text-orange-500 hover:text-orange-700"
                                : "text-green-500 hover:text-green-700"
                            }`}
                            title={
                              item.isActive ? "Pasifleştir" : "Aktifleştir"
                            }
                          >
                            {item.isActive ? (
                              <XCircle className="w-5 h-5" />
                            ) : (
                              <CheckCircle className="w-5 h-5" />
                            )}
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-1 text-red-500 hover:text-red-700"
                            title="Sil"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      Gösterilecek öğe bulunamadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sayfalama */}
      {filteredItems.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Toplam {filteredItems.length} öğe
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded-md text-sm flex items-center ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-50"
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Önceki
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 border rounded-md text-sm ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : "hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border rounded-md text-sm flex items-center ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-50"
              }`}
            >
              Sonraki
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}

      {/* Detay Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Galeri Öğesi Detayları</DialogTitle>
            <DialogDescription>
              Galeri öğesinin detaylarını görüntüleyin ve düzenleyin.
            </DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Önizleme</h3>
                  <div className="mt-2 border rounded-md overflow-hidden">
                    <img
                      src={selectedItem.imageUrl}
                      alt={selectedItem.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  
                  {selectedItem.type === "beforeAfter" && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Öncesi</h4>
                        <div className="mt-1 border rounded-md overflow-hidden">
                          <img
                            src={selectedItem.beforeImageUrl}
                            alt="Before"
                            className="w-full h-24 object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Sonrası</h4>
                        <div className="mt-1 border rounded-md overflow-hidden">
                          <img
                            src={selectedItem.afterImageUrl}
                            alt="After"
                            className="w-full h-24 object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900">Öğe Bilgileri</h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Başlık
                      </label>
                      <input
                        type="text"
                        id="title"
                        defaultValue={selectedItem.title}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Kategori
                      </label>
                      <select
                        id="category"
                        defaultValue={selectedItem.category}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      >
                        {categories.slice(1).map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="type"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tür
                      </label>
                      <select
                        id="type"
                        defaultValue={selectedItem.type}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        disabled
                      >
                        {types.slice(1).map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        Tür değiştirilemez. Farklı bir tür için yeni bir öğe ekleyin.
                      </p>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isActive"
                        defaultChecked={selectedItem.isActive}
                        className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary"
                      />
                      <label
                        htmlFor="isActive"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Aktif
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  İptal
                </button>
                <button
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700"
                >
                  Kaydet
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Yükleme Modal */}
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Yeni Galeri Öğesi Ekle</DialogTitle>
            <DialogDescription>
              Galeriye yeni görsel, video veya öncesi/sonrası görseli ekleyin.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            <div>
              <label
                htmlFor="uploadType"
                className="block text-sm font-medium text-gray-700"
              >
                Yüklenecek Öğenin Türü
              </label>
              <select
                id="uploadType"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="image">Görsel</option>
                <option value="video">Video</option>
                <option value="beforeAfter">Öncesi/Sonrası Görseli</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="uploadTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Başlık
              </label>
              <input
                type="text"
                id="uploadTitle"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Galeri öğesi başlığı"
              />
            </div>

            <div>
              <label
                htmlFor="uploadCategory"
                className="block text-sm font-medium text-gray-700"
              >
                Kategori
              </label>
              <select
                id="uploadCategory"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                {categories.slice(1).map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-md font-medium text-gray-900">Dosya Yükleme</h3>
              <div className="mt-2">
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Dosyaları buraya sürükleyin veya seçin
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF, MP4 dosyaları desteklenmektedir
                    </p>
                  </div>
                  <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Dosya Seç
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="uploadIsActive"
                defaultChecked={true}
                className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary"
              />
              <label
                htmlFor="uploadIsActive"
                className="ml-2 block text-sm text-gray-700"
              >
                Aktif olarak yayınla
              </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                onClick={() => {
                  setIsUploadModalOpen(false);
                  // Burada yeni öğenin eklendiğine dair bilgi gösterilabilir
                }}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700"
              >
                Yükle
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryManagement;