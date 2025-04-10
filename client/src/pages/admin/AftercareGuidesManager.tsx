import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { insertAftercareGuideSchema, type AftercareGuide } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import { API_ROUTES } from "@/lib/constants";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trash2, Edit, FileText, Eye, Plus, EyeOff } from "lucide-react";

// Form validation schema
const formSchema = insertAftercareGuideSchema.extend({
  id: z.number().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AftercareGuidesManager() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<AftercareGuide | null>(null);
  const [activeTab, setActiveTab] = useState("content");

  // Fetch guides
  const { data: guides, isLoading } = useQuery<AftercareGuide[]>({
    queryKey: [API_ROUTES.AFTERCARE_GUIDES],
    queryFn: getQueryFn<AftercareGuide[]>(),
  });

  // Form setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titleTR: "",
      titleEN: "",
      titleRU: "",
      titleKA: "",
      contentTR: "",
      contentEN: "",
      contentRU: "",
      contentKA: "",
      serviceId: null,
      imageUrl: null,
      isActive: true,
      pdfUrlTR: null,
      pdfUrlEN: null,
      pdfUrlRU: null,
      pdfUrlKA: null,
      order: 0,
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const res = await apiRequest("POST", API_ROUTES.AFTERCARE_GUIDES, values);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.AFTERCARE_GUIDES] });
      toast({
        title: "Success",
        description: "Aftercare guide has been created",
      });
      form.reset();
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const res = await apiRequest(
        "PATCH", 
        `${API_ROUTES.AFTERCARE_GUIDES}/${values.id}`,
        values
      );
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.AFTERCARE_GUIDES] });
      toast({
        title: "Success",
        description: "Aftercare guide has been updated",
      });
      form.reset();
      setIsDialogOpen(false);
      setSelectedGuide(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (guideId: number) => {
      const res = await apiRequest(
        "DELETE",
        `${API_ROUTES.AFTERCARE_GUIDES}/${guideId}`
      );
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.AFTERCARE_GUIDES] });
      toast({
        title: "Success",
        description: "Aftercare guide has been deleted",
      });
      setIsDeleteDialogOpen(false);
      setSelectedGuide(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Toggle active status mutation
  const toggleActiveMutation = useMutation({
    mutationFn: async (guide: AftercareGuide) => {
      const res = await apiRequest(
        "PATCH", 
        `${API_ROUTES.AFTERCARE_GUIDES}/${guide.id}`,
        { isActive: !guide.isActive }
      );
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.AFTERCARE_GUIDES] });
      toast({
        title: "Success",
        description: "Aftercare guide status updated",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handle form submission
  const onSubmit = (values: FormValues) => {
    if (selectedGuide) {
      updateMutation.mutate({ ...values, id: selectedGuide.id });
    } else {
      createMutation.mutate(values);
    }
  };

  // Edit guide handler
  const handleEditGuide = (guide: AftercareGuide) => {
    setSelectedGuide(guide);
    
    // Reset form with guide values
    form.reset({
      titleTR: guide.titleTR,
      titleEN: guide.titleEN,
      titleRU: guide.titleRU,
      titleKA: guide.titleKA,
      contentTR: guide.contentTR,
      contentEN: guide.contentEN,
      contentRU: guide.contentRU,
      contentKA: guide.contentKA,
      serviceId: guide.serviceId,
      imageUrl: guide.imageUrl,
      isActive: guide.isActive,
      pdfUrlTR: guide.pdfUrlTR,
      pdfUrlEN: guide.pdfUrlEN,
      pdfUrlRU: guide.pdfUrlRU,
      pdfUrlKA: guide.pdfUrlKA,
      order: guide.order,
    });
    
    setIsDialogOpen(true);
  };

  // Delete guide handler
  const handleDeleteGuide = (guide: AftercareGuide) => {
    setSelectedGuide(guide);
    setIsDeleteDialogOpen(true);
  };

  // Handle dialog close
  const handleDialogClose = () => {
    form.reset();
    setSelectedGuide(null);
    setIsDialogOpen(false);
  };

  function getQueryFn<T>() {
    return async () => {
      const res = await fetch(API_ROUTES.AFTERCARE_GUIDES);
      if (!res.ok) {
        throw new Error("Failed to fetch aftercare guides");
      }
      return res.json() as Promise<T>;
    };
  }

  return (
    <AdminLayout title="Post-Procedure Care Guides">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Manage Aftercare Guides</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setSelectedGuide(null); form.reset(); }}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Guide
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {selectedGuide ? "Edit Aftercare Guide" : "Add New Aftercare Guide"}
                </DialogTitle>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-4 mb-4">
                      <TabsTrigger value="content">Content</TabsTrigger>
                      <TabsTrigger value="files">Files & Media</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" className="space-y-4">
                      <h3 className="font-semibold mb-2">Titles</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="titleTR"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title (Turkish)</FormLabel>
                              <FormControl>
                                <Input placeholder="Turkish title" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="titleEN"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title (English)</FormLabel>
                              <FormControl>
                                <Input placeholder="English title" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="titleRU"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title (Russian)</FormLabel>
                              <FormControl>
                                <Input placeholder="Russian title" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="titleKA"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title (Georgian)</FormLabel>
                              <FormControl>
                                <Input placeholder="Georgian title" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <h3 className="font-semibold mt-4 mb-2">Content</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <FormField
                          control={form.control}
                          name="contentTR"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Content (Turkish)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Turkish content"
                                  className="min-h-[150px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="contentEN"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Content (English)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="English content"
                                  className="min-h-[150px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="contentRU"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Content (Russian)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Russian content"
                                  className="min-h-[150px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="contentKA"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Content (Georgian)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Georgian content"
                                  className="min-h-[150px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="files" className="space-y-4">
                      <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Featured Image URL</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Image URL"
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <h3 className="font-semibold mt-4 mb-2">PDF Attachments</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="pdfUrlTR"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>PDF URL (Turkish)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Turkish PDF URL"
                                  {...field}
                                  value={field.value || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="pdfUrlEN"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>PDF URL (English)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="English PDF URL"
                                  {...field}
                                  value={field.value || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="pdfUrlRU"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>PDF URL (Russian)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Russian PDF URL"
                                  {...field}
                                  value={field.value || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="pdfUrlKA"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>PDF URL (Georgian)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Georgian PDF URL"
                                  {...field}
                                  value={field.value || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="serviceId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Related Service ID (optional)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Service ID"
                                  {...field}
                                  value={field.value || ""}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === "") {
                                      field.onChange(null);
                                    } else {
                                      field.onChange(parseInt(value));
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="order"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Display Order</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="isActive"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Active Status</FormLabel>
                              <FormMessage />
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </TabsContent>

                    <TabsContent value="preview" className="space-y-4">
                      <div className="border rounded-lg p-4 space-y-4">
                        <div className="space-y-2">
                          <h3 className="font-semibold">Preview (English)</h3>
                          <div className="bg-muted p-4 rounded-md">
                            <h4 className="text-lg font-semibold">
                              {form.watch("titleEN") || "No title provided"}
                            </h4>
                            <div className="mt-2 prose prose-sm">
                              {form.watch("contentEN") ? (
                                <p>{form.watch("contentEN")}</p>
                              ) : (
                                <p className="text-muted-foreground">No content provided</p>
                              )}
                            </div>
                            {form.watch("pdfUrlEN") && (
                              <div className="mt-2 flex items-center text-primary">
                                <FileText className="h-4 w-4 mr-1" />
                                <span>PDF Document available</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-semibold">Preview (Turkish)</h3>
                          <div className="bg-muted p-4 rounded-md">
                            <h4 className="text-lg font-semibold">
                              {form.watch("titleTR") || "No title provided"}
                            </h4>
                            <div className="mt-2 prose prose-sm">
                              {form.watch("contentTR") ? (
                                <p>{form.watch("contentTR")}</p>
                              ) : (
                                <p className="text-muted-foreground">No content provided</p>
                              )}
                            </div>
                            {form.watch("pdfUrlTR") && (
                              <div className="mt-2 flex items-center text-primary">
                                <FileText className="h-4 w-4 mr-1" />
                                <span>PDF Document available</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={handleDialogClose}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                      {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save Guide"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>
                Are you sure you want to delete the guide "
                {selectedGuide?.titleEN}"? This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => selectedGuide && deleteMutation.mutate(selectedGuide.id)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Guides Table */}
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))}
          </div>
        ) : !guides || guides.length === 0 ? (
          <Alert>
            <AlertDescription>
              No aftercare guides found. Click "Add New Guide" to create one.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {guides.map((guide) => (
                  <TableRow key={guide.id}>
                    <TableCell>{guide.id}</TableCell>
                    <TableCell>
                      <div>
                        <span className="font-medium">{guide.titleEN}</span>
                        <div className="text-sm text-muted-foreground mt-1">
                          {guide.serviceId ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted">
                              Service ID: {guide.serviceId}
                            </span>
                          ) : (
                            <span className="text-xs">General guide</span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div 
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          guide.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {guide.isActive ? (
                          <Eye className="h-3 w-3 mr-1" />
                        ) : (
                          <EyeOff className="h-3 w-3 mr-1" />
                        )}
                        {guide.isActive ? "Active" : "Hidden"}
                      </div>
                    </TableCell>
                    <TableCell>{guide.order}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleActiveMutation.mutate(guide)}
                          title={guide.isActive ? "Hide guide" : "Show guide"}
                        >
                          {guide.isActive ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditGuide(guide)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteGuide(guide)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}