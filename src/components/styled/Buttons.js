import styled from 'styled-components'
import Button from 'react-bootstrap/Button'

import { primary, accent, light } from './colors'

const StyledButton = styled(Button)`
  background: ${primary};
  border: 1px solid ${light};
  color: white;
  margin-top: 1em;

  &:hover, &:focus {
    color: ${accent}};
  }
`

// Base styled button
export default StyledButton
