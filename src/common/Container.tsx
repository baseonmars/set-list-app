import React, { ReactNode } from "react";
import styled, { StyledComponent } from "./styled-components";

const Container: React.SFC<StyledComponent> = ({ className, children }) => (
  <div className={className}>{children}</div>
);

const StyledContainer = styled(Container)`
  padding: 16px;
  max-width: 800px;
  margin: 0 auto;
`;

export default StyledContainer;
