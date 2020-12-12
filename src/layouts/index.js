import React from "react"
import GlobalStyle from "../assets/styles/GlobalStyle"
import Navigation from "../components/Navigation/Navigation"
import ContentWrapper from "../components/ContentWrapper/ContentWrapper"
import styled from "styled-components"
import { AnimatePresence, motion } from "framer-motion"
import { useLocation } from "@reach/router"
import Footer from "../components/Footer/Footer"
import { SearchProvider } from "../components/contexts/searchContext"
import {
  MenuProvider,
  useMenuState,
} from "../components/contexts/mobileMenuContext"
import ScrollToTop from "react-scroll-to-top"
import { HiOutlineArrowNarrowUp } from "react-icons/hi"
const Wrapper = styled(motion.div)`
  margin: 0 auto;
`

const LocationHeaderBgMap = {
  "/": "light",
  "/wloski-od-zera": "green",
  "/blog": "red",
}

const LocationFooterBgMap = {
  "/": "red",
  "/wloski-od-zera": "green",
  "/blog/": "blue",
}

const PageLayout = ({ children }) => {
  const location = useLocation()
  console.log(location.pathname)
  const getHeaderBgFromLocation = () => {
    if (location.pathname === "/") {
      return "light"
    }
    if (location.pathname.includes("wloski-od-zera")) {
      return "green"
    }
    if (location.pathname.includes("in-italiano")) {
      return "blue"
    }

    if (location.pathname.includes("blog")) {
      return "red"
    }

    if (
      location.pathname.includes("bottega") ||
      location.pathname.includes("o-mnie") ||
      location.pathname.includes("szukaj")
    ) {
      return "brown"
    }
  }
  const getFooterBgFromLocation = () => {
    if (location.pathname === "/" || location.pathname.includes("blog")) {
      return "red"
    }
    if (location.pathname.includes("wloski-od-zera")) {
      return "green"
    }
    if (
      location.pathname.includes("bottega") ||
      location.pathname.includes("o-mnie") ||
      location.pathname.includes("szukaj")
    ) {
      return "brown"
    }
    if (location.pathname.includes("in-italiano")) {
      return "blue"
    }
  }

  return (
    <MenuProvider>
      <SearchProvider>
        <Wrapper>
          <GlobalStyle />
          <Navigation bg={getHeaderBgFromLocation()} />
          <ContentWrapper>{children}</ContentWrapper>
          <Footer bg={getFooterBgFromLocation()} />
        </Wrapper>
        <ScrollToTop
          smooth
          top={700}
          className="scroll-to-top"
          component={
            <HiOutlineArrowNarrowUp size="26px" color="var(--beige-2)" />
          }
        />
      </SearchProvider>
    </MenuProvider>
  )
}
export default PageLayout
