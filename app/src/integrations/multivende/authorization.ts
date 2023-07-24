import * as scheduler from "node-schedule";
import { apiMultivende } from "../../shared/config/ApiMultivende";

interface IAuthorization {
  _id: string;
  status: string;
  OauthClientId: string;
  MerchantId: string;
  MerchantAppId: string;
  CreatedById: string;
  UpdatedById: string;
  OwnerId: string;
  scopes: Record<string, boolean | { all: boolean }>;
  expiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
  updatedAt: string;
  createdAt: string;
  token: string;
}

export class Authorization {
  private static instance: Authorization;
  private session: IAuthorization | null;

  private constructor() {}

  static getInstance() {
    if (!Authorization.instance) {
      Authorization.instance = new Authorization();
    }
    return Authorization.instance;
  }

  async authenticate(code: string) {
    const { data }: { data: IAuthorization } = await apiMultivende.post("oauth/access-token", {
      client_id: 896123781342,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
    });
    this.session = data;
    apiMultivende.defaults.headers.common.Authorization = `Bearer ${this.session?.token}`;
    this.setCronRefreshToken();
    return data;
  }

  async refreshToken() {
    if (!this.session) throw new Error("Sesion not Found. Authenticated first");
    const { data }: { data: IAuthorization } = await apiMultivende.post(
      "https://app.multivende.com/oauth/access-token",
      {
        client_id: 896123781342,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: this.session.refreshToken,
      },
    );
    this.session = data;
    apiMultivende.defaults.headers.common.Authorization = `Bearer ${this.session?.token}`;
    console.log("Token refrescado");
  }

  private setCronRefreshToken(): void {
    if (!this.session) throw new Error("Sesion not Found. Authenticated first");
    const dateOffToken = new Date(this.session.expiresAt);
    dateOffToken.setHours(dateOffToken.getHours() - 1);

    scheduler.scheduleJob(dateOffToken, async () => {
      console.log("refrescara token");
      await this.refreshToken();
    });
  }
}
