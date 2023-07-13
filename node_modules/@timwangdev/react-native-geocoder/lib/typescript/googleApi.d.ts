import { Position, Bounds, GeocodingObject, RequestHeaders } from './types';
declare const _default: {
    geocodePosition(apiKey: string, position: Position, language: string, headers?: RequestHeaders | undefined): Promise<GeocodingObject[]>;
    geocodeAddress(apiKey: string, address: string, language: string, headers?: RequestHeaders | undefined): Promise<GeocodingObject[]>;
    geocodeAddressWithBounds(apiKey: string, address: string, bounds: Bounds, language: string, headers?: RequestHeaders | undefined): Promise<GeocodingObject[]>;
};
export default _default;
