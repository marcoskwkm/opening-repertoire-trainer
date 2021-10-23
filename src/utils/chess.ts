import { ChessInstance } from 'chess.js'
import type { Key } from 'chessground/types'

export const getDests = (chess: ChessInstance) => {
  const dests = new Map<Key, Key[]>()

  chess.SQUARES.forEach((square) => {
    const moves = chess.moves({ square, verbose: true })
    if (moves.length > 0) {
      dests.set(
        square,
        moves.map((move) => move.to)
      )
    }
  })

  return dests
}

export const getColor = (chess: ChessInstance) =>
  chess.turn() === 'w' ? 'white' : 'black'
