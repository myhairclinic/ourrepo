import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Product, InsertProduct, insertProductSchema } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { API_ROUTES } from "@/lib/constants";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import AdminLayout from "@/components/admin/AdminLayout";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Check, Edit, Plus, Trash2, Download, AlertCircle, Eraser } from "lucide-react";

// Form validation schema for products
const formSchema = insertProductSchema.extend({
  imageUrl: z.string().min(1, "Image URL is required"),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function ProductsManager() {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFetchingVithair, setIsFetchingVithair] = useState(false);
  const [isClearingProducts, setIsClearingProducts] = useState(false);

  // Fetch all products
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: [API_ROUTES.PRODUCTS],
  });

  // Form for adding new products
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: "",
      nameTR: "",
      nameEN: "",
      nameRU: "",
      nameKA: "",
      descriptionTR: "",
      descriptionEN: "",
      descriptionRU: "",
      descriptionKA: "",
      usageTR: "",
      usageEN: "",
      usageRU: "",
      usageKA: "",
      ingredientsTR: "",
      ingredientsEN: "",
      ingredientsRU: "",
      ingredientsKA: "",
      imageUrl: "",
      order: 0,
      isActive: true,
    },
  });

  // Form for editing existing products
  const editForm = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: "",
      nameTR: "",
      nameEN: "",
      nameRU: "",
      nameKA: "",
      descriptionTR: "",
      descriptionEN: "",
      descriptionRU: "",
      descriptionKA: "",
      usageTR: "",
      usageEN: "",
      usageRU: "",
      usageKA: "",
      ingredientsTR: "",
      ingredientsEN: "",
      ingredientsRU: "",
      ingredientsKA: "",
      imageUrl: "",
      order: 0,
      isActive: true,
    },
  });

  // Add product mutation
  const addProductMutation = useMutation({
    mutationFn: async (data: InsertProduct) => {
      const res = await apiRequest("POST", API_ROUTES.PRODUCTS, data);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add product");
      }
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Product added successfully",
      });
      form.reset();
      setIsAddDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.PRODUCTS] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Edit product mutation
  const editProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertProduct> }) => {
      const res = await apiRequest("PUT", `${API_ROUTES.PRODUCTS}/${id}`, data);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update product");
      }
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
      editForm.reset();
      setIsEditDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.PRODUCTS] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `${API_ROUTES.PRODUCTS}/${id}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete product");
      }
      return true;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
      setIsDeleteDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: [API_ROUTES.PRODUCTS] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Open add dialog
  const handleOpenAddDialog = () => {
    form.reset();
    setIsAddDialogOpen(true);
  };

  // Open edit dialog
  const handleOpenEditDialog = (product: Product) => {
    setSelectedProduct(product);
    editForm.reset({
      slug: product.slug,
      nameTR: product.nameTR,
      nameEN: product.nameEN,
      nameRU: product.nameRU,
      nameKA: product.nameKA,
      descriptionTR: product.descriptionTR,
      descriptionEN: product.descriptionEN,
      descriptionRU: product.descriptionRU,
      descriptionKA: product.descriptionKA,
      usageTR: product.usageTR,
      usageEN: product.usageEN,
      usageRU: product.usageRU,
      usageKA: product.usageKA,
      ingredientsTR: product.ingredientsTR,
      ingredientsEN: product.ingredientsEN,
      ingredientsRU: product.ingredientsRU,
      ingredientsKA: product.ingredientsKA,
      imageUrl: product.imageUrl,
      order: product.order,
      isActive: product.isActive,
    });
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const handleOpenDeleteDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  // Form submission handlers
  const onSubmit = (data: FormSchemaType) => {
    addProductMutation.mutate(data);
  };

  const onSubmitEdit = (data: FormSchemaType) => {
    if (selectedProduct) {
      editProductMutation.mutate({ id: selectedProduct.id, data });
    }
  };

  const onConfirmDelete = () => {
    if (selectedProduct) {
      deleteProductMutation.mutate(selectedProduct.id);
    }
  };

  return (
    <AdminLayout title="Products Management">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Products</h2>
        <div className="flex space-x-3">
          <Button 
            variant="destructive" 
            onClick={() => {
              if (confirm("Bu işlem tüm ürünleri silecektir. Devam etmek istiyor musunuz?")) {
                setIsClearingProducts(true);
                apiRequest("POST", "/api/admin/clear-products")
                  .then(async (res) => {
                    const data = await res.json();
                    if (res.ok) {
                      toast({
                        title: "Başarılı",
                        description: "Tüm ürünler başarıyla silindi.",
                      });
                      queryClient.invalidateQueries({ queryKey: [API_ROUTES.PRODUCTS] });
                    } else {
                      toast({
                        title: "Hata",
                        description: data.message || "Ürünler silinirken bir hata oluştu",
                        variant: "destructive",
                      });
                    }
                  })
                  .catch((error) => {
                    toast({
                      title: "Hata",
                      description: error.message || "Ürünler silinirken bir hata oluştu",
                      variant: "destructive",
                    });
                  })
                  .finally(() => {
                    setIsClearingProducts(false);
                  });
              }
            }}
            disabled={isClearingProducts}
          >
            {isClearingProducts ? (
              <div className="flex items-center">
                <div className="animate-spin mr-2 h-4 w-4 border-b-2 border-primary"></div>
                Siliniyor...
              </div>
            ) : (
              <>
                <Eraser className="mr-2 h-4 w-4" />
                Tüm Ürünleri Sil
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              setIsFetchingVithair(true);
              apiRequest("POST", "/api/admin/sync-vithair-products")
                .then(async (res) => {
                  const data = await res.json();
                  if (res.ok) {
                    toast({
                      title: "Success",
                      description: `${data.count || 0} Vithair products synced successfully.`,
                    });
                    queryClient.invalidateQueries({ queryKey: [API_ROUTES.PRODUCTS] });
                  } else {
                    toast({
                      title: "Error",
                      description: data.message || "Failed to sync Vithair products",
                      variant: "destructive",
                    });
                  }
                })
                .catch((error) => {
                  toast({
                    title: "Error",
                    description: error.message || "Failed to sync Vithair products",
                    variant: "destructive",
                  });
                })
                .finally(() => {
                  setIsFetchingVithair(false);
                });
            }}
            disabled={isFetchingVithair}
          >
            {isFetchingVithair ? (
              <div className="flex items-center">
                <div className="animate-spin mr-2 h-4 w-4 border-b-2 border-primary"></div>
                Syncing...
              </div>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Sync Vithair Products
              </>
            )}
          </Button>
          <Button onClick={handleOpenAddDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products List</CardTitle>
          <CardDescription>Manage hair care and treatment products</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No products found. Add a new product to get started.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Slug</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      {product.isActive ? (
                        <div className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Active</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Inactive</span>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <img 
                          src={product.imageUrl} 
                          alt={product.nameTR} 
                          className="w-10 h-10 rounded-full object-cover border"
                        />
                        <div>
                          <div>{product.nameTR}</div>
                          <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {product.descriptionTR.substring(0, 50)}...
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{product.slug}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleOpenEditDialog(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-destructive"
                          onClick={() => handleOpenDeleteDialog(product)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new product to the catalog.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="product-slug" {...field} />
                      </FormControl>
                      <FormDescription>
                        URL-friendly identifier (e.g., hair-shampoo)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="/images/products/image.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Turkish Content */}
              <div className="border p-4 rounded-md">
                <h3 className="font-medium mb-4">Turkish Content</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="nameTR"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name (TR)</FormLabel>
                        <FormControl>
                          <Input placeholder="Product name in Turkish" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="descriptionTR"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (TR)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Product description in Turkish" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="usageTR"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Usage (TR)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Usage instructions in Turkish" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ingredientsTR"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ingredients (TR)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Ingredients list in Turkish" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* English Content */}
              <div className="border p-4 rounded-md">
                <h3 className="font-medium mb-4">English Content</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="nameEN"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name (EN)</FormLabel>
                        <FormControl>
                          <Input placeholder="Product name in English" {...field} />
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
                        <FormLabel>Description (EN)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Product description in English" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="usageEN"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Usage (EN)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Usage instructions in English" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ingredientsEN"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ingredients (EN)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Ingredients list in English" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Russian Content */}
              <div className="border p-4 rounded-md">
                <h3 className="font-medium mb-4">Russian Content</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="nameRU"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name (RU)</FormLabel>
                        <FormControl>
                          <Input placeholder="Product name in Russian" {...field} />
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
                        <FormLabel>Description (RU)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Product description in Russian" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="usageRU"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Usage (RU)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Usage instructions in Russian" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ingredientsRU"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ingredients (RU)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Ingredients list in Russian" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Georgian Content */}
              <div className="border p-4 rounded-md">
                <h3 className="font-medium mb-4">Georgian Content</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="nameKA"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name (KA)</FormLabel>
                        <FormControl>
                          <Input placeholder="Product name in Georgian" {...field} />
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
                        <FormLabel>Description (KA)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Product description in Georgian" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="usageKA"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Usage (KA)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Usage instructions in Georgian" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ingredientsKA"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ingredients (KA)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Ingredients list in Georgian" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormDescription>Lower numbers appear first</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-8">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Active</FormLabel>
                        <FormDescription>
                          Inactive products won't be displayed on the website
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={addProductMutation.isPending}>
                  {addProductMutation.isPending && (
                    <div className="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                  )}
                  Add Product
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the details for this product.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onSubmitEdit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={editForm.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="product-slug" {...field} />
                      </FormControl>
                      <FormDescription>
                        URL-friendly identifier (e.g., hair-shampoo)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="/images/products/image.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Turkish Content */}
              <div className="border p-4 rounded-md">
                <h3 className="font-medium mb-4">Turkish Content</h3>
                <div className="space-y-4">
                  <FormField
                    control={editForm.control}
                    name="nameTR"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name (TR)</FormLabel>
                        <FormControl>
                          <Input placeholder="Product name in Turkish" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="descriptionTR"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (TR)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Product description in Turkish" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="usageTR"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Usage (TR)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Usage instructions in Turkish" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="ingredientsTR"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ingredients (TR)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Ingredients list in Turkish" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* English Content */}
              <div className="border p-4 rounded-md">
                <h3 className="font-medium mb-4">English Content</h3>
                <div className="space-y-4">
                  <FormField
                    control={editForm.control}
                    name="nameEN"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name (EN)</FormLabel>
                        <FormControl>
                          <Input placeholder="Product name in English" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="descriptionEN"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (EN)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Product description in English" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="usageEN"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Usage (EN)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Usage instructions in English" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="ingredientsEN"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ingredients (EN)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Ingredients list in English" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Russian Content */}
              <div className="border p-4 rounded-md">
                <h3 className="font-medium mb-4">Russian Content</h3>
                <div className="space-y-4">
                  <FormField
                    control={editForm.control}
                    name="nameRU"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name (RU)</FormLabel>
                        <FormControl>
                          <Input placeholder="Product name in Russian" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="descriptionRU"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (RU)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Product description in Russian" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="usageRU"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Usage (RU)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Usage instructions in Russian" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="ingredientsRU"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ingredients (RU)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Ingredients list in Russian" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Georgian Content */}
              <div className="border p-4 rounded-md">
                <h3 className="font-medium mb-4">Georgian Content</h3>
                <div className="space-y-4">
                  <FormField
                    control={editForm.control}
                    name="nameKA"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name (KA)</FormLabel>
                        <FormControl>
                          <Input placeholder="Product name in Georgian" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="descriptionKA"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (KA)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Product description in Georgian" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="usageKA"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Usage (KA)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Usage instructions in Georgian" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="ingredientsKA"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ingredients (KA)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Ingredients list in Georgian" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={editForm.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormDescription>Lower numbers appear first</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-8">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Active</FormLabel>
                        <FormDescription>
                          Inactive products won't be displayed on the website
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={editProductMutation.isPending}>
                  {editProductMutation.isPending && (
                    <div className="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                  )}
                  Update Product
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={onConfirmDelete}
        title="Delete Product"
        description={`Are you sure you want to delete the product "${selectedProduct?.nameTR}"? This action cannot be undone.`}
        isPending={deleteProductMutation.isPending}
      />
    </AdminLayout>
  );
}