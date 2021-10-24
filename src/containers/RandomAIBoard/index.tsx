import React from 'react'
import type { ChessInstance, Square } from 'chess.js'
import type { Api } from 'chessground/api'

import Board from '../../components/Board'
import { getColor, getDests } from '../../utils/chess'
import { Key } from 'chessground/types'

interface Props {
  className?: string
}

const makeRandomMove = (chessApi: ChessInstance, boardApi: Api) => {
  const dests = getDests(chessApi)
  const moves: { from: Square; to: Square }[] = []

  dests.forEach((tos, from) =>
    tos.forEach((to) => moves.push({ from: from as Square, to: to as Square }))
  )

  const randomMove = moves[Math.floor(moves.length * Math.random())]

  if (randomMove) {
    chessApi.move(randomMove)
    boardApi.move(randomMove.from, randomMove.to)
    boardApi.set({
      check: chessApi.in_check(),
      turnColor: getColor(chessApi),
      movable: {
        color: getColor(chessApi),
        dests: getDests(chessApi),
      },
    })
  }
}

const handleMove = (
  chessApi: ChessInstance,
  boardApi: Api,
  orig: Key,
  dest: Key
) => {
  if (!chessApi || !boardApi || orig === 'a0' || dest === 'a0') {
    return
  }

  chessApi.move({ from: orig, to: dest })
  boardApi.set({
    check: chessApi.in_check(),
    turnColor: getColor(chessApi),
    movable: {
      color: getColor(chessApi),
      dests: undefined,
    },
  })

  setTimeout(() => makeRandomMove(chessApi, boardApi), 500)
}

const handleReady = (chessApi: ChessInstance, boardApi: Api) => {
  boardApi.set({
    movable: {
      color: 'white',
      free: false,
      dests: getDests(chessApi),
    },
  })
}

const RandomAIBoard: React.FC<Props> = (props) => {
  return (
    <Board
      className={props.className}
      onReady={handleReady}
      onMove={handleMove}
    />
  )
}

export default RandomAIBoard
