import React, { useCallback, useEffect, useRef } from 'react'
import Chess from 'chess.js'
import type { ChessInstance } from 'chess.js'
import { Chessground } from 'chessground'
import type { Api } from 'chessground/api'
import type { Key } from 'chessground/types'
import classNames from 'classnames'

interface Props {
  className?: string
  onReady?: (chessApi: ChessInstance, boardApi: Api) => any
  onMove?: (chessApi: ChessInstance, boardApi: Api, orig: Key, dest: Key) => any
}

const usePropAsRef = <T extends any>(prop: T) => {
  const propRef = useRef<T>(prop)

  useEffect(() => {
    propRef.current = prop
  }, [prop])

  return propRef
}

const Board: React.FC<Props> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const chessApi = useRef<ChessInstance>()
  const boardApi = useRef<Api>()

  const onReadyRef = usePropAsRef(props.onReady)
  const onMoveRef = usePropAsRef(props.onMove)

  const handleMove = useCallback(
    (orig: Key, dest: Key) => {
      onMoveRef.current?.(chessApi.current!, boardApi.current!, orig, dest)
    },
    [onMoveRef]
  )

  useEffect(() => {
    chessApi.current = Chess()
    boardApi.current = Chessground(containerRef.current!, {
      movable: {
        events: {
          after: handleMove,
        },
      },
    })

    onReadyRef.current?.(chessApi.current!, boardApi.current!)
  }, [handleMove, onReadyRef])

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
