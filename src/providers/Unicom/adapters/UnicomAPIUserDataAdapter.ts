import { IUnicomUserDataRepository } from "../repositories/IUnicomUserDataRepository";
import axios from "axios";

const API_UNICOM_TOKEN = process.env.API_UNICOM_TOKEN;
const API_UNICOM_URL = process.env.API_UNICOM_URL;

export class UnicomAPIUserDataAdapter implements IUnicomUserDataRepository {
  private readonly baseUrl = API_UNICOM_URL;
  private readonly token = API_UNICOM_TOKEN;
  constructor() {}
  async getUserData() {
    if (!this.token) {
      throw new Error("Token not found");
    }

    if (!this.baseUrl) {
      throw new Error("URL not found");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`,
    };

    const url = `${this.baseUrl}/datos_varios/datos_cliente`;

    try {
      const response = await axios
        .get(url, {
          headers,
        })
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.error("Error:", error);
          return null;
        });

      if (!response) {
        return null;
      }

      return response;
    } catch (error) {
      return null;
    }
  }

  async updateUserData(userData: any) {
    throw new Error("Method not implemented.");
  }
}
