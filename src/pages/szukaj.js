import { graphql } from "gatsby"
import React, { useEffect, useState } from "react"
import PageHeader from "../components/PageHeader/PageHeader"
import {
  SearchProvider,
  useSearchState,
  useSearchDispatch,
} from "../components/contexts/searchContext"
import { Wrapper } from "../components/Wrapper/Wrapper"
import { ContentWrapper, Flex, Paragraph } from "../assets/styles/HomeStyles"
import LessonsGrid from "../components/LessonsGrid/LessonsGrid"
import { StyledGrid } from "../components/SectionsComponents/BlogSection"
import { fadeOutAnimation } from "../components/animations"
import { PostPreview } from "../components/SectionsComponents/BlogSection"
import slugify from "slugify"
import Pagination from "../components/Slider/Pagination"

const SearchPage = ({ data }) => {
  const {
    lessons: { nodes: lessons },
    blogArticles: { nodes: blogArticles },
    italianoArticles: { nodes: italianoArticles },
  } = data

  const { query } = useSearchState()
  const dispatch = useSearchDispatch()

  const [gridPage, setGridPage] = useState(0)
  const gridPageLength = 3
  const [italianoGridPage, setItalianoGridPage] = useState(0)
  const italianoGridPageLength = 3

  const [filteredLessons, setFilteredLessons] = useState(lessons)
  const [filteredArticles, setFilteredArticles] = useState(blogArticles)
  const [filteredItalianoArticles, setFilteredItalianoArticles] = useState(
    italianoArticles
  )

  useEffect(() => {
    const queryToUse = query.trim().toLowerCase()
    setFilteredLessons(
      lessons.filter(
        lesson =>
          lesson.lessonTitle.toLowerCase().includes(queryToUse) ||
          lesson.lessonNumber.toLowerCase().includes(queryToUse) ||
          lesson.lekcjaPoziom.toLowerCase().includes(queryToUse)
      )
    )
    setFilteredArticles(
      blogArticles.filter(
        article =>
          article.title.toLowerCase().includes(queryToUse) ||
          article.category.toLowerCase().includes(queryToUse) ||
          article.slug.toLowerCase().includes(queryToUse)
      )
    )
    setFilteredItalianoArticles(
      italianoArticles.filter(
        article =>
          article.title.toLowerCase().includes(queryToUse) ||
          article.category.toLowerCase().includes(queryToUse) ||
          article.slug.toLowerCase().includes(queryToUse)
      )
    )
  }, [query])

  return (
    <>
      <PageHeader
        search
        subheader={query}
        paragraph={`${
          filteredLessons.length +
          filteredArticles.length +
          filteredItalianoArticles.length
        } wyników wyszukiwania`}
        bg="brown"
        withNav
      />
      <Wrapper>
        <input
          value={query}
          onChange={e =>
            dispatch({ type: "SET_QUERY", payload: e.target.value })
          }
        />
        <h1>Querytouse: {query}</h1>
        <ContentWrapper
          direction="column"
          bg="white"
          padding="78px 102px 100px"
        >
          {filteredLessons.length > 0 && (
            <Flex
              width="100%"
              padding="0"
              margin="0 0 100px"
              flexDirection="column"
            >
              <Paragraph margin="0 0 33px 2px">Lekcje</Paragraph>
              <LessonsGrid
                max={filteredLessons.length}
                lessons={filteredLessons}
              />
            </Flex>
          )}

          <Flex width="100%" padding="0" margin="0 0 0" flexDirection="column">
            {filteredArticles.length > 0 && (
              <>
                <Paragraph margin="0 0 33px 2px">Blog</Paragraph>
                <StyledGrid
                  variants={fadeOutAnimation}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  itemsInRow={3}
                  maxHeightOfImages="218px"
                >
                  {filteredArticles.length >= 1 ? (
                    filteredArticles
                      .slice(
                        gridPage * gridPageLength,
                        (gridPage + 1) * gridPageLength
                      )
                      .map(post => (
                        <PostPreview
                          key={post.id}
                          variants={fadeOutAnimation}
                          initial="hidden"
                          animate="show"
                          exit="exit"
                          slug={slugify(post.slug, { lower: true })}
                          category={post.category}
                          title={post.title}
                          featuredImage={post.featuredimage}
                        />
                      ))
                  ) : (
                    <Paragraph
                      fontSize="36px"
                      lineHeight="1.11em"
                      letterSpacing="1px"
                      fontWeight="400"
                      fontFamily="Cormorant Garamond"
                    >
                      Brak artykułów do wyświetlenia.
                    </Paragraph>
                  )}
                </StyledGrid>
                <Pagination
                  length={Math.floor(blogArticles.length / gridPageLength)}
                  page={gridPage}
                  setPage={setGridPage}
                />
              </>
            )}
            {filteredItalianoArticles.length > 0 && (
              <>
                <Paragraph margin="100px 0 33px 2px">in Italiano</Paragraph>
                <StyledGrid
                  variants={fadeOutAnimation}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  itemsInRow={3}
                  maxHeightOfImages="218px"
                >
                  {filteredItalianoArticles.length >= 1 ? (
                    filteredItalianoArticles
                      .slice(
                        italianoGridPage * italianoGridPageLength,
                        (italianoGridPage + 1) * italianoGridPageLength
                      )
                      .map(post => (
                        <PostPreview
                          key={post.id}
                          variants={fadeOutAnimation}
                          initial="hidden"
                          animate="show"
                          exit="exit"
                          slug={slugify(post.slug, { lower: true })}
                          category={post.category}
                          title={post.title}
                          featuredImage={post.featuredimage}
                        />
                      ))
                  ) : (
                    <Paragraph
                      fontSize="36px"
                      lineHeight="1.11em"
                      letterSpacing="1px"
                      fontWeight="400"
                      fontFamily="Cormorant Garamond"
                    >
                      Brak artykułów do wyświetlenia.
                    </Paragraph>
                  )}
                </StyledGrid>
                <Pagination
                  length={Math.floor(
                    italianoArticles.length / italianoGridPageLength
                  )}
                  page={italianoGridPage}
                  setPage={setItalianoGridPage}
                />
              </>
            )}
          </Flex>
        </ContentWrapper>
      </Wrapper>
    </>
  )
}
export const query = graphql`
  {
    lessons: allDatoCmsLesson(sort: { fields: lessonNumber }) {
      nodes {
        id
        lekcjaPoziom
        lessonNumber
        lessonTitle
      }
    }
    blogArticles: allDatoCmsArticle(
      filter: { category: { in: ["Kultura", "Podróże", "Kuchnia", "Sztuka"] } }
    ) {
      nodes {
        title
        slug
        category
        id
        featuredimage {
          fluid(maxWidth: 800) {
            ...GatsbyDatoCmsFluid_tracedSVG
          }
        }
      }
    }

    italianoArticles: allDatoCmsArticle(
      filter: {
        category: { in: ["Frasi e citazioni", "Grammatica", "Vocabolario"] }
      }
    ) {
      nodes {
        title
        slug
        category
        id
        featuredimage {
          fluid(maxWidth: 800) {
            ...GatsbyDatoCmsFluid_tracedSVG
          }
        }
      }
    }
  }
`

export default SearchPage
