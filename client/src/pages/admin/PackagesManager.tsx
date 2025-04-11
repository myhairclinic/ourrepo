import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Package, insertPackageSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Edit,
  Trash2,
  Plus,
  PackageCheck,
  Eye,
  ArrowUpDown,
  Loader2,
  Check,
  Sparkles,
  Building,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Extend the package schema
const formSchema = insertPackageSchema.extend({
  price: z.coerce.number().min(0),
  order: z.coerce.number().min(0),
  packageType: z.enum(['standard', 'premium', 'luxury', 'budget']).default('standard'),
  isAllInclusive: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export default function PackagesManager() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Query packages data
  const {
    data: packages,
    isLoading,
    error,
  } = useQuery<Package[]>({
    queryKey: ["/api/packages"],
    staleTime: 10000,
  });

  // Create package mutation
  const createMutation = useMutation({
    mutationFn: async (newPackage: FormValues) => {
      const res = await apiRequest("POST", "/api/packages", newPackage);
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to create package");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/packages"] });
      toast({
        title: "Success",
        description: "Package created successfully",
      });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update package mutation
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      packageData,
    }: {
      id: number;
      packageData: FormValues;
    }) => {
      const res = await apiRequest(
        "PATCH",
        `/api/packages/${id}`,
        packageData
      );
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to update package");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/packages"] });
      toast({
        title: "Success",
        description: "Package updated successfully",
      });
      setIsDialogOpen(false);
      setSelectedPackage(null);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete package mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/packages/${id}`);
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to delete package");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/packages"] });
      toast({
        title: "Success",
        description: "Package deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update isActive status
  const toggleActiveMutation = useMutation({
    mutationFn: async ({
      id,
      isActive,
    }: {
      id: number;
      isActive: boolean;
    }) => {
      const res = await apiRequest("PATCH", `/api/packages/${id}`, {
        isActive,
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to update package status");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/packages"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Setup form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titleTR: "",
      titleEN: "",
      titleRU: "",
      titleKA: "",
      descriptionTR: "",
      descriptionEN: "",
      descriptionRU: "",
      descriptionKA: "",
      contentTR: "",
      contentEN: "",
      contentRU: "",
      contentKA: "",
      imageUrl: "",
      price: 0,
      order: 0,
      isActive: true,
      packageType: "standard",
      isAllInclusive: false,
    },
  });

  const onSubmit = (values: FormValues) => {
    if (selectedPackage) {
      updateMutation.mutate({
        id: selectedPackage.id,
        packageData: values,
      });
    } else {
      createMutation.mutate(values);
    }
  };

  const handleEdit = (pkg: Package) => {
    setSelectedPackage(pkg);
    form.reset({
      titleTR: pkg.titleTR,
      titleEN: pkg.titleEN,
      titleRU: pkg.titleRU,
      titleKA: pkg.titleKA,
      descriptionTR: pkg.descriptionTR,
      descriptionEN: pkg.descriptionEN,
      descriptionRU: pkg.descriptionRU,
      descriptionKA: pkg.descriptionKA,
      contentTR: pkg.contentTR,
      contentEN: pkg.contentEN,
      contentRU: pkg.contentRU,
      contentKA: pkg.contentKA,
      imageUrl: pkg.imageUrl,
      price: pkg.price,
      order: pkg.order,
      isActive: pkg.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this package?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleToggleActive = (id: number, currentStatus: boolean) => {
    toggleActiveMutation.mutate({
      id,
      isActive: !currentStatus,
    });
  };

  const handleAddNew = () => {
    setSelectedPackage(null);
    form.reset({
      titleTR: "",
      titleEN: "",
      titleRU: "",
      titleKA: "",
      descriptionTR: "",
      descriptionEN: "",
      descriptionRU: "",
      descriptionKA: "",
      contentTR: "",
      contentEN: "",
      contentRU: "",
      contentKA: "",
      imageUrl: "",
      price: 0,
      order: 0,
      isActive: true,
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedPackage(null);
    form.reset();
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Sort packages by order
  const sortedPackages = packages
    ? [...packages].sort((a, b) => {
        const orderA = a.order;
        const orderB = b.order;
        return sortOrder === "asc" ? orderA - orderB : orderB - orderA;
      })
    : [];

  return (
    <AdminLayout title="Package Management">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Packages</CardTitle>
              <CardDescription>
                Manage treatment and accommodation packages
              </CardDescription>
            </div>
            <Button onClick={handleAddNew}>
              <Plus className="mr-2 h-4 w-4" /> Add New Package
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded">
              Error loading packages. Please try again.
            </div>
          ) : sortedPackages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No packages found. Create your first package!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead onClick={toggleSortOrder} className="cursor-pointer">
                      <div className="flex items-center">
                        Order
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Title (TR)</TableHead>
                    <TableHead>Title (EN)</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedPackages.map((pkg) => (
                    <TableRow key={pkg.id}>
                      <TableCell>{pkg.order}</TableCell>
                      <TableCell>{pkg.titleTR}</TableCell>
                      <TableCell>{pkg.titleEN}</TableCell>
                      <TableCell>€{pkg.price}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={pkg.isActive}
                            onCheckedChange={() =>
                              handleToggleActive(pkg.id, pkg.isActive)
                            }
                            id={`active-${pkg.id}`}
                          />
                          <Label htmlFor={`active-${pkg.id}`}>
                            {pkg.isActive ? "Active" : "Inactive"}
                          </Label>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(pkg)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => handleDelete(pkg.id)}
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
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedPackage ? "Edit Package" : "Create New Package"}
            </DialogTitle>
            <DialogDescription>
              {selectedPackage
                ? "Update the package information below"
                : "Fill in the details to create a new package"}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="titleTR"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title (Turkish)</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                          <Input {...field} />
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
                          <Input {...field} />
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
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="descriptionTR"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Turkish)</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={2} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="descriptionEN"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (English)</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={2} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="descriptionRU"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Russian)</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={2} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="descriptionKA"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Georgian)</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={2} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="contentTR"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content (Turkish)</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={5} />
                        </FormControl>
                        <FormDescription>
                          Enter features or details, one per line
                        </FormDescription>
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
                          <Textarea {...field} rows={5} />
                        </FormControl>
                        <FormDescription>
                          Enter features or details, one per line
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="contentRU"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content (Russian)</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={5} />
                        </FormControl>
                        <FormDescription>
                          Enter features or details, one per line
                        </FormDescription>
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
                          <Textarea {...field} rows={5} />
                        </FormControl>
                        <FormDescription>
                          Enter features or details, one per line
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (€)</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min={0} />
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
                        <Input {...field} type="number" min={0} />
                      </FormControl>
                      <FormDescription>
                        Lower numbers appear first
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="mt-0">Active</FormLabel>
                    <FormDescription>
                      Toggle to show or hide this package on the website
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseDialog}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                >
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {!selectedPackage ? (
                    <>
                      <Plus className="mr-2 h-4 w-4" /> Create Package
                    </>
                  ) : (
                    <>
                      <PackageCheck className="mr-2 h-4 w-4" /> Update Package
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}