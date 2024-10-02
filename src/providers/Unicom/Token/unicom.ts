const API_UNICOM_URL = process.env.NEXT_PUBLIC_API_UNICOM_URL;

export interface TokenUNICOM {
  token: string;
  vencimiento: string;
}

export interface bodyTokenUNICOM {
  usuario: string;
  password: string;
  usuario_api: string;
}

export type headersTokenUNICOM = {
  "Content-Type": "application/json";
};

export type URLTokenUNICOM = string;
