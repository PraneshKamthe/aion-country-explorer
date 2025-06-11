"use client";

import { useState, useMemo } from "react";
import { useSearchStore } from "@/store/search";
import { useFavoritesStore } from "@/store/favorites";
import { useAuthStore } from "@/store/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

interface Country {
  cca2: string;
  name: {
    common: string;
  };
  flags: {
    svg: string;
    alt?: string;
  };
  population: number;
  region: string;
  capital?: string[];
}

interface CountryGridProps {
  countries: Country[];
}

export function CountryGrid({ countries }: CountryGridProps) {
  const { searchTerm, selectedRegion } = useSearchStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const { isAuthenticated } = useAuthStore();
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRegion =
        !selectedRegion || country.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [countries, searchTerm, selectedRegion]);

  const handleImageError = (cca2: string) => {
    setImageErrors((prev) => new Set(prev.add(cca2)));
  };

  const handleFavoriteClick = (country: Country, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please log in to add favorites");
      return;
    }

    toggleFavorite(country);
    const action = isFavorite(country.cca2) ? "added to" : "removed from";
    toast.success(`${country.name.common} ${action} favorites`);
  };

  const formatPopulation = (population: number) => {
    if (population >= 1000000) {
      return `${(population / 1000000).toFixed(1)}M`;
    } else if (population >= 1000) {
      return `${(population / 1000).toFixed(0)}K`;
    }
    return population.toLocaleString();
  };

  if (filteredCountries.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🌍</div>
        <h3 className="text-2xl font-semibold mb-2">No countries found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredCountries.map((country) => (
        <Link
          key={country?.cca2}
          href={`/country/${country.cca2.toLowerCase()}`}
          className="group"
        >
          <Card className="h-full transition-all duration-300 hover:shadow-lg  cursor-pointer border-2 hover:border-primary/20">
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
                      className="object-cover transition-transform"
                      onError={() => handleImageError(country.cca2)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      🏳️
                    </div>
                  )}
                </div>

                <Button
                  variant="secondary"
                  size="icon"
                  className={`absolute top-3 right-3 h-8 w-8 rounded-full shadow-md transition-all duration-200 ${
                    isAuthenticated && isFavorite(country.cca2)
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-white/90 text-gray-600 hover:bg-white hover:text-red-500"
                  }`}
                  onClick={(e) => handleFavoriteClick(country, e)}
                >
                  <Heart
                    className={`h-4 w-4 transition-all duration-200 ${
                      isAuthenticated && isFavorite(country.cca2)
                        ? "fill-current"
                        : ""
                    }`}
                  />
                </Button>
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
