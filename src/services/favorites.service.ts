// Real, callable endpoints — FavoritesController exists and is wired here
// for real: POST /favorites/toggle, GET /favorites.
import apiClient from "@/lib/axios";

export interface FavoriteWorkPost {
  id: number;
  title: string;
  categoryName: string;
  vendorBusinessName: string;
  city: string;
  price: number;
  primaryImageUrl?: string;
  averageRating: number;
  reviewCount: number;
}

export interface FavoriteItem {
  favoriteId: number;
  workPost: FavoriteWorkPost;
}

interface BackendFavoriteDto {
  favoriteId: number;
  workPost: FavoriteWorkPost;
}

export const favoritesService = {
  async getMyFavorites(): Promise<FavoriteItem[]> {
    const { data } = await apiClient.get<BackendFavoriteDto[]>("/favorites");
    return data;
  },

  /** Returns the new state: true if now favorited, false if removed. */
  async toggle(workPostId: number): Promise<boolean> {
    const { data } = await apiClient.post<{ workPostId: number; isFavorited: boolean }>("/favorites/toggle", {
      workPostId,
    });
    return data.isFavorited;
  },
};
