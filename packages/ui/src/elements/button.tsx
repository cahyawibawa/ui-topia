// @ui/topia/src/elements/button.tsx
import * as React from 'react'
import { Black1 } from './buttons/black-1'
import { Black10 } from './buttons/black-10'
import { Black11 } from './buttons/black-11'
import { Black13 } from './buttons/black-13'
import { Black14 } from './buttons/black-14'
import { Black2 } from './buttons/black-2'
import { Black5 } from './buttons/black-5'
import { Black6 } from './buttons/black-6'
import { Black8 } from './buttons/black-8'
import { Black9 } from './buttons/black-9'
import { BlackIcon1 } from './buttons/black-icon-1'
import { BlackIcon11 } from './buttons/black-icon-11'
import { BlackIcon2 } from './buttons/black-icon-2'
import { BlackIcon3 } from './buttons/black-icon-3'
import { BlackIcon4 } from './buttons/black-icon-4'
import { BlackIcon5 } from './buttons/black-icon-5'
import { BlackIcon6 } from './buttons/black-icon-6'
import { BlackIcon8 } from './buttons/black-icon-8'
import { BlackRound3 } from './buttons/black-round-3'
import { BlackRound4 } from './buttons/black-round-4'
import { BlackSm1 } from './buttons/black-sm-1'
import { BlackSm2 } from './buttons/black-sm-2'
import { BlackSmLoading1 } from './buttons/black-sm-loading-1'
import { BlackSquare1 } from './buttons/black-square-1'
import { GreySm1 } from './buttons/grey-sm-1'
import { Letters1 } from './buttons/letters-1'
import { Letters2 } from './buttons/letters-2'
import { Letters3 } from './buttons/letters-3'
import { Letters4 } from './buttons/letters-4'
import { Neumorphism } from './buttons/neumorphism'
import { Outline3 } from './buttons/outline-3'
import { Shadow1 } from './buttons/shadow-1'
import { Shadow2 } from './buttons/shadow-2'
import { Shadow4 } from './buttons/shadow-4'
import { Shadow5 } from './buttons/shadow-5'
import { SquareOutline1 } from './buttons/square-outline'
import { SubtleSkeuomorphic1 } from './buttons/subtle-skeumorphic-1'
import { SubtleSkeuomorphic3 } from './buttons/subtle-skeumorphic-3'
import { White1 } from './buttons/white-1'
import { White2 } from './buttons/white-2'
import { White3 } from './buttons/white-3'

export const BUTTONS = [
  Neumorphism,
  BlackIcon11,
  White1,
  White2,
  White3,
  Shadow1,
  Shadow2,
  // Shadow3,
  Shadow4,
  Shadow5,
  Letters1,
  Letters2,
  Letters3,
  Letters4,
  // Outline1,
  // Outline2,
  Outline3,
  // Outline4,
  SquareOutline1,
  // Link1,
  // Link2,
  // Link3,
  // Link4,
  // Link5,
  // Link6,
  // Link7,
  // Link8,
  SubtleSkeuomorphic1,
  // SubtleSkeuomorphic2,
  SubtleSkeuomorphic3,
  // SubtleSkeuomorphic4,
  // SubtleSkeuomorphic5,
  GreySm1,
  Black1,
  Black2,
  // Black3,
  // Black4,
  Black5,
  Black6,
  // Black7,
  Black8,
  Black9,
  Black10,
  Black11,
  // Black12,
  Black13,
  Black14,
  // BlackLoading1,
  BlackIcon1,
  BlackIcon2,
  BlackIcon3,
  BlackIcon4,
  BlackIcon5,
  BlackIcon6,
  // BlackIcon7,
  BlackIcon8,
  // BlackIcon9,
  // BlackIcon10,
  BlackSm1,
  BlackSm2,
  BlackSmLoading1,
  // BlackRound1,
  // BlackRound2,
  BlackRound3,
  BlackRound4,
  BlackSquare1,
  // BlueLoading1,
  // Blue1,
  // Blue2,
  // Blue3,
  // Blue4,
]

interface ButtonsComponentProps {
  wrapper?: React.ComponentType<{ children: React.ReactNode }>
}

const ButtonsComponent: React.FC<ButtonsComponentProps> = ({
  wrapper: Wrapper,
}) => {
  return (
    <>
      {BUTTONS.map((Button, index) =>
        Wrapper ? (
          <Wrapper key={index}>
            <Button />
          </Wrapper>
        ) : (
          <Button key={index} />
        )
      )}
    </>
  )
}

export default ButtonsComponent
