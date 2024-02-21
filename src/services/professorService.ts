import axios from "axios";
import { Course, Professor, Review } from "../utils/types";
import { apiUrl } from "../config";

export async function fetchProfessorsWithKeys(keys: string[]) {
  try {
    const professors: any[] = (
      await axios.get(`${apiUrl}/professors`, {
        params: {
          keys: keys.reduce((acc, current) => acc + "," + current),
        },
      })
    ).data;
    return professors;
  } catch (e) {
    console.error(`Error fetching professors with keys ${keys}: ${e}`);
    return [];
  }
}

export async function fetchProfessorById(id: string) {
  try {
    const professor: Professor = (await axios.get(`${apiUrl}/professors/${id}`))
      .data;
    return professor;
  } catch (e) {
    console.error(`Error fetching professor: ${e}`);
    return null;
  }
}

export async function fetchProfessorReviews(id: string) {
  try {
    const reviews: Review[] = (
      await axios.get(`${apiUrl}/professors/${id}/reviews`)
    ).data;
    return reviews;
  } catch (e) {
    console.error(`Error fetching reviews: ${e}`);
    return [];
  }
}

export async function fetchProfessorCourses(id: string) {
  try {
    const courses: Course[] = (
      await axios.get(`${apiUrl}/professors/${id}/courses`)
    ).data;
    return courses;
  } catch (e) {
    console.error(`Error fetching courses: ${e}`);
    return [];
  }
}
