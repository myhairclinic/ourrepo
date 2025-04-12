import React, { useState } from "react";
import {
  Star,
  CheckCircle,
  XCircle,
  Trash2,
  Edit,
  MessageCircle,
  Filter,
  ArrowLeft,
  ArrowRight,
  Mail
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Örnek yorumlar verisi
const mockReviews = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    comment: "Saç ekimi operasyonundan çok memnun kaldım. Doktor ve ekibi çok profesyoneldi. Sonuçlar beklediğimden daha iyi oldu.",
    rating: 5,
    serviceName: "Saç Ekimi",
    serviceId: 1,
    isApproved: true,
    createdAt: new Date("2025-03-15"),
    language: "TR",
    status: "published"
  },
  {
    id: 2,
    name: "John Smith",
    email: "john@example.com",
    comment: "Great experience with the hair transplant procedure. Very happy with the results after 6 months.",
    rating: 5,
    serviceName: "Hair Transplantation",
    serviceId: 1,
    isApproved: true,
    createdAt: new Date("2025-03-10"),
    language: "EN",
    status: "published"
  },
  {
    id: 3,
    name: "Мария Иванова",
    email: "maria@example.com",
    comment: "Очень доволен результатами трансплантации бороды. Рекомендую эту клинику всем.",
    rating: 4,
    serviceName: "Трансплантация Бороды",
    serviceId: 2,
    isApproved: true,
    createdAt: new Date("2025-03-05"),
    language: "RU",
    status: "published"
  },
  {
    id: 4,
    name: "გიორგი მამულაშვილი",
    email: "giorgi@example.com",
    comment: "დიდი მადლობა პროფესიონალური მომსახურებისთვის, ჩემი თმის გადანერგვის შედეგები ნამდვილად კარგია.",
    rating: 5,
    serviceName: "თმის გადანერგვა",
    serviceId: 1,
    isApproved: false,
    createdAt: new Date("2025-02-28"),
    language: "KA",
    status: "pending"
  },
  {
    id: 5,
    name: "Mehmet Demir",
    email: "mehmet@example.com",
    comment: "PRP tedavisi sonrası saçlarımda belirgin bir iyileşme gördüm. Teşekkürler MyHair Clinic!",
    rating: 4,
    serviceName: "PRP Tedavisi",
    serviceId: 4,
    isApproved: true,
    createdAt: new Date("2025-02-20"),
    language: "TR",
    status: "published"
  },
  {
    id: 6,
    name: "Emma Johnson",
    email: "emma@example.com",
    comment: "The consultation process was very informative. Still waiting to see the final results of my eyebrow transplantation.",
    rating: 3,
    serviceName: "Eyebrow Transplantation",
    serviceId: 2,
    isApproved: true,
    createdAt: new Date("2025-02-15"),
    language: "EN",
    status: "published"
  },
  {
    id: 7,
    name: "Ali Kaya",
    email: "ali@example.com",
    comment: "Kaş ekimi sonuçlarından memnun kalmadım. Beklentilerimi karşılamadı.",
    rating: 2,
    serviceName: "Kaş Ekimi",
    serviceId: 2,
    isApproved: false,
    createdAt: new Date("2025-02-10"),
    language: "TR", 
    status: "rejected"
  }
];

// Enum değerleri
const languages = [
  { id: "all", name: "Tümü" },
  { id: "TR", name: "Türkçe" },
  { id: "EN", name: "İngilizce" },
  { id: "RU", name: "Rusça" },
  { id: "KA", name: "Gürcüce" }
];

const statuses = [
  { id: "all", name: "Tümü" },
  { id: "pending", name: "Onay Bekleyen" },
  { id: "published", name: "Yayında" },
  { id: "rejected", name: "Reddedilmiş" }
];

const services = [
  { id: "all", name: "Tümü" },
  { id: 1, name: "Saç Ekimi" },
  { id: 2, name: "Kaş Ekimi" },
  { id: 3, name: "Sakal Ekimi" },
  { id: 4, name: "PRP Tedavisi" },
  { id: 5, name: "Saç Mezoterapisi" }
];

interface ReviewsManagementProps {
  // Gerekli olduğunda, gerçek veriler için prop'lar ekleyebilirsiniz
}

