/**
 * Item29: Be Liberal in what you accept and strict in what you produce
 *
 * Things to remember
 * - input types tend to be broader than output types
 * - Optional props and union types are more common in parameter types than return types
 *
 * - to reuse type between parameters and return types, introduce a canonical form for return types and a looser form for parameters
 */

// bad example
interface CameraOptions {
  center?: LngLat;
  zoom?: number;
  bearing?: number;
  pitch?: number;
}
type LngLat =
  | { lng: number; lat: number }
  | { lon: number; lat: number }
  | [number, number];

type LngLatBounds =
  | { northeast: LngLat; southeast: LngLat }
  | [LngLat, LngLat]
  | [number, number, number, number];

declare function setCamera(camera: CameraOptions): void;
declare function viewportForBounds(bounds: LngLatBounds): CameraOptions;

// viewportForBounds is liberal not just in what it accepts but also in what in produces
function focusOnFeature(f: Feature) {
  const bounds = calculateBoundingBox(f);
  const camera = viewportForBounds(bounds);
  setCamera(camera);
  const {
    center: { lat, lng },
    zoom,
  } = camera;
  // ~~~ Property 'lat' does not exist on type ...
  // ~~~ Property 'lng' does not exist on type ...
  zoom; // Type is number | undefined
  window.location.search = `?v=@${lat},${lng}z${zoom}`;
}

// better
interface LngLat2 {
  lng: number;
  lat: number;
}
type LngLat2Like = LngLat | { lon: number; lat: number } | [number, number];
interface Camera2 {
  center: LngLat;
  zoom: number;
  bearing: number;
  pitch: number;
}
interface CameraOptions2 extends Omit<Partial<Camera2>, 'center'> {
  center?: LngLat2Like;
}
type LngLatBounds2 =
  | { northeast: LngLat2Like; southwest: LngLat2Like }
  | [LngLat2Like, LngLat2Like]
  | [number, number, number, number];
