import { Position, GeocoderOptions, GeocodingObject } from './types';
declare function geocodePositionGoogle(position: Position, options?: GeocoderOptions): Promise<GeocodingObject[]>;
declare function geocodeAddressGoogle(address: string, options?: GeocoderOptions): Promise<GeocodingObject[]>;
declare function geocodePosition(position: Position, options?: GeocoderOptions): Promise<GeocodingObject[]>;
declare function geocodeAddress(address: string, options?: GeocoderOptions): Promise<GeocodingObject[]>;
declare const _default: {
    geocodePosition: typeof geocodePosition;
    geocodePositionGoogle: typeof geocodePositionGoogle;
    geocodeAddress: typeof geocodeAddress;
    geocodeAddressGoogle: typeof geocodeAddressGoogle;
};
export default _default;
