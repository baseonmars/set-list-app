import styled from "../styled-components";

const Button = styled.button`
  font-size: 1rem;
  padding: 0.25rem 1rem;
  border-radius: 3px;
  color: ${props => props.theme.text};
  border: 2px solid ${props => props.theme.primary};
  background-color: ${props => props.theme.primary};
  height: 40px;
`;

export const ButtonPanel = styled.div`
  display: flex;
  margin-bottom: 16px;

  > * {
    margin: 0 8px;
    &:first-child {
      margin-left: 0;
    }
  }
`;

export default Button;
