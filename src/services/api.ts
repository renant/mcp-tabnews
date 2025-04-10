import { TABNEWS_API_URL } from "../config/configs.ts";
import { GetStatusResponse } from "../types/index.ts";

export async function getApiStatus(): Promise<GetStatusResponse> {
  const response = await fetch(`${TABNEWS_API_URL}/status`);
  const data = await response.json();

  return data as GetStatusResponse;
}
