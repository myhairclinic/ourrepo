import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, Mail, Phone, MessageSquare, User, Clock, Badge } from "lucide-react";
import { format } from "date-fns";

type Appointment = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string | null;
  preferredDate: string | null;
  status: string;
  serviceId: number;
  createdAt: string;
  updatedAt: string;
};

type Service = {
  id: number;
  titleTR: string;
  titleEN: string;
  titleRU: string;
  titleKA: string;
};

export default function AppointmentsManager() {
  const { toast } = useToast();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Fetch appointments
  const { data: appointments, isLoading } = useQuery({
    queryKey: ["/api/appointments"],
  });

  // Fetch services
  const { data: services } = useQuery({
    queryKey: ["/api/services"],
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest("PUT", `/api/appointments/${id}`, { status });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/appointments"] });
      toast({
        title: "Durum güncellendi",
        description: "Randevu durumu başarıyla güncellendi.",
      });
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: error.message || "Durum güncellenemedi",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/appointments/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/appointments"] });
      toast({
        title: "Randevu silindi",
        description: "Randevu başarıyla silindi.",
      });
      setIsDetailsOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: error.message || "Randevu silinemedi",
        variant: "destructive",
      });
    },
  });

  const handleStatusChange = (id: number, status: string) => {
    statusMutation.mutate({ id, status });
  };

  const openDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailsOpen(true);
  };

  const deleteAppointment = (id: number) => {
    if (confirm("Bu randevuyu silmek istediğinizden emin misiniz?")) {
      deleteMutation.mutate(id);
    }
  };

  const getServiceName = (serviceId: number) => {
    if (!services) return "Yükleniyor...";
    const service = services.find((s: Service) => s.id === serviceId);
    return service ? service.titleTR : "Bilinmeyen hizmet";
  };

  // Status badge color helpers
  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-purple-100 text-purple-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusName = (status: string) => {
    switch (status) {
      case "new":
        return "Yeni";
      case "confirmed":
        return "Onaylandı";
      case "completed":
        return "Tamamlandı";
      case "cancelled":
        return "İptal Edildi";
      default:
        return status;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Randevu Yönetimi</h1>
      
      {isLoading ? (
        <div className="flex justify-center my-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : !appointments || appointments.length === 0 ? (
        <div className="text-center py-12 bg-neutral-50 rounded-lg border border-neutral-200">
          <Calendar className="h-12 w-12 mx-auto text-neutral-400 mb-4" />
          <h2 className="text-xl font-semibold text-neutral-700">Henüz randevu bulunmuyor</h2>
          <p className="text-neutral-500 mt-2">Randevu talepleri geldiğinde burada listelenecektir.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tarih</TableHead>
                <TableHead>İsim</TableHead>
                <TableHead>Hizmet</TableHead>
                <TableHead>İletişim</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment: Appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">
                    {format(new Date(appointment.createdAt), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>{appointment.name}</TableCell>
                  <TableCell>{getServiceName(appointment.serviceId)}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-neutral-500">
                      <Mail className="h-4 w-4 mr-1" />
                      <span className="truncate max-w-[120px]">{appointment.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                      {getStatusName(appointment.status)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Select
                        value={appointment.status}
                        onValueChange={(value) => handleStatusChange(appointment.id, value)}
                        disabled={statusMutation.isPending}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Durum Seç" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Yeni</SelectItem>
                          <SelectItem value="confirmed">Onaylandı</SelectItem>
                          <SelectItem value="completed">Tamamlandı</SelectItem>
                          <SelectItem value="cancelled">İptal Edildi</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => openDetails(appointment)}
                      >
                        Detaylar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Appointment Details Dialog */}
      {selectedAppointment && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Randevu Detayları</DialogTitle>
              <DialogDescription>
                Randevu ID: #{selectedAppointment.id}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 flex items-center text-neutral-500">
                  <User className="mr-2 h-4 w-4" /> İsim:
                </span>
                <span className="col-span-3 font-medium">{selectedAppointment.name}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 flex items-center text-neutral-500">
                  <Clock className="mr-2 h-4 w-4" /> Oluşturulma:
                </span>
                <span className="col-span-3">
                  {format(new Date(selectedAppointment.createdAt), "dd/MM/yyyy HH:mm")}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 flex items-center text-neutral-500">
                  <Badge className="mr-2 h-4 w-4" /> Durum:
                </span>
                <span className="col-span-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedAppointment.status)}`}>
                    {getStatusName(selectedAppointment.status)}
                  </span>
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 flex items-center text-neutral-500">
                  <Calendar className="mr-2 h-4 w-4" /> Tercih Tarihi:
                </span>
                <span className="col-span-3">
                  {selectedAppointment.preferredDate 
                    ? format(new Date(selectedAppointment.preferredDate), "dd/MM/yyyy")
                    : "Belirtilmemiş"}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 flex items-center text-neutral-500">
                  <Mail className="mr-2 h-4 w-4" /> E-posta:
                </span>
                <span className="col-span-3">{selectedAppointment.email}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="col-span-1 flex items-center text-neutral-500">
                  <Phone className="mr-2 h-4 w-4" /> Telefon:
                </span>
                <span className="col-span-3">{selectedAppointment.phone}</span>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <span className="col-span-1 flex items-center text-neutral-500 pt-1">
                  <MessageSquare className="mr-2 h-4 w-4" /> Mesaj:
                </span>
                <div className="col-span-3 border rounded-md p-3 bg-neutral-50 min-h-[80px]">
                  {selectedAppointment.message || "Mesaj yok"}
                </div>
              </div>
            </div>
            <DialogFooter className="sm:justify-between">
              <Button 
                variant="destructive" 
                onClick={() => deleteAppointment(selectedAppointment.id)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Siliniyor..." : "Randevuyu Sil"}
              </Button>
              <Button onClick={() => setIsDetailsOpen(false)}>
                Kapat
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}