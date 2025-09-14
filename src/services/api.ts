// src/services/api.ts
import axios from 'axios';
import type { ApiResponse } from '../types/artwork';

const API_BASE_URL = 'https://api.artic.edu/api/v1/artworks';

// Define the specific fields we want the API to return.
const fields = [
  'id',
  'title',
  'place_of_origin',
  'artist_display',
  'inscriptions',
  'date_start',
  'date_end'
].join(',');

/**
 * Fetches a paginated list of artworks from the Art Institute of Chicago API.
 * @param page - The page number to fetch (1-based).
 * @param limit - The number of items per page.
 * @returns A promise that resolves to an object with the artworks array and total record count.
 */
export const fetchArtworks = async (page: number, limit: number) => {
  try {
    const response = await axios.get<ApiResponse>(API_BASE_URL, {
      params: {
        page: page,
        limit: limit,
        fields: fields,
      },
    });

    return {
      data: response.data.data,
      totalRecords: response.data.pagination.total,
    };

  } catch (error) {
    console.error("Error fetching artworks:", error);
    return { data: [], totalRecords: 0 };
  }
};