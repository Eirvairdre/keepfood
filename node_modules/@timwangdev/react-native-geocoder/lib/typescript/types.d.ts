export interface Position {
    lat: number;
    lng: number;
}
export interface Bounds {
    sw: Position;
    ne: Position;
}
export interface CircularRegion {
    center: Position;
    radius: number;
}
export declare type RequestHeaders = {
    [key: string]: string;
};
export interface GeocodingObject {
    position: Position;
    formattedAddress: string;
    feature: string | null;
    streetNumber: string | null;
    streetName: string | null;
    postalCode: string | null;
    locality: string | null;
    country: string;
    countryCode: string;
    adminArea: string | null;
    subAdminArea: string | null;
    subLocality: string | null;
}
export interface GeocoderOptions {
    apiKey?: string;
    bounds?: Bounds;
    locale?: string;
    maxResults?: number;
    regionIos?: CircularRegion;
    fallbackToGoogle?: boolean;
    forceGoogleOnIos?: boolean;
    requestHeaders?: RequestHeaders;
}
