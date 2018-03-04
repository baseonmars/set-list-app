import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

import Theme, { theme } from "./theme";

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<Theme>;

interface StyledComponent {
  className?: string;
}

export {
  css,
  injectGlobal,
  keyframes,
  ThemeProvider,
  Theme,
  theme,
  StyledComponent
};
export default styled;
