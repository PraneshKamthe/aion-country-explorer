"use client";

import { useFavoritesStore } from "@/store/favorites";
import { useAuthStore } from "@/store/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Users,
  MapPin,
  Globe,
  DollarSign,
  Languages,
  ArrowLeft,
  ExternalLink,
  Clock,
  Ruler,
  Globe2,
  Car,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Country {
  cca2: string;
  name: {
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  flags: {
    svg: string;
    alt?: string;
  };
  population: number;
  region: string;
  subregion?: string;
  capital?: string[];
  tld?: string[];
  currencies?: {
    [key: string]: {
      name: string;
      symbol?: string;
    };
  };
  languages?: {
    [key: string]: string;
  };
  borders?: string[];
  timezones?: string[];
  area?: number;
  unMember?: boolean;
  car?: {
    side: string;
  };
}

interface BorderCountry {
  name: {
    common: string;
  };
  cca2: string;
}

interface CountryDetailProps {
  country: Country;
  borderCountries: BorderCountry[];
}

export function CountryDetail({
  country,
  borderCountries,
}: CountryDetailProps) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const { isAuthenticated } = useAuthStore();
  const [imageError, setImageError] = useState(false);

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to add favorites");
      return;
    }

    const countryForFavorites = {
      cca2: country?.cca2,
      name: { common: country?.name.common },
      flags: country?.flags,
      population: country?.population,
      region: country?.region,
      capital: country?.capital,
    };

    toggleFavorite(countryForFavorites);
    const action = isFavorite(country?.cca2) ? "added to" : "removed from";
    toast.success(`${country?.name.common} ${action} favorites`);
  };

  const formatPopulation = (population: number) => {
    return population.toLocaleString();
  };

  const getNativeName = () => {
    if (!country?.name?.nativeName) return null;
    const firstNativeName = Object.values(country?.name?.nativeName)[0];
    return firstNativeName?.common || firstNativeName?.official;
  };

  const getCurrencies = () => {
    if (!country?.currencies) return "N/A";
    return Object.values(country?.currencies)
      .map(
        (currency) =>
          `${currency?.name} ${currency?.symbol ? `(${currency?.symbol})` : ""}`
      )
      .join(", ");
  };

  const getLanguages = () => {
    if (!country?.languages) return "N/A";
    return Object.values(country?.languages).join(", ");
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Button
          asChild
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Countries</span>
          </Link>
        </Button>

        <Button
          onClick={handleFavoriteClick}
          variant={
            isAuthenticated && isFavorite(country?.cca2) ? "default" : "outline"
          }
          className="flex items-center space-x-2"
        >
          <Heart
            className={`h-4 w-4 ${
              isAuthenticated && isFavorite(country?.cca2) ? "fill-current" : ""
            }`}
          />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* <<<<<<<----  Flag and Basic Info --------->>>>>>>>. */}
        <Card>
          <CardContent className="p-6">
            <div className="aspect-video relative overflow-hidden rounded-lg bg-muted mb-6">
              {!imageError ? (
                <Image
                  src={country?.flags.svg}
                  alt={country?.flags.alt || `Flag of ${country?.name.common}`}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  🏳️
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {country?.name?.common}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {country?.name?.official}
                </p>
                {getNativeName() && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Native: {getNativeName()}
                  </p>
                )}

                {country?.subregion && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Subregion: {country?.subregion}
                  </p>
                )}
              </div>

              <Badge variant="secondary" className="text-sm">
                {country?.region}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* << <<<<<< Detailed Information ----->>>>>>>>>>>>> */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Country Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Population</span>
                </div>
                <span className="font-semibold">
                  {formatPopulation(country?.population)}
                </span>
              </div>

              {country?.capital && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Capital</span>
                  </div>
                  <span className="font-semibold">
                    {country?.capital.join(", ")}
                  </span>
                </div>
              )}

              {country?.tld && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Top Level Domain</span>
                  </div>
                  <span className="font-semibold">
                    {country?.tld.join(", ")}
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Currency</span>
                </div>
                <span className="font-semibold text-right max-w-[200px]">
                  {getCurrencies()}
                </span>
              </div>

              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Languages className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Languages</span>
                </div>
                <span className="font-semibold text-right max-w-[200px]">
                  {getLanguages()}
                </span>
              </div>

              {country?.timezones && (
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Timezones</span>
                  </div>
                  <span className="font-semibold text-right max-w-[200px]">
                    {country?.timezones.join(", ")}
                  </span>
                </div>
              )}

              {country?.area && (
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Ruler className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Area</span>
                  </div>
                  <span className="font-semibold text-right">
                    {country?.area.toLocaleString()} km²
                  </span>
                </div>
              )}

              {country?.unMember !== undefined && (
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe2 className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">UN Member</span>
                  </div>
                  <span className="font-semibold text-right">
                    {country?.unMember ? "Yes" : "No"}
                  </span>
                </div>
              )}

              {country?.car && (
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Driving Side</span>
                  </div>
                  <span className="font-semibold text-right capitalize">
                    {country?.car?.side}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ------- Border Countries  ------->>>>> */}
      {
        <Card>
          <CardHeader>
            <CardTitle>Border Countries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {borderCountries?.length > 0
                ? borderCountries.map((borderCountry) => (
                    <Button
                      key={borderCountry.cca2}
                      asChild
                      variant="outline"
                      className="h-auto py-3 px-4 text-center"
                    >
                      <Link
                        href={`/country/${borderCountry.cca2.toLowerCase()}`}
                      >
                        {borderCountry?.name?.common}
                      </Link>
                    </Button>
                  ))
                : `No Border Countries`}
            </div>
          </CardContent>
        </Card>
      }
    </div>
  );
}
