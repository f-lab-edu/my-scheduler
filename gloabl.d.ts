declare module "*.svg" {
  import { ComponentType, SVGProps } from "react";
  const SVG: ComponentType<SVGProps<SVGSVGElement>>;
  export default SVG;
}
