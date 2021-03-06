import { motion } from "framer-motion"
import React from "react"
import styled from "styled-components"

const StyledGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${({ minWidth }) => (minWidth ? minWidth : "350px")}, 1fr)
  );
  grid-gap: ${({ gridGap }) => (gridGap ? gridGap : "20px")};
  padding-bottom: 65px;
`
const GridWrapper = ({ children, minWidth, gridGap }) => (
  <StyledGrid minWidth={minWidth} gridGap={gridGap}>
    {children}
  </StyledGrid>
)

export default GridWrapper
