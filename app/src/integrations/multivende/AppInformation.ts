import { apiMultivende } from "../../shared/config/ApiMultivende";

interface DeveloperApp {
  _id: string;
  displayName: string;
  name: string;
  code: string;
  visibility: string;
  updatedAt: string;
  createdById: string;
  updatedById: string;
  status: string;
}

type Scopes = Record<string, boolean | { all: boolean }>;

interface MarketplaceConnection {
  _name: string;
  _id: string;
  name: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  updatedById: string;
  status: string;
  MerchantAppId: string;
}

interface IAppInformation {
  _id: string;
  MerchantId: string;
  DeveloperApp: DeveloperApp;
  scopes: Scopes;
  MarketplaceConnection: MarketplaceConnection;
}

export class AppInformation {
  static async getAppInformation() {
    const { data }: { data: IAppInformation } = await apiMultivende.get(`api/d/info`);
    return data;
  }
}
