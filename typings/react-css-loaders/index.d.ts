// Type definitions for react-css-loaders 0.0.5
// Project: https://github.com/LucasBassetti/react-css-loaders
// Definitions by: Dan Etherington <https://github.com/baseonmars>

declare module "react-css-loaders" {
  import * as ReactCSSLoaders from "react-css-loaders";
  import { Component } from "react";

  interface LoaderProps {
    color?: string;
    duration?: number;
    size?: number;
  }

  interface LoaderWithBackgroundProps extends LoaderProps {
    background?: string;
  }

  export class BarLoader extends Component<LoaderProps> {}
  export class BubbleLoader extends Component<LoaderProps> {}
  export class BubbleSpinLoader extends Component<LoaderProps> {}
  export class CometSpinLoader extends Component<LoaderProps> {}
  export class CylinderSpinLoader extends Component<LoaderProps> {}
  export class ResizeSpinLoader extends Component<LoaderWithBackgroundProps> {}
  export class RotateSpinLoader extends Component<LoaderProps> {}
  export class SpinLoader extends Component<LoaderWithBackgroundProps> {}
}
