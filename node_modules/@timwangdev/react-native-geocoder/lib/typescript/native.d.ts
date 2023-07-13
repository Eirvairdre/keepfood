import { GeocodingObject, Position, GeocoderOptions } from './types';
interface NativeImpl {
    geocodePosition: (position: Position, locale: string, maxResults: number) => Promise<GeocodingObject[]>;
    geocodeAddress: (address: string, locale: string, maxResults: number) => Promise<GeocodingObject[]>;
    geocodeAddressInRegion: (address: string, lat: number, lng: number, radius: number, locale: string, maxResults: number) => Promise<GeocodingObject[]>;
    geocodePositionAndroid: (position: Position, config: GeocoderOptions) => Promise<GeocodingObject[]>;
    geocodeAddressAndroid: (address: string, config: GeocoderOptions) => Promise<GeocodingObject[]>;
}
declare const _default: NativeImpl;
export default _default;
