/** * Defines the structure for a single artwork object based on the API's "data" array.
 * We only include the fields required by the application.
 */
// src/types/artwork.ts
export interface Artwork {
  id: number;
  title: string;
  place_of_origin: string | null;
  artist_display: string;
  inscriptions: string | null;
  date_start: number | null;
  date_end: number | null;
}

/** * Defines the structure of the entire API response from api.artic.edu.
 */
export interface ApiResponse {
  pagination: {
    total: number;
    limit: number;
    current_page: number;
  };
  data: Artwork[];
}