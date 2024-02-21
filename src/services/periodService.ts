import axios from "axios";
import { apiUrl } from "../config";
import type { Period } from "../utils/types";

export async function fetchAllPeriods() {
  try {
    const periods = (await axios.get(`${apiUrl}/periods`)).data as Period[];
    return periods;
  } catch (e) {
    console.error(`Error while fetching periods: ${e}`);
    return [];
  }
}
