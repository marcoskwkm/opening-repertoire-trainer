import React, { useCallback, useEffect, useRef } from 'react'
import Chess from 'chess.js'
import type { ChessInstance } from 'chess.js'
import { Chessground } from 'chessground'
import type { Api } from 'chessground/api'
import type { Key } from 'chessground/types'
import classNames from 'classnames'

import { getColor, getDests } from '../utils/chess'

interface Props {
  className?: string
}

const Board: React.FC<Props> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const chessApi = useRef<ChessInstance>()
  const boardApi = useRef<Api>()

  const handleMove = useCallback((orig: Key, dest: Key) => {
    if (
      !chessApi.current ||
      !boardApi.current ||
      orig === 'a0' ||
      dest === 'a0'
    ) {
      return
    }

    chessApi.current?.move({ from: orig, to: dest })
    const curColor = getColor(chessApi.current)

    boardApi.current?.set({
      turnColor: curColor,
      movable: {
        color: curColor,
        dests: getDests(chessApi.current),
      },
    })
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      chessApi.current = Chess()
      boardApi.current = Chessground(containerRef.current, {
        movable: {
          color: 'white',
          free: false,
          dests: getDests(chessApi.current!),
          events: {
            after: handleMove,
          },
        },
        events: {
          move: (orig, dest, captured) => console.log(orig, dest, captured),
        },
      })
    }
  }, [handleMove])

  return (
    <div
      className={classNames(
        'board-theme-blue piece-theme-merida',
        props.className
      )}
    >
      <div ref={containerRef} />
    </div>
  )
}

export default Board
