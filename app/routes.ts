import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("dicom-viewer", "routes/dicom-viewer.tsx"),
] satisfies RouteConfig;
