import axios from "axios";
import { CreatedReview } from "../utils/types";
import { apiUrl } from "../config";

export async function postReview(review: CreatedReview, authHeader: string) {
  try {
    axios.post(`${apiUrl}/reviews`, review, {
      headers: {
        Authorization: authHeader,
      },
    });
  } catch (error) {
    console.error(`Error inserting review: ${error}`);
  }
}
