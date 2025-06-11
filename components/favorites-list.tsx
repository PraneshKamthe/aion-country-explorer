"use client";

import { useFavoritesStore } from "@/store/favorites";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, MapPin, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useState } from "react";

export function FavoritesList() {
  const { favorites, removeFavorite } = useFavoritesStore();
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (cca2: string) => {
    setImageErrors((prev) => new Set(prev.add(cca2)));
  };

  const handleRemoveFavorite = (
    cca2: string,
    countryName: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    removeFavorite(cca2);
    toast.success(`${countryName} removed from favorites`);
  };

  const formatPopulation = (population: number) => {
    if (population >= 1000000) {
      return `${(population / 1000000).toFixed(1)}M`;
    } else if (population >= 1000) {
      return `${(population / 1000).toFixed(0)}K`;
    }
    return population.toLocaleString();
  };

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-semibold mb-2">No favorites added yet</h3>
        <p className="text-muted-foreground mb-6">
          Explore countries and add them to your favorites!
        </p>

        <Link href="/" className="underline">
          Browse Countries
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {favorites &&
        favorites?.length > 0 &&
        favorites.map((country) => (
          <Link
            key={country.cca2}
            href={`/country/${country.cca2.toLowerCase()}`}
            className="group"
          >
            <Card className="h-full hover:shadow-lg cursor-pointer border-2 hover:border-primary/20">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg bg-muted">
                    {!imageErrors.has(country.cca2) ? (
                      <Image
                        src={country.flags.svg}
                        alt={
                          country.flags.alt || `Flag of ${country.name.common}`
                        }
                        fill
                        className="object-cover"
                        onError={() => handleImageError(country.cca2)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        🏳️
                      </div>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 flex space-x-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 rounded-full shadow-md bg-red-500 text-white hover:bg-red-600 transition-all duration-200"
                      title="Remove from favorites"
                      onClick={(e) =>
                        handleRemoveFavorite(
                          country.cca2,
                          country.name.common,
                          e
                        )
                      }
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors duration-200">
                      {country.name.common}
                    </h3>
                    <Badge variant="secondary" className="mb-3">
                      {country.region}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="font-medium">Population:</span>
                      <span className="ml-auto font-semibold text-foreground">
                        {formatPopulation(country.population)}
                      </span>
                    </div>

                    {country.capital && country.capital.length > 0 && (
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="font-medium">Capital:</span>
                        <span className="ml-auto font-semibold text-foreground truncate">
                          {country.capital[0]}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
    </div>
  );
}
