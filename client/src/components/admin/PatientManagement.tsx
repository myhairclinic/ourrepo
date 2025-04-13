import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { 
  UserPlus, Edit, Trash2, Search, ChevronDown, 
  ChevronLeft, ChevronRight, FileText, Folder,
  Upload, Clock, Calendar, RotateCcw, CheckCircle,
  ListFilter, LayoutGrid, Users, ClipboardList, BadgeCheck,
  ImageIcon, EyeOff
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Form şemaları
const patientFormSchema = z.object({
  id: z.number().optional(),
  fullName: z.string().min(3, { message: "İsim en az 3 karakter olmalıdır." }),
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz." }).nullable().optional(),
  phone: z.string().min(6, { message: "Geçerli bir telefon numarası giriniz." }),
  dateOfBirth: z.string().nullable().optional(),
  gender: z.string().nullable().optional(),
  nationality: z.string().nullable().optional(),
  passportNumber: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  medicalHistory: z.string().nullable().optional(),
  serviceId: z.number().nullable().optional(),
  notes: z.string().nullable().optional(),
  status: z.string().default("active"),
  lastVisitDate: z.string().nullable().optional(),
});

const documentFormSchema = z.object({
  id: z.number().optional(),
  patientId: z.number(),
  documentType: z.string(),
  fileName: z.string(),
  fileUrl: z.string(),
  description: z.string().nullable().optional(),
  isConfidential: z.boolean().default(false),
});

const treatmentFormSchema = z.object({
  id: z.number().optional(),
  patientId: z.number(),
  treatmentDate: z.string(),
  doctorName: z.string(),
  procedureDetails: z.string(),
  serviceId: z.number().nullable().optional(),
  notes: z.string().nullable().optional(),
  status: z.string().default("completed"),
  followUpDate: z.string().nullable().optional(),
  // Yeni alanlar
  graftsCount: z.number().nullable().optional(),
  treatmentArea: z.string().nullable().optional(),
  technicUsed: z.string().nullable().optional(),
  medicationsProvided: z.string().nullable().optional(),
  complicationNotes: z.string().nullable().optional(),
  nextTreatmentDate: z.string().nullable().optional(),
  progressRating: z.number().nullable().optional(),
});

const progressImageFormSchema = z.object({
  id: z.number().optional(),
  patientId: z.number(),
  imageFile: z.instanceof(File).optional(),
  imageUrl: z.string().optional(),
  captureDate: z.string(),
  stage: z.string(),
});

type PatientFormValues = z.infer<typeof patientFormSchema>;
type DocumentFormValues = z.infer<typeof documentFormSchema>;
type TreatmentFormValues = z.infer<typeof treatmentFormSchema>;
type ProgressImageFormValues = z.infer<typeof progressImageFormSchema>;

const PatientManagement = () => {
  const [activeTab, setActiveTab] = useState("all-patients");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isNewPatientDialogOpen, setIsNewPatientDialogOpen] = useState(false);
  const [isNewDocumentDialogOpen, setIsNewDocumentDialogOpen] = useState(false);
  const [isNewTreatmentDialogOpen, setIsNewTreatmentDialogOpen] = useState(false);
  const [isNewProgressImageDialogOpen, setIsNewProgressImageDialogOpen] = useState(false);
  const [isDeleteConfirmDialogOpen, setIsDeleteConfirmDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ type: string; id: number } | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list"); // Görünüm modu: liste veya grid
  const [nationalityFilter, setNationalityFilter] = useState("all"); // Uyruk filtresi ekledik
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const itemsPerPage = 10;
  
  // Helper function to extract appointment ID from patient notes
  const extractAppointmentId = useCallback((patientNotes: string | null): number | null => {
    if (!patientNotes) return null;
    
    const match = patientNotes.match(/Randevu ID: (\d+)/);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
    return null;
  }, []);
  
  // Form tanımlamaları
  const patientForm = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      fullName: "",
      email: null,
      phone: "",
      dateOfBirth: null,
      gender: null,
      nationality: null,
      passportNumber: null,
      address: null,
      city: null,
      country: null,
      medicalHistory: null,
      serviceId: null,
      notes: null,
      status: "active",
      lastVisitDate: null,
    }
  });
  
  const documentForm = useForm<DocumentFormValues>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: {
      documentType: "",
      fileName: "",
      fileUrl: "",
      description: null,
      isConfidential: false,
    }
  });
  
  const treatmentForm = useForm<TreatmentFormValues>({
    resolver: zodResolver(treatmentFormSchema),
    defaultValues: {
      treatmentDate: "",
      doctorName: "",
      procedureDetails: "",
      serviceId: null,
      notes: null,
      status: "completed",
      followUpDate: null,
      // Yeni alanlar için varsayılan değerler
      graftsCount: null,
      treatmentArea: null,
      technicUsed: null,
      medicationsProvided: null,
      complicationNotes: null,
      nextTreatmentDate: null,
      progressRating: null,
    }
  });
  
  const progressImageForm = useForm<ProgressImageFormValues>({
    resolver: zodResolver(progressImageFormSchema),
    defaultValues: {
      imageUrl: "",
      captureDate: new Date().toISOString().split('T')[0],
      stage: "pre-op"
    }
  });
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // QUERIES
  const { data: patients, isLoading: isPatientsLoading, refetch: refetchPatients } = useQuery({
    queryKey: ["/api/patients"],
    queryFn: async () => {
      try {
        console.log("Fetching patients data...");
        const res = await fetch("/api/patients");
        if (!res.ok) {
          console.error(`HTTP error fetching patients: ${res.status} - ${res.statusText}`);
          return []; // Hata durumunda boş dizi döndür
        }
        const data = await res.json();
        console.log(`Fetched ${data.length} patients`);
        return data;
      } catch (error) {
        console.error("Error fetching patients:", error);
        return []; // Hata durumunda boş dizi döndür
      }
    }
  });
  
  const { data: services } = useQuery({
    queryKey: ["/api/services"],
    queryFn: async () => {
      const res = await fetch("/api/services");
      if (!res.ok) return [];
      return res.json();
    }
  });
  
  const { data: patientDocuments, isLoading: isDocumentsLoading, refetch: refetchDocuments } = useQuery({
    queryKey: ["/api/patients", selectedPatient?.id, "documents"],
    queryFn: async () => {
      if (!selectedPatient?.id) return [];
      const res = await fetch(`/api/patients/${selectedPatient.id}/documents`);
      if (!res.ok) {
        throw new Error("Hasta belgeleri getirilirken bir hata oluştu.");
      }
      return res.json();
    },
    enabled: !!selectedPatient?.id,
  });
  
  // Hasta otomatik oluşturulduğunda ilişkili randevu bilgilerini almak için
  const { data: relatedAppointment, isLoading: isAppointmentLoading } = useQuery({
    queryKey: ["/api/appointments", selectedPatient?.notes && extractAppointmentId(selectedPatient.notes)],
    queryFn: async () => {
      if (!selectedPatient?.notes) return null;
      const appointmentId = extractAppointmentId(selectedPatient.notes);
      if (!appointmentId) return null;
      
      const res = await fetch(`/api/appointments/${appointmentId}`);
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error("İlişkili randevu bilgileri getirilirken bir hata oluştu.");
      }
      return res.json();
    },
    enabled: !!(selectedPatient?.notes && selectedPatient.notes.includes("Otomatik oluşturuldu. Randevu ID:")),
  });
  
  const { data: treatmentRecords, isLoading: isTreatmentsLoading, refetch: refetchTreatments } = useQuery({
    queryKey: ["/api/patients", selectedPatient?.id, "treatments"],
    queryFn: async () => {
      if (!selectedPatient?.id) return [];
      const res = await fetch(`/api/patients/${selectedPatient.id}/treatments`);
      if (!res.ok) {
        throw new Error("Tedavi kayıtları getirilirken bir hata oluştu.");
      }
      return res.json();
    },
    enabled: !!selectedPatient?.id,
  });
  
  const { data: progressImages, isLoading: isProgressImagesLoading, refetch: refetchProgressImages } = useQuery({
    queryKey: ["/api/patients", selectedPatient?.id, "progress-images"],
    queryFn: async () => {
      if (!selectedPatient?.id) return [];
      const res = await fetch(`/api/patients/${selectedPatient.id}/progress-images`);
      if (!res.ok) {
        throw new Error("İlerleme görselleri getirilirken bir hata oluştu.");
      }
      return res.json();
    },
    enabled: !!selectedPatient?.id,
  });
  
  // MUTATIONS
  const createPatientMutation = useMutation({
    mutationFn: async (data: PatientFormValues) => {
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        throw new Error("Hasta oluşturulurken bir hata oluştu.");
      }
      
      return res.json();
    },
    onSuccess: () => {
      setIsNewPatientDialogOpen(false);
      patientForm.reset();
      refetchPatients();
      toast({
        title: "Başarılı",
        description: "Hasta başarıyla oluşturuldu.",
      });
    },
    onError: (error) => {
      console.error("Hasta oluşturma hatası:", error);
      toast({
        title: "Hata",
        description: "Hasta oluşturulurken bir hata oluştu.",
        variant: "destructive",
      });
    },
  });
  
  const updatePatientMutation = useMutation({
    mutationFn: async (data: PatientFormValues) => {
      const { id, ...rest } = data;
      const res = await fetch(`/api/patients/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rest),
      });
      
      if (!res.ok) {
        throw new Error("Hasta güncellenirken bir hata oluştu.");
      }
      
      return res.json();
    },
    onSuccess: () => {
      setIsNewPatientDialogOpen(false);
      patientForm.reset();
      refetchPatients();
      toast({
        title: "Başarılı",
        description: "Hasta bilgileri başarıyla güncellendi.",
      });
    },
    onError: (error) => {
      console.error("Hasta güncelleme hatası:", error);
      toast({
        title: "Hata",
        description: "Hasta güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
    },
  });
  
  const deletePatientMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/patients/${id}`, {
        method: "DELETE",
      });
      
      if (!res.ok) {
        throw new Error("Hasta silinirken bir hata oluştu.");
      }
      
      return res.json();
    },
    onSuccess: () => {
      setIsDeleteConfirmDialogOpen(false);
      setItemToDelete(null);
      
      if (selectedPatient?.id === itemToDelete?.id) {
        setSelectedPatient(null);
      }
      
      refetchPatients();
      toast({
        title: "Başarılı",
        description: "Hasta başarıyla silindi.",
      });
    },
    onError: (error) => {
      console.error("Hasta silme hatası:", error);
      toast({
        title: "Hata",
        description: "Hasta silinirken bir hata oluştu.",
        variant: "destructive",
      });
    },
  });
  
  const createDocumentMutation = useMutation({
    mutationFn: async (data: DocumentFormValues) => {
      const res = await fetch(`/api/patients/${data.patientId}/documents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        throw new Error("Belge oluşturulurken bir hata oluştu.");
      }
      
      return res.json();
    },
    onSuccess: () => {
      setIsNewDocumentDialogOpen(false);
      documentForm.reset();
      refetchDocuments();
      toast({
        title: "Başarılı",
        description: "Belge başarıyla eklendi.",
      });
    },
    onError: (error) => {
      console.error("Belge oluşturma hatası:", error);
      toast({
        title: "Hata",
        description: "Belge oluşturulurken bir hata oluştu.",
        variant: "destructive",
      });
    },
  });
  
  const deleteDocumentMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/documents/${id}`, {
        method: "DELETE",
      });
      
      if (!res.ok) {
        throw new Error("Belge silinirken bir hata oluştu.");
      }
      
      return res.json();
    },
    onSuccess: () => {
      setIsDeleteConfirmDialogOpen(false);
      setItemToDelete(null);
      refetchDocuments();
      toast({
        title: "Başarılı",
        description: "Belge başarıyla silindi.",
      });
    },
    onError: (error) => {
      console.error("Belge silme hatası:", error);
      toast({
        title: "Hata",
        description: "Belge silinirken bir hata oluştu.",
        variant: "destructive",
      });
    },
  });
  
  const createTreatmentMutation = useMutation({
    mutationFn: async (data: TreatmentFormValues) => {
      const res = await fetch(`/api/patients/${data.patientId}/treatments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        throw new Error("Tedavi kaydı oluşturulurken bir hata oluştu.");
      }
      
      return res.json();
    },
    onSuccess: () => {
      setIsNewTreatmentDialogOpen(false);
      treatmentForm.reset();
      refetchTreatments();
      toast({
        title: "Başarılı",
        description: "Tedavi kaydı başarıyla oluşturuldu.",
      });
    },
    onError: (error) => {
      console.error("Tedavi kaydı oluşturma hatası:", error);
      toast({
        title: "Hata",
        description: "Tedavi kaydı oluşturulurken bir hata oluştu.",
        variant: "destructive",
      });
    },
  });
  
  const deleteTreatmentMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/treatments/${id}`, {
        method: "DELETE",
      });
      
      const responseText = await res.text();
      
      // Yanıtın JSON olup olmadığını kontrol et
      try {
        const responseData = responseText ? JSON.parse(responseText) : {};
        if (!res.ok) {
          throw new Error(responseData.message || responseData.error || "Tedavi kaydı silinirken bir hata oluştu.");
        }
        return responseData;
      } catch (parseError) {
        console.error("Yanıt JSON ayrıştırma hatası:", parseError, "Ham yanıt:", responseText);
        if (!res.ok) {
          throw new Error(`Tedavi kaydı silinirken bir hata oluştu. Sunucu yanıtı: ${responseText}`);
        }
        return { message: "Başarılı" };
      }
    },
    onSuccess: () => {
      setIsDeleteConfirmDialogOpen(false);
      setItemToDelete(null);
      refetchTreatments();
      toast({
        title: "Başarılı",
        description: "Tedavi kaydı başarıyla silindi.",
      });
    },
    onError: (error: any) => {
      console.error("Tedavi kaydı silme hatası:", error);
      
      // Daha detaylı hata gösterimi
      let errorMessage = "Tedavi kaydı silinirken bir hata oluştu.";
      
      if (error.response) {
        try {
          // Sunucu yanıtından detaylı hata mesajı almaya çalış
          const responseData = error.response.data || {};
          errorMessage = responseData.message || responseData.error || errorMessage;
          console.log("Sunucu hata detayları:", responseData);
        } catch (e) {
          console.error("Hata mesajı ayrıştırma hatası:", e);
        }
      }
      
      toast({
        title: "Hata",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
  
  const createProgressImageMutation = useMutation({
    mutationFn: async (data: ProgressImageFormValues) => {
      const res = await fetch(`/api/patients/${data.patientId}/progress-images`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        throw new Error("İlerleme görseli oluşturulurken bir hata oluştu.");
      }
      
      return res.json();
    },
    onSuccess: () => {
      setIsNewProgressImageDialogOpen(false);
      progressImageForm.reset();
      refetchProgressImages();
      toast({
        title: "Başarılı",
        description: "İlerleme görseli başarıyla eklendi.",
      });
    },
    onError: (error) => {
      console.error("İlerleme görseli oluşturma hatası:", error);
      toast({
        title: "Hata",
        description: "İlerleme görseli oluşturulurken bir hata oluştu.",
        variant: "destructive",
      });
    },
  });
  
  const deleteProgressImageMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/progress-images/${id}`, {
        method: "DELETE",
      });
      
      if (!res.ok) {
        throw new Error("İlerleme görseli silinirken bir hata oluştu.");
      }
      
      return res.json();
    },
    onSuccess: () => {
      setIsDeleteConfirmDialogOpen(false);
      setItemToDelete(null);
      refetchProgressImages();
      toast({
        title: "Başarılı",
        description: "İlerleme görseli başarıyla silindi.",
      });
    },
    onError: (error) => {
      console.error("İlerleme görseli silme hatası:", error);
      toast({
        title: "Hata",
        description: "İlerleme görseli silinirken bir hata oluştu.",
        variant: "destructive",
      });
    },
  });
  
  // HANDLERS
  const onSubmitPatient = (data: PatientFormValues) => {
    if (data.id) {
      updatePatientMutation.mutate(data);
    } else {
      createPatientMutation.mutate(data);
    }
  };
  
  const onSubmitDocument = (data: DocumentFormValues) => {
    createDocumentMutation.mutate(data);
  };
  
  const onSubmitTreatment = (data: TreatmentFormValues) => {
    createTreatmentMutation.mutate(data);
  };
  
  const onSubmitProgressImage = (data: ProgressImageFormValues) => {
    // Yeni versiyon sadece temel alanları kullanıyor
    createProgressImageMutation.mutate({
      ...data,
      isVisible: true
    });
  };
  
  const handleEditPatient = (patient: any) => {
    patientForm.reset({
      id: patient.id,
      fullName: patient.fullName,
      email: patient.email,
      phone: patient.phone,
      dateOfBirth: patient.dateOfBirth ? new Date(patient.dateOfBirth).toISOString().split('T')[0] : null,
      gender: patient.gender,
      nationality: patient.nationality,
      passportNumber: patient.passportNumber,
      address: patient.address,
      city: patient.city,
      country: patient.country,
      medicalHistory: patient.medicalHistory,
      serviceId: patient.serviceId,
      notes: patient.notes,
      status: patient.status,
      lastVisitDate: patient.lastVisitDate ? new Date(patient.lastVisitDate).toISOString().split('T')[0] : null,
    });
    
    setIsNewPatientDialogOpen(true);
  };
  
  const handleNewDocument = () => {
    documentForm.reset({
      patientId: selectedPatient.id,
      documentType: "",
      fileName: "",
      fileUrl: "",
      description: null,
      isConfidential: false,
    });
    
    setIsNewDocumentDialogOpen(true);
  };
  
  const handleNewTreatment = () => {
    treatmentForm.reset({
      patientId: selectedPatient.id,
      treatmentDate: new Date().toISOString().split('T')[0],
      doctorName: "",
      procedureDetails: "",
      graftsCount: null,
      technicUsed: "",
      serviceId: null,
      notes: null,
      status: "completed",
      followUpDate: null,
    });
    
    setIsNewTreatmentDialogOpen(true);
  };
  
  const handleNewProgressImage = () => {
    progressImageForm.reset({
      patientId: selectedPatient.id,
      imageUrl: "",
      captureDate: new Date().toISOString().split('T')[0],
      stage: "pre-op",
    });
    
    setIsNewProgressImageDialogOpen(true);
  };
  
  const handleDeleteItem = () => {
    if (!itemToDelete) return;
    
    if (itemToDelete.type === "patient") {
      deletePatientMutation.mutate(itemToDelete.id);
    } else if (itemToDelete.type === "document") {
      deleteDocumentMutation.mutate(itemToDelete.id);
    } else if (itemToDelete.type === "treatment") {
      deleteTreatmentMutation.mutate(itemToDelete.id);
    } else if (itemToDelete.type === "progressImage") {
      deleteProgressImageMutation.mutate(itemToDelete.id);
    }
  };
  
  const handleFilterChange = (filterType: string, value: string) => {
    // Filtre değiştiğinde sayfa 1'e dön
    setCurrentPage(1);
    
    if (filterType === "status") {
      setStatusFilter(value);
    } else if (filterType === "source") {
      setSourceFilter(value);
    } else if (filterType === "nationality") {
      setNationalityFilter(value);
    }
  };
  
  // Hasta verilerini işle
  const filteredPatients = patients ? patients.filter((patient: any) => {
    const matchesSearch = !searchTerm || 
      patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient.email && patient.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      patient.phone.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter;
    
    const matchesSource = sourceFilter === "all" || 
      (sourceFilter === "appointment" && patient.notes && patient.notes.includes("Otomatik oluşturuldu. Randevu ID:")) ||
      (sourceFilter === "manual" && (!patient.notes || !patient.notes.includes("Otomatik oluşturuldu. Randevu ID:")));
    
    const matchesNationality = nationalityFilter === "all" || 
      (patient.nationality && patient.nationality.toLowerCase() === nationalityFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesSource && matchesNationality;
  }) : [];
  
  const totalPages = Math.ceil((filteredPatients?.length || 0) / itemsPerPage);
  const currentPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  return (
    <div>
      <Tabs defaultValue="all-patients" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all-patients">Tüm Hastalar</TabsTrigger>
          {selectedPatient && (
            <TabsTrigger value="patient-details">
              {selectedPatient.fullName}
            </TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="all-patients">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-2 items-center">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Hasta ara..."
                    className="pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <Select value={statusFilter} onValueChange={(value) => handleFilterChange("status", value)}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Durum" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tümü</SelectItem>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="inactive">Pasif</SelectItem>
                      <SelectItem value="pending">Beklemede</SelectItem>
                      <SelectItem value="completed">Tamamlandı</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={sourceFilter} onValueChange={(value) => handleFilterChange("source", value)}>
                    <SelectTrigger className="w-full sm:w-52">
                      <SelectValue placeholder="Kaynak" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tüm Kaynaklar</SelectItem>
                      <SelectItem value="appointment">Randevudan Oluşturulan</SelectItem>
                      <SelectItem value="manual">Manuel Eklenen</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={nationalityFilter} onValueChange={(value) => handleFilterChange("nationality", value)}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Uyruk" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tüm Uyrruklar</SelectItem>
                      <SelectItem value="turkey">Türkiye</SelectItem>
                      <SelectItem value="georgia">Gürcistan</SelectItem>
                      <SelectItem value="russia">Rusya</SelectItem>
                      <SelectItem value="azerbaijan">Azerbaycan</SelectItem>
                      <SelectItem value="kazakhstan">Kazakistan</SelectItem>
                      <SelectItem value="iran">İran</SelectItem>
                      <SelectItem value="ukraine">Ukrayna</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex items-center gap-2 border border-input rounded-md h-10 px-3 ml-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`h-8 w-8 ${viewMode === 'list' ? 'bg-muted' : ''}`}
                      onClick={() => setViewMode('list')}
                    >
                      <ListFilter className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`h-8 w-8 ${viewMode === 'grid' ? 'bg-muted' : ''}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => {
                  patientForm.reset({
                    fullName: "",
                    email: null,
                    phone: "",
                    dateOfBirth: null,
                    gender: null,
                    nationality: null,
                    passportNumber: null,
                    address: null,
                    city: null,
                    country: null,
                    medicalHistory: null,
                    serviceId: null,
                    notes: null,
                    status: "active",
                    lastVisitDate: null,
                  });
                  setIsNewPatientDialogOpen(true);
                }}
                className="flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Yeni Hasta Ekle
              </Button>
            </div>
            
            {isPatientsLoading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin">
                  <RotateCcw className="w-8 h-8 text-primary" />
                </div>
              </div>
            ) : currentPatients.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <h3 className="text-lg font-medium text-gray-600">Hasta bulunamadı</h3>
                <p className="mt-2 text-gray-500">Yeni hasta ekleyebilir veya filtreleri değiştirebilirsiniz.</p>
              </div>
            ) : (
              <>
                {viewMode === "list" ? (
                  <div className="bg-white overflow-hidden rounded-lg shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Hasta Adı
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              İletişim Bilgileri
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Durum
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Son Ziyaret
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              İşlemler
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {currentPatients.map((patient: any) => (
                            <tr key={patient.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex flex-col">
                                  <button 
                                    onClick={() => {
                                      setSelectedPatient(patient);
                                      setActiveTab("patient-details");
                                    }}
                                    className="text-left hover:text-primary font-medium text-gray-900"
                                  >
                                    {patient.fullName}
                                  </button>
                                  {patient.notes && patient.notes.includes("Otomatik oluşturuldu. Randevu ID:") && (
                                    <span className="text-xs text-muted-foreground mt-1 flex items-center">
                                      <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                                      Randevudan otomatik oluşturuldu
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{patient.phone}</div>
                                <div className="text-sm text-gray-500">{patient.email}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Badge variant={
                                  patient.status === "active" ? "default" :
                                  patient.status === "pending" ? "outline" :
                                  patient.status === "completed" ? "secondary" :
                                  "destructive"
                                }>
                                  {patient.status === "active" && "Aktif"}
                                  {patient.status === "inactive" && "Pasif"}
                                  {patient.status === "pending" && "Beklemede"}
                                  {patient.status === "completed" && "Tamamlandı"}
                                </Badge>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {patient.lastVisitDate ? new Date(patient.lastVisitDate).toLocaleDateString('tr-TR') : '-'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <ChevronDown className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => {
                                      setSelectedPatient(patient);
                                      setActiveTab("patient-details");
                                    }}>
                                      Detayları Görüntüle
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleEditPatient(patient)}>
                                      Düzenle
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setItemToDelete({ type: "patient", id: patient.id });
                                        setIsDeleteConfirmDialogOpen(true);
                                      }}
                                      className="text-red-600"
                                    >
                                      Sil
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
                        <div className="flex-1 flex justify-between sm:hidden">
                          <Button
                            variant="outline"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                          >
                            Önceki
                          </Button>
                          <Button
                            variant="outline"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                          >
                            Sonraki
                          </Button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                          <div>
                            <p className="text-sm text-gray-700">
                              Toplam <span className="font-medium">{filteredPatients.length}</span> hastadan{" "}
                              <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>-
                              <span className="font-medium">
                                {Math.min(currentPage * itemsPerPage, filteredPatients.length)}
                              </span>{" "}
                              arası gösteriliyor
                            </p>
                          </div>
                          <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                              <Button
                                variant="outline"
                                className="rounded-l-md"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                              >
                                <span className="sr-only">Önceki</span>
                                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                              </Button>
                              
                              {Array.from({ length: totalPages }).map((_, index) => (
                                <Button
                                  key={index}
                                  variant={currentPage === index + 1 ? "default" : "outline"}
                                  onClick={() => setCurrentPage(index + 1)}
                                >
                                  {index + 1}
                                </Button>
                              ))}
                              
                              <Button
                                variant="outline"
                                className="rounded-r-md"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                              >
                                <span className="sr-only">Sonraki</span>
                                <ChevronRight className="h-5 w-5" aria-hidden="true" />
                              </Button>
                            </nav>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {currentPatients.map((patient: any) => (
                      <Card key={patient.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start mb-2">
                            <CardTitle className="text-base font-semibold">
                              <button 
                                onClick={() => {
                                  setSelectedPatient(patient);
                                  setActiveTab("patient-details");
                                }}
                                className="text-left hover:text-primary"
                              >
                                {patient.fullName}
                              </button>
                            </CardTitle>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => {
                                  setSelectedPatient(patient);
                                  setActiveTab("patient-details");
                                }}>
                                  Detayları Görüntüle
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEditPatient(patient)}>
                                  Düzenle
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setItemToDelete({ type: "patient", id: patient.id });
                                    setIsDeleteConfirmDialogOpen(true);
                                  }}
                                  className="text-red-600"
                                >
                                  Sil
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          
                          <Badge variant={
                            patient.status === "active" ? "default" :
                            patient.status === "pending" ? "outline" :
                            patient.status === "completed" ? "secondary" :
                            "destructive"
                          } className="mb-2">
                            {patient.status === "active" && "Aktif"}
                            {patient.status === "inactive" && "Pasif"}
                            {patient.status === "pending" && "Beklemede"}
                            {patient.status === "completed" && "Tamamlandı"}
                          </Badge>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-500">Telefon:</span>
                              <span className="text-sm">{patient.phone}</span>
                            </div>
                            
                            {patient.email && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-500">E-posta:</span>
                                <span className="text-sm">{patient.email}</span>
                              </div>
                            )}
                            
                            {patient.lastVisitDate && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-500">Son Ziyaret:</span>
                                <span className="text-sm">{new Date(patient.lastVisitDate).toLocaleDateString('tr-TR')}</span>
                              </div>
                            )}
                            
                            {patient.nationality && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-500">Uyruk:</span>
                                <span className="text-sm">{patient.nationality}</span>
                              </div>
                            )}
                            
                            {patient.notes && patient.notes.includes("Otomatik oluşturuldu. Randevu ID:") && (
                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                                <span>Randevudan otomatik oluşturuldu</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
                
                {/* Pagination for Grid View */}
                {viewMode === "grid" && totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <Button
                        variant="outline"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        Önceki
                      </Button>
                      <Button
                        variant="outline"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Sonraki
                      </Button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Toplam <span className="font-medium">{filteredPatients.length}</span> hastadan{" "}
                          <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>-
                          <span className="font-medium">
                            {Math.min(currentPage * itemsPerPage, filteredPatients.length)}
                          </span>{" "}
                          arası gösteriliyor
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                          <Button
                            variant="outline"
                            className="rounded-l-md"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                          >
                            <span className="sr-only">Önceki</span>
                            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                          </Button>
                          
                          {Array.from({ length: totalPages }).map((_, index) => (
                            <Button
                              key={index}
                              variant={currentPage === index + 1 ? "default" : "outline"}
                              onClick={() => setCurrentPage(index + 1)}
                            >
                              {index + 1}
                            </Button>
                          ))}
                          
                          <Button
                            variant="outline"
                            className="rounded-r-md"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                          >
                            <span className="sr-only">Sonraki</span>
                            <ChevronRight className="h-5 w-5" aria-hidden="true" />
                          </Button>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="patient-details">
          {selectedPatient && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("all-patients")}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Geri
                  </Button>
                  
                  <h2 className="text-2xl font-bold">{selectedPatient.fullName}</h2>
                  
                  <Badge variant={
                    selectedPatient.status === "active" ? "default" :
                    selectedPatient.status === "pending" ? "outline" :
                    selectedPatient.status === "completed" ? "secondary" :
                    "destructive"
                  }>
                    {selectedPatient.status === "active" && "Aktif"}
                    {selectedPatient.status === "inactive" && "Pasif"}
                    {selectedPatient.status === "pending" && "Beklemede"}
                    {selectedPatient.status === "completed" && "Tamamlandı"}
                  </Badge>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleEditPatient(selectedPatient)}
                    className="flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Düzenle
                  </Button>
                  
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setItemToDelete({ type: "patient", id: selectedPatient.id });
                      setIsDeleteConfirmDialogOpen(true);
                    }}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Sil
                  </Button>
                </div>
              </div>
              
              {/* Hasta alt sekmeleri */}
              <Tabs defaultValue="personal-info" className="w-full">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="personal-info" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Kişisel Bilgiler
                  </TabsTrigger>
                  <TabsTrigger value="treatments" className="flex items-center gap-2">
                    <ClipboardList className="h-4 w-4" />
                    Tedavi Kayıtları
                  </TabsTrigger>
                  <TabsTrigger value="documents" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Dökümanlar
                  </TabsTrigger>
                  <TabsTrigger value="progress-images" className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    İlerleme Görselleri
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal-info" className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          Kişisel Bilgiler
                          {selectedPatient.notes && selectedPatient.notes.includes("Otomatik oluşturuldu. Randevu ID:") && (
                            <Badge variant="outline" className="ml-2 flex items-center gap-1 bg-green-50">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span className="text-xs">Randevu Onayından</span>
                            </Badge>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm font-medium text-gray-500">Hasta No</div>
                          <div className="text-sm text-gray-900">{selectedPatient.id}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm font-medium text-gray-500">İsim</div>
                          <div className="text-sm text-gray-900">{selectedPatient.fullName}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm font-medium text-gray-500">E-posta</div>
                          <div className="text-sm text-gray-900">{selectedPatient.email || "-"}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm font-medium text-gray-500">Telefon</div>
                          <div className="text-sm text-gray-900">{selectedPatient.phone}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm font-medium text-gray-500">Doğum Tarihi</div>
                          <div className="text-sm text-gray-900">
                            {selectedPatient.dateOfBirth ? new Date(selectedPatient.dateOfBirth).toLocaleDateString('tr-TR') : "-"}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm font-medium text-gray-500">Cinsiyet</div>
                          <div className="text-sm text-gray-900">{selectedPatient.gender || "-"}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm font-medium text-gray-500">Uyruk</div>
                          <div className="text-sm text-gray-900">{selectedPatient.nationality || "-"}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm font-medium text-gray-500">Pasaport No</div>
                          <div className="text-sm text-gray-900">{selectedPatient.passportNumber || "-"}</div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>İletişim Bilgileri</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm font-medium text-gray-500">Adres</div>
                          <div className="text-sm text-gray-900">{selectedPatient.address || "-"}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm font-medium text-gray-500">Şehir</div>
                          <div className="text-sm text-gray-900">{selectedPatient.city || "-"}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm font-medium text-gray-500">Ülke</div>
                          <div className="text-sm text-gray-900">{selectedPatient.country || "-"}</div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Tıbbi Bilgiler</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm font-medium text-gray-500">İlgili Hizmet</div>
                          <div className="text-sm text-gray-900">
                            {selectedPatient.serviceId && services
                              ? services.find((s: any) => s.id === selectedPatient.serviceId)?.titleTR || "-"
                              : "-"}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm font-medium text-gray-500">Son Ziyaret</div>
                          <div className="text-sm text-gray-900">
                            {selectedPatient.lastVisitDate 
                              ? new Date(selectedPatient.lastVisitDate).toLocaleDateString('tr-TR')
                              : "-"}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm font-medium text-gray-500">Tıbbi Geçmiş</div>
                          <div className="text-sm text-gray-900">{selectedPatient.medicalHistory || "-"}</div>
                        </div>
                        
                        {/* İlişkili Randevu Bilgisi */}
                        {selectedPatient.notes && selectedPatient.notes.includes("Otomatik oluşturuldu. Randevu ID:") && (
                          <>
                            <div className="border-t pt-2 mt-2">
                              <div className="text-sm font-medium text-gray-500 mb-2">İlişkili Randevu</div>
                              {(() => {
                                // Hasta seçildiğinde randevu ID'sini çıkar ve sorgula
                                const apptId = extractAppointmentId(selectedPatient.notes);
                                
                                if (isAppointmentLoading) {
                                  return (
                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                      <RotateCcw className="h-3 w-3 animate-spin" />
                                      <span>Randevu bilgileri yükleniyor...</span>
                                    </div>
                                  );
                                }
                                
                                if (!relatedAppointment) {
                                  return (
                                    <div className="text-sm text-gray-900">
                                      Randevu bilgileri bulunamadı. (ID: {extractAppointmentId(selectedPatient.notes)})
                                    </div>
                                  );
                                }
                                
                                return (
                                  <div className="space-y-2 rounded-md border p-3 text-sm">
                                    <div className="grid grid-cols-2 gap-1">
                                      <div className="text-xs font-medium text-gray-500">Tarih</div>
                                      <div className="text-xs">
                                        {relatedAppointment.preferredDate ? new Date(relatedAppointment.preferredDate).toLocaleDateString('tr-TR') : '-'}
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-1">
                                      <div className="text-xs font-medium text-gray-500">Saat</div>
                                      <div className="text-xs">{relatedAppointment.appointmentTime || '-'}</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-1">
                                      <div className="text-xs font-medium text-gray-500">Durum</div>
                                      <div className="text-xs">
                                        <Badge variant={
                                          relatedAppointment.status === "confirmed" ? "default" :
                                          relatedAppointment.status === "completed" ? "secondary" :
                                          relatedAppointment.status === "cancelled" ? "destructive" :
                                          "outline"
                                        } className="text-[10px] px-1 py-0">
                                          {relatedAppointment.status === "new" && "Yeni"}
                                          {relatedAppointment.status === "confirmed" && "Onaylandı"}
                                          {relatedAppointment.status === "completed" && "Tamamlandı"}
                                          {relatedAppointment.status === "cancelled" && "İptal"}
                                        </Badge>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-1">
                                      <div className="text-xs font-medium text-gray-500">Mesaj</div>
                                      <div className="text-xs">{relatedAppointment.message || '-'}</div>
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          </>
                        )}
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm font-medium text-gray-500">Notlar</div>
                          <div className="text-sm text-gray-900">{selectedPatient.notes || "-"}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="documents" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Hasta Belgeleri</h3>
                    <Button onClick={handleNewDocument} className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Yeni Belge Ekle
                    </Button>
                  </div>
                  
                  {isDocumentsLoading ? (
                    <div className="flex justify-center items-center py-10">
                      <div className="animate-spin">
                        <RotateCcw className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                  ) : patientDocuments?.length === 0 ? (
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                      <h3 className="text-lg font-medium text-gray-600">Belge bulunamadı</h3>
                      <p className="mt-2 text-gray-500">Hasta için belge ekleyebilirsiniz.</p>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg overflow-hidden border">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Belge Türü
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Dosya Adı
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Açıklama
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Yükleme Tarihi
                              </th>
                              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                İşlemler
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {patientDocuments.map((document: any) => (
                              <tr key={document.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {document.documentType}
                                  </div>
                                  {document.isConfidential && (
                                    <Badge variant="outline" className="mt-1">Gizli</Badge>
                                  )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <a 
                                    href={document.fileUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                  >
                                    {document.fileName}
                                  </a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">
                                    {document.description || "-"}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {new Date(document.uploadDate).toLocaleDateString('tr-TR')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                      setItemToDelete({ type: "document", id: document.id });
                                      setIsDeleteConfirmDialogOpen(true);
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="treatments" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Tedavi Kayıtları</h3>
                    <Button onClick={handleNewTreatment} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Yeni Tedavi Kaydı
                    </Button>
                  </div>
                  
                  {isTreatmentsLoading ? (
                    <div className="flex justify-center items-center py-10">
                      <div className="animate-spin">
                        <RotateCcw className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                  ) : treatmentRecords?.length === 0 ? (
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                      <h3 className="text-lg font-medium text-gray-600">Tedavi kaydı bulunamadı</h3>
                      <p className="mt-2 text-gray-500">Hasta için tedavi kaydı ekleyebilirsiniz.</p>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg overflow-hidden border">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tedavi Tarihi
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Doktor
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                İşlem Detayları
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Greft
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Teknik
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Durum
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Kontrol Tarihi
                              </th>
                              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                İşlemler
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {treatmentRecords && treatmentRecords.length > 0 ? (
                              treatmentRecords.map((treatment: any) => (
                                <tr key={treatment.id} className="hover:bg-gray-50">
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {new Date(treatment.treatmentDate).toLocaleDateString('tr-TR')}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {treatment.doctorName}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {treatment.procedureDetails}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {treatment.graftsCount || '-'}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {treatment.techniqueUsed || '-'}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <Badge variant={
                                      treatment.status === "completed" ? "secondary" :
                                      treatment.status === "scheduled" ? "default" :
                                      treatment.status === "cancelled" ? "destructive" :
                                      "outline"
                                    }>
                                      {treatment.status === "completed" && "Tamamlandı"}
                                      {treatment.status === "scheduled" && "Planlandı"}
                                      {treatment.status === "cancelled" && "İptal"}
                                      {treatment.status === "pending" && "Beklemede"}
                                    </Badge>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {treatment.followUpDate ? new Date(treatment.followUpDate).toLocaleDateString('tr-TR') : '-'}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => {
                                        setItemToDelete({ type: "treatment", id: treatment.id });
                                        setIsDeleteConfirmDialogOpen(true);
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4 text-red-600" />
                                    </Button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                                  Tedavi kaydı bulunamadı
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                {/* İlerleme Görselleri Sekmesi */}
                <TabsContent value="progress-images" className="pt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">İlerleme Görselleri</h3>
                      <Button 
                        onClick={() => {
                          progressImageForm.reset({
                            patientId: selectedPatient.id,
                            imageUrl: "",
                            captureDate: new Date().toISOString().split('T')[0],
                            stage: "pre-op"
                          });
                          setIsNewProgressImageDialogOpen(true);
                        }} 
                        className="flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Yeni Görsel Ekle
                      </Button>
                    </div>

                    {isProgressImagesLoading ? (
                      <div className="flex justify-center items-center py-10">
                        <div className="animate-spin">
                          <RotateCcw className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                    ) : !progressImages || progressImages.length === 0 ? (
                      <div className="bg-gray-50 rounded-lg p-8 text-center">
                        <h3 className="text-lg font-medium text-gray-600">Görsel bulunamadı</h3>
                        <p className="mt-2 text-gray-500">Hasta için ilerleme görseli ekleyebilirsiniz.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                        {progressImages.map((image: any) => (
                          <Card key={image.id} className="overflow-hidden">
                            <div className="aspect-square relative">
                              <img 
                                src={image.imageUrl} 
                                alt={`İlerleme görseli - ${image.stage}`}
                                className="object-cover w-full h-full"
                              />
                              {!image.isVisible && (
                                <div className="absolute top-2 right-2">
                                  <Badge variant="secondary" className="bg-gray-800 text-white">
                                    <EyeOff className="w-3 h-3 mr-1" /> Gizli
                                  </Badge>
                                </div>
                              )}
                            </div>
                            <CardContent className="p-4">
                              <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                  <Badge className="capitalize">
                                    {image.stage}
                                  </Badge>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                      setItemToDelete({ type: "progressImage", id: image.id });
                                      setIsDeleteConfirmDialogOpen(true);
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                  </Button>
                                </div>
                                <div className="text-sm text-gray-700">
                                  <span className="font-medium">Tarih:</span> {new Date(image.captureDate).toLocaleDateString('tr-TR')}
                                </div>
                                {image.notes && (
                                  <div className="text-sm text-gray-600 mt-1">
                                    <span className="font-medium">Not:</span> {image.notes}
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Yeni Hasta Dialog */}
      <Dialog open={isNewPatientDialogOpen} onOpenChange={setIsNewPatientDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {patientForm.getValues("id") ? "Hasta Düzenle" : "Yeni Hasta Ekle"}
            </DialogTitle>
            <DialogDescription>
              {patientForm.getValues("id") 
                ? "Hasta bilgilerini güncelleyin."
                : "Yeni bir hasta kaydı oluşturun."}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...patientForm}>
            <form onSubmit={patientForm.handleSubmit(onSubmitPatient)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={patientForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ad Soyad</FormLabel>
                      <FormControl>
                        <Input placeholder="Ad Soyad" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={patientForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-posta</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="E-posta" 
                          {...field} 
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value || null)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={patientForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefon</FormLabel>
                      <FormControl>
                        <Input placeholder="Telefon" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={patientForm.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Doğum Tarihi</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field} 
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value || null)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={patientForm.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cinsiyet</FormLabel>
                      <Select
                        value={field.value || ""}
                        onValueChange={(value) => field.onChange(value || null)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Cinsiyet seçin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Erkek</SelectItem>
                          <SelectItem value="female">Kadın</SelectItem>
                          <SelectItem value="other">Diğer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={patientForm.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Uyruk</FormLabel>
                      <Select
                        value={field.value || ""}
                        onValueChange={(value) => field.onChange(value || null)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Uyruk seçin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="turkey">Türkiye</SelectItem>
                          <SelectItem value="georgia">Gürcistan</SelectItem>
                          <SelectItem value="russia">Rusya</SelectItem>
                          <SelectItem value="azerbaijan">Azerbaycan</SelectItem>
                          <SelectItem value="kazakhstan">Kazakistan</SelectItem>
                          <SelectItem value="iran">İran</SelectItem>
                          <SelectItem value="ukraine">Ukrayna</SelectItem>
                          <SelectItem value="other">Diğer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={patientForm.control}
                  name="passportNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pasaport No</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Pasaport No" 
                          {...field} 
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value || null)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={patientForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adres</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Adres" 
                          {...field} 
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value || null)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={patientForm.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Şehir</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Şehir" 
                          {...field} 
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value || null)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={patientForm.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ülke</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ülke" 
                          {...field} 
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value || null)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={patientForm.control}
                  name="serviceId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>İlgili Hizmet</FormLabel>
                      <Select
                        value={field.value?.toString() || ""}
                        onValueChange={(value) => field.onChange(value ? parseInt(value, 10) : null)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Hizmet seçin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {services?.map((service: any) => (
                            <SelectItem key={service.id} value={service.id.toString()}>
                              {service.titleTR}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={patientForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Durum</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Durum seçin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Aktif</SelectItem>
                          <SelectItem value="inactive">Pasif</SelectItem>
                          <SelectItem value="pending">Beklemede</SelectItem>
                          <SelectItem value="completed">Tamamlandı</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={patientForm.control}
                  name="lastVisitDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Son Ziyaret Tarihi</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field} 
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value || null)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={patientForm.control}
                  name="medicalHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tıbbi Geçmiş</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tıbbi geçmiş bilgileri..." 
                          className="min-h-[100px]" 
                          {...field} 
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value || null)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={patientForm.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notlar</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Hasta ile ilgili notlar..." 
                          className="min-h-[100px]" 
                          {...field} 
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value || null)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter>
                <Button type="submit" disabled={createPatientMutation.isPending || updatePatientMutation.isPending}>
                  {createPatientMutation.isPending || updatePatientMutation.isPending ? (
                    <>
                      <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : patientForm.getValues("id") ? (
                    "Güncelle"
                  ) : (
                    "Kaydet"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Yeni Belge Dialog */}
      <Dialog open={isNewDocumentDialogOpen} onOpenChange={setIsNewDocumentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yeni Belge Ekle</DialogTitle>
            <DialogDescription>
              Hasta için yeni bir belge yükleyin.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...documentForm}>
            <form onSubmit={documentForm.handleSubmit(onSubmitDocument)} className="space-y-4">
              <FormField
                control={documentForm.control}
                name="documentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Belge Türü</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Belge türü seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="medical_record">Tıbbi Kayıt</SelectItem>
                        <SelectItem value="consent_form">Onam Formu</SelectItem>
                        <SelectItem value="test_result">Test Sonucu</SelectItem>
                        <SelectItem value="prescription">Reçete</SelectItem>
                        <SelectItem value="identification">Kimlik</SelectItem>
                        <SelectItem value="insurance">Sigorta</SelectItem>
                        <SelectItem value="other">Diğer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={documentForm.control}
                name="fileUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dosya Yükle</FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        onChange={(e) => {
                          // Dosya yükleme işlemleri burada yapılacak
                          if (e.target.files && e.target.files.length > 0) {
                            const file = e.target.files[0];
                            // Dosya adını otomatik olarak belirle
                            documentForm.setValue("fileName", file.name);
                            // Şimdilik URL'i boş bırak, form gönderildiğinde doldurulacak
                            field.onChange("/uploads/" + file.name);
                          }
                        }}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      />
                    </FormControl>
                    <FormDescription>
                      Desteklenen formatlar: PDF, JPG, PNG (Maks: 5MB)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit" disabled={createDocumentMutation.isPending}>
                  {createDocumentMutation.isPending ? (
                    <>
                      <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : (
                    "Belge Ekle"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Yeni Tedavi Dialog */}
      <Dialog open={isNewTreatmentDialogOpen} onOpenChange={setIsNewTreatmentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yeni Tedavi Kaydı</DialogTitle>
            <DialogDescription>
              Hasta için yeni bir tedavi kaydı ekleyin.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...treatmentForm}>
            <form onSubmit={treatmentForm.handleSubmit(onSubmitTreatment)} className="space-y-4">
              <FormField
                control={treatmentForm.control}
                name="treatmentDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tedavi Tarihi</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={treatmentForm.control}
                name="doctorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doktor</FormLabel>
                    <FormControl>
                      <Input placeholder="Doktor adı" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={treatmentForm.control}
                name="procedureDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İşlem Detayları</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Yapılan işlemler..."
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={treatmentForm.control}
                  name="graftsCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Greft Sayısı</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Greft sayısı" 
                          {...field}
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value, 10) : null)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={treatmentForm.control}
                  name="technicUsed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kullanılan Teknik</FormLabel>
                      <Select
                        value={field.value || ""}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Teknik seçin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="FUE">FUE</SelectItem>
                          <SelectItem value="DHI">DHI</SelectItem>
                          <SelectItem value="Saç Mezoterapisi">Saç Mezoterapisi</SelectItem>
                          <SelectItem value="PRP">PRP</SelectItem>
                          <SelectItem value="Diğer">Diğer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              
                <FormField
                  control={treatmentForm.control}
                  name="serviceId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>İlgili Hizmet</FormLabel>
                      <Select
                        value={field.value?.toString() || ""}
                        onValueChange={(value) => field.onChange(value ? parseInt(value, 10) : null)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Hizmet seçin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {services?.map((service: any) => (
                            <SelectItem key={service.id} value={service.id.toString()}>
                              {service.titleTR}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={treatmentForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Durum</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Durum seçin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="completed">Tamamlandı</SelectItem>
                          <SelectItem value="scheduled">Planlandı</SelectItem>
                          <SelectItem value="cancelled">İptal</SelectItem>
                          <SelectItem value="pending">Beklemede</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={treatmentForm.control}
                name="followUpDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kontrol Tarihi</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        {...field} 
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value || null)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={treatmentForm.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notlar</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tedavi ile ilgili notlar..." 
                        {...field} 
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value || null)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit" disabled={createTreatmentMutation.isPending}>
                  {createTreatmentMutation.isPending ? (
                    <>
                      <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : (
                    "Tedavi Kaydı Ekle"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* İlerleme Görseli Dialog */}
      <Dialog open={isNewProgressImageDialogOpen} onOpenChange={setIsNewProgressImageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yeni İlerleme Görseli</DialogTitle>
            <DialogDescription>
              Hastanın tedavi sürecindeki ilerlemesini göstermek için yeni bir görsel ekleyin.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...progressImageForm}>
            <form onSubmit={progressImageForm.handleSubmit(onSubmitProgressImage)} className="space-y-4">
              <FormField
                control={progressImageForm.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Görsel Yükle</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];
                              const formData = new FormData();
                              formData.append("file", file);
                              
                              try {
                                const response = await fetch("/api/upload", {
                                  method: "POST",
                                  body: formData,
                                });
                                
                                if (response.ok) {
                                  const data = await response.json();
                                  field.onChange(data.url);
                                  toast({
                                    title: "Görsel yüklendi",
                                    description: "Görsel başarıyla yüklendi.",
                                  });
                                } else {
                                  toast({
                                    title: "Hata",
                                    description: "Görsel yüklenirken bir hata oluştu.",
                                    variant: "destructive",
                                  });
                                }
                              } catch (error) {
                                toast({
                                  title: "Hata",
                                  description: "Görsel yüklenirken bir hata oluştu.",
                                  variant: "destructive",
                                });
                              }
                            }
                          }}
                        />
                        {field.value && (
                          <div className="mt-2">
                            <img 
                              src={field.value} 
                              alt="Yüklenen görsel" 
                              className="w-32 h-32 object-cover rounded-md border" 
                            />
                          </div>
                        )}
                        <Input 
                          type="hidden" 
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>Hasta için bir ilerleme görseli yükleyin</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={progressImageForm.control}
                name="captureDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Çekim Tarihi</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={progressImageForm.control}
                name="stage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aşama</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Aşama seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pre-op">Operasyon Öncesi</SelectItem>
                        <SelectItem value="post-op">Operasyon Sonrası</SelectItem>
                        <SelectItem value="1-month">1. Ay</SelectItem>
                        <SelectItem value="3-month">3. Ay</SelectItem>
                        <SelectItem value="6-month">6. Ay</SelectItem>
                        <SelectItem value="1-year">1. Yıl</SelectItem>
                        <SelectItem value="18-month">18. Ay</SelectItem>
                        <SelectItem value="2-year">2. Yıl</SelectItem>
                        <SelectItem value="other">Diğer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsNewProgressImageDialogOpen(false)}
                >
                  İptal
                </Button>
                <Button
                  type="submit"
                  disabled={createProgressImageMutation.isPending}
                >
                  {createProgressImageMutation.isPending ? (
                    <>
                      <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : (
                    "Görsel Ekle"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Silme Onay Dialog */}
      <Dialog open={isDeleteConfirmDialogOpen} onOpenChange={setIsDeleteConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Silmeyi Onayla</DialogTitle>
            <DialogDescription>
              {itemToDelete?.type === "patient" && "Bu hastayı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."}
              {itemToDelete?.type === "document" && "Bu belgeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."}
              {itemToDelete?.type === "treatment" && "Bu tedavi kaydını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."}
              {itemToDelete?.type === "progressImage" && "Bu ilerleme görselini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteConfirmDialogOpen(false)}>
              İptal
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteItem}
              disabled={
                deletePatientMutation.isPending || 
                deleteDocumentMutation.isPending || 
                deleteTreatmentMutation.isPending ||
                deleteProgressImageMutation.isPending
              }
            >
              {(deletePatientMutation.isPending || deleteDocumentMutation.isPending || deleteTreatmentMutation.isPending || deleteProgressImageMutation.isPending) ? (
                <>
                  <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                  Siliniyor...
                </>
              ) : (
                "Evet, Sil"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientManagement;