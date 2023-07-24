import { apiMultivende } from "../../shared/config/ApiMultivende";

interface ProductRelocation {
  _id: string;
  amount: number;
  type: "DECREASE" | "INCREASE"; // Asegúrate de incluir todos los posibles valores aquí
  ProductRelocationCategoryId: string;
}

interface AvailableProductStock {
  _id: string;
  amount: number;
}

interface ProductEntry {
  code: string;
  _id: string;
  WarehouseId: string;
  productRelocation?: ProductRelocation;
  availableProductStock?: AvailableProductStock;
  amount?: number;
  error?: string;
  success: boolean;
}

export class Products {
  static async bulkUpdateStock(
    warehouse_id: string,
    body: Array<{ code: string; amount: number }>,
  ) {
    const { data }: { data: ProductEntry[] } = await apiMultivende.post(
      `api/product-stocks/stores-and-warehouses/${warehouse_id}/bulk-set`,
      body,
    );
    return data;
  }
}
