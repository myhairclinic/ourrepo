import { Pool } from 'pg';

// Create a function to get a database connection pool
export function getConnectionPool() {
  return new Pool({
    connectionString: process.env.DATABASE_URL,
  });
}

// Execute a database query with parameters
export async function executeQuery(query: string, params: any[] = []) {
  const pool = getConnectionPool();
  try {
    const result = await pool.query(query, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    pool.end();
  }
}

// Map database column names from snake_case to camelCase for product tables
export function mapProductFromDB(dbProduct: any): any {
  if (!dbProduct) return null;
  
  return {
    id: dbProduct.id,
    slug: dbProduct.slug,
    nameTR: dbProduct.name_tr,
    nameEN: dbProduct.name_en,
    nameRU: dbProduct.name_ru,
    nameKA: dbProduct.name_ka,
    descriptionTR: dbProduct.description_tr,
    descriptionEN: dbProduct.description_en,
    descriptionRU: dbProduct.description_ru,
    descriptionKA: dbProduct.description_ka,
    usageTR: dbProduct.usage_tr,
    usageEN: dbProduct.usage_en,
    usageRU: dbProduct.usage_ru,
    usageKA: dbProduct.usage_ka,
    ingredientsTR: dbProduct.ingredients_tr,
    ingredientsEN: dbProduct.ingredients_en,
    ingredientsRU: dbProduct.ingredients_ru,
    ingredientsKA: dbProduct.ingredients_ka,
    imageUrl: dbProduct.image_url,
    price: dbProduct.price,
    isNew: dbProduct.is_new,
    categoryId: dbProduct.category_id,
    categoryName: dbProduct.category_name,
    order: dbProduct.order,
    isActive: dbProduct.is_active,
    createdAt: dbProduct.created_at,
    updatedAt: dbProduct.updated_at
  };
} 