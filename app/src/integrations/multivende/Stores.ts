import { apiMultivende } from "../../shared/config/ApiMultivende";

interface Entry {
  _id: string;
  name: string;
  code: string | null;
  address: string | null;
  description: string | null;
  type: "store" | "warehouse";
  phoneAreaCode: string | null;
  phoneNumber: string | null;
  latitude: number;
  longitude: number;
  openHours: string | null;
  tags: string[] | null;
  position: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  CreatedById: string;
  UpdatedById: string;
  LocationId: string | null;
  TimezoneId: string | null;
  MerchantId: string;
  SalesGroupId: string | null;
}

interface Pagination {
  offset: number;
  limit: number;
  total_pages: number;
  current_page: number;
  next_page: number;
  previous_page: number;
  total_items: number;
}

interface StoresAndWarehouses {
  entries: Entry[];
  pagination: Pagination;
}

export class Stores {
  static async getStoresAndWarehouses(merchantId: string, page = 1) {
    const { data }: { data: StoresAndWarehouses } = await apiMultivende.get(
      `api/m/${merchantId}/stores-and-warehouses/p/${page}`,
    );
    console.log("stores", data);
    return data;
  }
}