const ReviewsManagement: React.FC<ReviewsManagementProps> = () => {
  const [reviews, setReviews] = useState(mockReviews);
  const [filteredLanguage, setFilteredLanguage] = useState("all");
  const [filteredStatus, setFilteredStatus] = useState("all");
  const [filteredService, setFilteredService] = useState("all");
  const [filteredRating, setFilteredRating] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReview, setSelectedReview] = useState<any | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  
  const itemsPerPage = 5;

  // Filtreleme işlemi
  const filteredReviews = reviews.filter((review) => {
    const matchesLanguage = filteredLanguage === "all" || review.language === filteredLanguage;
    const matchesStatus = filteredStatus === "all" || review.status === filteredStatus;
    const matchesService = filteredService === "all" || review.serviceId === Number(filteredService);
    const matchesRating = filteredRating === null || review.rating === filteredRating;
    const matchesSearch = 
      review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesLanguage && matchesStatus && matchesService && matchesRating && matchesSearch;
  });

  // Sayfalama için
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Detay modalını aç
  const openDetailModal = (review: any) => {
    setSelectedReview(review);
    setIsDetailModalOpen(true);
  };

  // Yanıt modalını aç
  const openReplyModal = (review: any) => {
    setSelectedReview(review);
    setIsReplyModalOpen(true);
  };

  // Yorum durumunu değiştir
  const changeReviewStatus = (id: number, status: string) => {
    setReviews(
      reviews.map((review) =>
        review.id === id
          ? { 
              ...review, 
              status, 
              isApproved: status === "published" 
            }
          : review
      )
    );
  };

  // Yorumu sil
  const deleteReview = (id: number) => {
    if (window.confirm("Bu yorumu silmek istediğinizden emin misiniz?")) {
      setReviews(reviews.filter((review) => review.id !== id));
    }
  };

  // Sayfa değiştir
  const changePage = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Filtreleri temizle
  const clearFilters = () => {
    setFilteredLanguage("all");
    setFilteredStatus("all");
    setFilteredService("all");
    setFilteredRating(null);
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Yıldız gösterme bileşeni
  const RatingStars = ({ rating }: { rating: number }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Yorum Yönetimi</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">
            Toplam: {reviews.length} yorum
          </span>
          <div className="h-4 border-r border-gray-300"></div>
          <span className="text-sm font-medium text-green-600">
            Yayında: {reviews.filter(r => r.status === "published").length}
          </span>
          <div className="h-4 border-r border-gray-300"></div>
          <span className="text-sm font-medium text-orange-500">
            Bekleyen: {reviews.filter(r => r.status === "pending").length}
          </span>
        </div>
      </div>

      {/* Filtreler */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Dil:</span>
              <select
                value={filteredLanguage}
                onChange={(e) => {
                  setFilteredLanguage(e.target.value);
                  setCurrentPage(1);
                }}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              >
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Durum:</span>
              <select
                value={filteredStatus}
                onChange={(e) => {
                  setFilteredStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              >
                {statuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Hizmet:</span>
              <select
                value={filteredService}
                onChange={(e) => {
                  setFilteredService(e.target.value);
                  setCurrentPage(1);
                }}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              >
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Puan:</span>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => {
                      setFilteredRating(filteredRating === star ? null : star);
                      setCurrentPage(1);
                    }}
                    className={`p-1 rounded ${
                      filteredRating === star
                        ? "bg-yellow-100"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <Star
                      className={`w-5 h-5 ${
                        filteredRating === star || filteredRating === null
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="text-sm text-primary hover:text-blue-700 flex items-center"
            >
              <Filter className="w-4 h-4 mr-1" />
              Filtreleri Temizle
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Yorum veya isim ara..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-3 pr-4 py-2 w-full md:w-64 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      {/* Yorum Listesi */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ad/E-posta
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Yorum
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Puan
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Hizmet
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Dil
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
              {paginatedReviews.length > 0 ? (
                paginatedReviews.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">
                          {review.name}
                        </div>
                        <div className="text-xs text-gray-500">{review.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 line-clamp-2 max-w-xs">
                        {review.comment}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <RatingStars rating={review.rating} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {review.serviceName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {languages.find(l => l.id === review.language)?.name || review.language}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {review.createdAt.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          review.status === "published"
                            ? "bg-green-100 text-green-800"
                            : review.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {
                          statuses.find(s => s.id === review.status)?.name || review.status
                        }
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openDetailModal(review)}
                          className="p-1 text-blue-500 hover:text-blue-700"
                          title="Detaylar"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        
                        {review.status === "pending" && (
                          <button
                            onClick={() => changeReviewStatus(review.id, "published")}
                            className="p-1 text-green-500 hover:text-green-700"
                            title="Onayla"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        )}
                        
                        {review.status === "pending" && (
                          <button
                            onClick={() => changeReviewStatus(review.id, "rejected")}
                            className="p-1 text-orange-500 hover:text-orange-700"
                            title="Reddet"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        )}
                        
                        <button
                          onClick={() => openReplyModal(review)}
                          className="p-1 text-purple-500 hover:text-purple-700"
                          title="Yanıtla"
                        >
                          <MessageCircle className="w-5 h-5" />
                        </button>
                        
                        <button
                          onClick={() => deleteReview(review.id)}
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
                    colSpan={8}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    Gösterilecek yorum bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sayfalama */}
      {filteredReviews.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Toplam {filteredReviews.length} yorum, {(currentPage - 1) * itemsPerPage + 1} - {
              Math.min(currentPage * itemsPerPage, filteredReviews.length)
            } arası gösteriliyor
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => changePage(currentPage - 1)}
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
                onClick={() => changePage(page)}
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
              onClick={() => changePage(currentPage + 1)}
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
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Yorum Detayları</DialogTitle>
            <DialogDescription>
              Yorum detaylarını görüntüleyin ve düzenleyin.
            </DialogDescription>
          </DialogHeader>

          {selectedReview && (
            <div className="space-y-4 pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedReview.name}
                  </h3>
                  <p className="text-sm text-gray-500">{selectedReview.email}</p>
                  <div className="mt-1 flex items-center">
                    <RatingStars rating={selectedReview.rating} />
                    <span className="ml-2 text-sm text-gray-600">
                      {selectedReview.rating}/5
                    </span>
                  </div>
                </div>
                <div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      selectedReview.status === "published"
                        ? "bg-green-100 text-green-800"
                        : selectedReview.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {
                      statuses.find(s => s.id === selectedReview.status)?.name
                    }
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-800">{selectedReview.comment}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Hizmet</p>
                  <p className="text-sm text-gray-900">{selectedReview.serviceName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Tarih</p>
                  <p className="text-sm text-gray-900">
                    {selectedReview.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Dil</p>
                  <p className="text-sm text-gray-900">
                    {languages.find(l => l.id === selectedReview.language)?.name}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Durum Değiştir</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      changeReviewStatus(selectedReview.id, "published");
                      setIsDetailModalOpen(false);
                    }}
                    className={`px-3 py-1 text-xs rounded-md flex items-center ${
                      selectedReview.status === "published"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-white text-green-800 border border-green-200 hover:bg-green-50"
                    }`}
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Onayla
                  </button>
                  <button
                    onClick={() => {
                      changeReviewStatus(selectedReview.id, "pending");
                      setIsDetailModalOpen(false);
                    }}
                    className={`px-3 py-1 text-xs rounded-md flex items-center ${
                      selectedReview.status === "pending"
                        ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                        : "bg-white text-yellow-800 border border-yellow-200 hover:bg-yellow-50"
                    }`}
                  >
                    <Star className="w-3 h-3 mr-1" />
                    Bekleyen
                  </button>
                  <button
                    onClick={() => {
                      changeReviewStatus(selectedReview.id, "rejected");
                      setIsDetailModalOpen(false);
                    }}
                    className={`px-3 py-1 text-xs rounded-md flex items-center ${
                      selectedReview.status === "rejected"
                        ? "bg-red-100 text-red-800 border border-red-200"
                        : "bg-white text-red-800 border border-red-200 hover:bg-red-50"
                    }`}
                  >
                    <XCircle className="w-3 h-3 mr-1" />
                    Reddet
                  </button>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t">
                <button
                  onClick={() => {
                    deleteReview(selectedReview.id);
                    setIsDetailModalOpen(false);
                  }}
                  className="px-3 py-1 border border-red-300 text-red-600 rounded-md text-sm hover:bg-red-50"
                >
                  Yorumu Sil
                </button>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsDetailModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Kapat
                  </button>
                  <button
                    onClick={() => {
                      setIsDetailModalOpen(false);
                      openReplyModal(selectedReview);
                    }}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700"
                  >
                    Yanıtla
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Yanıt Modal */}
      <Dialog open={isReplyModalOpen} onOpenChange={setIsReplyModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Yoruma Yanıt Ver</DialogTitle>
            <DialogDescription>
              Bu yoruma e-posta ile yanıt verin.
            </DialogDescription>
          </DialogHeader>

          {selectedReview && (
            <div className="space-y-4 pt-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-900">
                    {selectedReview.name}
                  </h3>
                  <RatingStars rating={selectedReview.rating} />
                </div>
                <p className="text-sm text-gray-800">{selectedReview.comment}</p>
              </div>

              <div>
                <label
                  htmlFor="replySubject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Konu
                </label>
                <input
                  type="text"
                  id="replySubject"
                  defaultValue={`Re: ${selectedReview.serviceName} Yorumunuz Hakkında`}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="replyMessage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mesaj
                </label>
                <textarea
                  id="replyMessage"
                  rows={6}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Mesajınızı buraya yazın..."
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  onClick={() => setIsReplyModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  İptal
                </button>
                <button
                  onClick={() => {
                    // Burada gerçek e-posta gönderme işlemi yapılabilir
                    setIsReplyModalOpen(false);
                    alert(`${selectedReview.email} adresine yanıt gönderildi.`);
                  }}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 flex items-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Yanıt Gönder
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewsManagement;