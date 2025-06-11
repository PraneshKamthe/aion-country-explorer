import { FavoritesList } from "@/components/favorites-list";
import { AuthGuard } from "@/components/auth-guard";

export default function FavoritesPage() {
  return (
    <AuthGuard>
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">My Favorite Countries</h1>
        </div>
        <FavoritesList />
      </div>
    </AuthGuard>
  );
}
