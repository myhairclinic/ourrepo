import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import { Loader2, CheckCircle, XCircle, Trash } from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { apiRequest } from "@/lib/queryClient";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ReviewsManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedService, setSelectedService] = useState<number | null>(null);

  // Get services for filtering
  const { data: services } = useQuery({
    queryKey: ["/api/services"],
    queryFn: async () => {
      const res = await fetch("/api/services");
      return await res.json();
    },
  });

  // Get reviews
  const { data: reviews, isLoading: isLoadingReviews } = useQuery({
    queryKey: ["/api/reviews"],
    queryFn: async () => {
      const res = await fetch("/api/reviews");
      return await res.json();
    },
  });

  // Approve/Reject a review
  const approvalMutation = useMutation({
    mutationFn: async ({ id, isApproved }: { id: number; isApproved: boolean }) => {
      const res = await apiRequest("PUT", `/api/reviews/${id}/approve`, { isApproved });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      toast({
        title: "Başarılı",
        description: "Yorum durumu başarıyla güncellendi",
      });
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: `Yorum durumu güncellenirken bir hata oluştu: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Delete a review
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      toast({
        title: "Başarılı",
        description: "Yorum başarıyla silindi",
      });
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: `Yorum silinirken bir hata oluştu: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Handle approving a review
  const handleApprove = (id: number) => {
    approvalMutation.mutate({ id, isApproved: true });
  };

  // Handle rejecting a review
  const handleReject = (id: number) => {
    approvalMutation.mutate({ id, isApproved: false });
  };

  // Handle deleting a review
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  // Filter reviews by selected service
  const filteredReviews = selectedService
    ? reviews?.filter((review: any) => review.serviceId === selectedService)
    : reviews;

  return (
    <AdminLayout>
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Müşteri Yorumları Yönetimi</h1>
        
        {/* Service filter */}
        <div className="mb-6">
          <Select
            value={selectedService?.toString() || ""}
            onValueChange={(value) => setSelectedService(value ? parseInt(value) : null)}
          >
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Tüm yorumları göster" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tüm yorumları göster</SelectItem>
              {services?.map((service: any) => (
                <SelectItem key={service.id} value={service.id.toString()}>
                  {service.titleTR}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoadingReviews ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Müşteri</TableHead>
                  <TableHead>Servis</TableHead>
                  <TableHead>Değerlendirme</TableHead>
                  <TableHead>Yorum</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews?.length > 0 ? (
                  filteredReviews?.map((review: any) => {
                    const service = services?.find((s: any) => s.id === review.serviceId);
                    return (
                      <TableRow key={review.id}>
                        <TableCell>{review.id}</TableCell>
                        <TableCell>
                          <div className="font-medium">{review.name}</div>
                          <div className="text-sm text-muted-foreground">{review.email}</div>
                        </TableCell>
                        <TableCell>
                          {service ? service.titleTR : "Genel Yorum"}
                        </TableCell>
                        <TableCell>
                          {review.rating ? `${review.rating}/5` : "-"}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{review.comment}</TableCell>
                        <TableCell>{formatDate(review.createdAt)}</TableCell>
                        <TableCell>
                          {review.isApproved ? (
                            <Badge variant="success">Onaylandı</Badge>
                          ) : (
                            <Badge variant="destructive">Bekliyor</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {!review.isApproved && (
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleApprove(review.id)}
                                title="Yorumu onayla"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                            {review.isApproved && (
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleReject(review.id)}
                                title="Onayı kaldır"
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            )}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="icon" title="Yorumu sil">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Yorumu Sil</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Bu yorumu silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>İptal</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(review.id)}>
                                    Sil
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10">
                      Henüz yorum bulunmuyor
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ReviewsManager;