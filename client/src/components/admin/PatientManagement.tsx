import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { 
  UserPlus, Edit, Trash2, Search, ChevronDown, 
  ChevronLeft, ChevronRight, FileText, Folder,
  Upload, Clock, Calendar, RotateCcw, CheckCircle
} from "lucide-react";

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
});

type PatientFormValues = z.infer<typeof patientFormSchema>;
type DocumentFormValues = z.infer<typeof documentFormSchema>;
type TreatmentFormValues = z.infer<typeof treatmentFormSchema>;

const PatientManagement = () => {
  const [activeTab, setActiveTab] = useState("all-patients");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isNewPatientDialogOpen, setIsNewPatientDialogOpen] = useState(false);
  const [isNewDocumentDialogOpen, setIsNewDocumentDialogOpen] = useState(false);
  const [isNewTreatmentDialogOpen, setIsNewTreatmentDialogOpen] = useState(false);
  const [isDeleteConfirmDialogOpen, setIsDeleteConfirmDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ type: string; id: number } | null>(null);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const itemsPerPage = 10;
  
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
    }
  });
  
  // QUERIES
  const { data: patients, isLoading: isPatientsLoading, refetch: refetchPatients } = useQuery({
    queryKey: ["/api/patients"],
    queryFn: async () => {
      const res = await fetch("/api/patients");
      if (!res.ok) {
        throw new Error("Hastalar getirilirken bir hata oluştu.");
      }
      return res.json();
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
      
      if (!res.ok) {
        throw new Error("Tedavi kaydı silinirken bir hata oluştu.");
      }
      
      return res.json();
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
    onError: (error) => {
      console.error("Tedavi kaydı silme hatası:", error);
      toast({
        title: "Hata",
        description: "Tedavi kaydı silinirken bir hata oluştu.",
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
  
  const handleDeleteItem = () => {
    if (!itemToDelete) return;
    
    if (itemToDelete.type === "patient") {
      deletePatientMutation.mutate(itemToDelete.id);
    } else if (itemToDelete.type === "document") {
      deleteDocumentMutation.mutate(itemToDelete.id);
    } else if (itemToDelete.type === "treatment") {
      deleteTreatmentMutation.mutate(itemToDelete.id);
    }
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
      serviceId: null,
      notes: null,
      status: "completed",
      followUpDate: null,
    });
    
    setIsNewTreatmentDialogOpen(true);
  };
  
  // FILTERS & PAGINATION
  const filteredPatients = patients ? patients.filter((patient: any) => {
    const matchesSearch = !searchTerm || 
      patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient.email && patient.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      patient.phone.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || patient.status === statusFilter;
    
    return matchesSearch && matchesStatus;
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
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Hasta ara..."
                    className="pl-10 w-full sm:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Durum" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tümü</SelectItem>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="inactive">Pasif</SelectItem>
                    <SelectItem value="pending">Beklemede</SelectItem>
                    <SelectItem value="completed">Tamamlandı</SelectItem>
                  </SelectContent>
                </Select>
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
              <div className="bg-white overflow-hidden">
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
                            <button 
                              onClick={() => {
                                setSelectedPatient(patient);
                                setActiveTab("patient-details");
                              }}
                              className="text-left hover:text-primary font-medium text-gray-900"
                            >
                              {patient.fullName}
                            </button>
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
                
                <div className="flex items-center gap-2">
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
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Kişisel Bilgiler</CardTitle>
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
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium text-gray-500">Notlar</div>
                      <div className="text-sm text-gray-900">{selectedPatient.notes || "-"}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Tabs defaultValue="documents">
                <TabsList>
                  <TabsTrigger value="documents" className="flex items-center gap-2">
                    <Folder className="w-4 h-4" />
                    Belgeler
                  </TabsTrigger>
                  <TabsTrigger value="treatments" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Tedavi Kayıtları
                  </TabsTrigger>
                </TabsList>
                
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
                            {treatmentRecords.map((treatment: any) => (
                              <tr key={treatment.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {new Date(treatment.treatmentDate).toLocaleDateString('tr-TR')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {treatment.doctorName}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-sm text-gray-900">
                                    {treatment.procedureDetails}
                                  </div>
                                  {treatment.notes && (
                                    <div className="text-xs text-gray-500 mt-1">
                                      Not: {treatment.notes}
                                    </div>
                                  )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <Badge variant={
                                    treatment.status === "completed" ? "secondary" :
                                    treatment.status === "pending" ? "outline" :
                                    treatment.status === "active" ? "default" :
                                    "destructive"
                                  }>
                                    {treatment.status === "completed" && "Tamamlandı"}
                                    {treatment.status === "pending" && "Beklemede"}
                                    {treatment.status === "active" && "Aktif"}
                                    {treatment.status === "cancelled" && "İptal"}
                                  </Badge>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {treatment.followUpDate 
                                    ? new Date(treatment.followUpDate).toLocaleDateString('tr-TR')
                                    : "-"}
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
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
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
                      <FormLabel>Adı Soyadı</FormLabel>
                      <FormControl>
                        <Input placeholder="Hasta adı soyadı" {...field} />
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
                          placeholder="ornek@mail.com" 
                          type="email" 
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
                        <Input placeholder="+90 555 123 4567" {...field} />
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
                        onValueChange={(value) => field.onChange(value || null)}
                        value={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seçiniz" />
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
                      <FormControl>
                        <Input 
                          placeholder="Uyruk" 
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
                  name="passportNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pasaport Numarası</FormLabel>
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
                  name="serviceId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hizmet</FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(value ? parseInt(value) : null)}
                        value={field.value?.toString() || ""}
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
                      <Select onValueChange={field.onChange} value={field.value}>
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
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adres</FormLabel>
                      <FormControl>
                        <Textarea 
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
                  name="medicalHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tıbbi Geçmiş</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Hastanın tıbbi geçmişi" 
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
                          placeholder="Ekstra notlar" 
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
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsNewPatientDialogOpen(false)}
                >
                  İptal
                </Button>
                <Button type="submit">
                  {patientForm.getValues("id") ? "Güncelle" : "Kaydet"}
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Belge türü seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Tedavi Öncesi Görsel">Tedavi Öncesi Görsel</SelectItem>
                        <SelectItem value="Tedavi Sonrası Görsel">Tedavi Sonrası Görsel</SelectItem>
                        <SelectItem value="Kimlik Belgesi">Kimlik Belgesi</SelectItem>
                        <SelectItem value="Pasaport">Pasaport</SelectItem>
                        <SelectItem value="Hasta Onay Formu">Hasta Onay Formu</SelectItem>
                        <SelectItem value="Tıbbi Rapor">Tıbbi Rapor</SelectItem>
                        <SelectItem value="Laboratuvar Sonucu">Laboratuvar Sonucu</SelectItem>
                        <SelectItem value="Diğer">Diğer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={documentForm.control}
                name="fileName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dosya Adı</FormLabel>
                    <FormControl>
                      <Input placeholder="Dosya adı" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={documentForm.control}
                name="fileUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dosya URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Dosya URL adresi" {...field} />
                    </FormControl>
                    <FormDescription>
                      Dosyanın internet adresini girin (Örn: https://example.com/dosya.pdf)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={documentForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Açıklama</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Belge hakkında kısa açıklama" 
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
                control={documentForm.control}
                name="isConfidential"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Gizli Belge</FormLabel>
                      <FormDescription>
                        Bu belge gizli bilgiler içeriyorsa işaretleyin.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsNewDocumentDialogOpen(false)}
                >
                  İptal
                </Button>
                <Button type="submit">Belgeyi Ekle</Button>
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
              Hasta için yeni bir tedavi kaydı oluşturun.
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
                    <FormLabel>Doktor Adı</FormLabel>
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
                        placeholder="Yapılan işlemin detayları" 
                        {...field} 
                      />
                    </FormControl>
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
                      onValueChange={(value) => field.onChange(value ? parseInt(value) : null)}
                      value={field.value?.toString() || ""}
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Durum seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Devam Ediyor</SelectItem>
                        <SelectItem value="completed">Tamamlandı</SelectItem>
                        <SelectItem value="pending">Beklemede</SelectItem>
                        <SelectItem value="cancelled">İptal</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
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
                        placeholder="Ek notlar" 
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
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsNewTreatmentDialogOpen(false)}
                >
                  İptal
                </Button>
                <Button type="submit">Kaydet</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Silme Onay Dialog */}
      <Dialog open={isDeleteConfirmDialogOpen} onOpenChange={setIsDeleteConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Silme İşlemini Onaylayın</DialogTitle>
            <DialogDescription>
              {itemToDelete?.type === "patient" && "Bu hastayı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz ve hastaya ait tüm belgeler ve tedavi kayıtları da silinecektir."}
              {itemToDelete?.type === "document" && "Bu belgeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."}
              {itemToDelete?.type === "treatment" && "Bu tedavi kaydını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."}
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteConfirmDialogOpen(false);
                setItemToDelete(null);
              }}
            >
              İptal
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteItem}
            >
              Evet, Sil
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientManagement;