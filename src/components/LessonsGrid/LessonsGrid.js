import { AnimateSharedLayout } from "framer-motion"
import React from "react"
import styled from "styled-components"
import { Paragraph } from "../../assets/styles/HomeStyles"
import Lesson from "../Lesson/Lesson"

const LessonsGridStyles = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 53px 73px;
`

const LessonsGrid = ({ max = 1, lessons = [] }) => {
  return (
    <AnimateSharedLayout type="crossfade">
      {lessons.length > 0 ? (
        <LessonsGridStyles>
          {lessons.slice(0, max).map(lesson => (
            <Lesson key={lesson.id} lesson={lesson} />
          ))}
        </LessonsGridStyles>
      ) : (
        <Paragraph
          fontSize="36px"
          lineHeight="1.11em"
          letterSpacing="1px"
          fontWeight="400"
          fontFamily="Cormorant Garamond"
        >
          Brak lekcji do wyświetlenia.
        </Paragraph>
      )}
    </AnimateSharedLayout>
  )
}

export default LessonsGrid
