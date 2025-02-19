import { forwardRef } from 'react'
import { IStrikethrough, IPriceBlockFont } from "./types/types"

interface ICrossedLienProps {
  strikethrough?: IStrikethrough | undefined
  font?: IPriceBlockFont
}

const CrossedLine = forwardRef<HTMLDivElement, ICrossedLienProps>(({ strikethrough, font }: ICrossedLienProps, ref) => {
  if (!strikethrough) return null
  const style = {
    backgroundColor: strikethrough.color || font?.color || '#000',
    transform: `rotate(${strikethrough.angle}deg) translate(-50%, -50%)`,
    transformOrigin: 'left',
    height: `${strikethrough.height}px`,
    left: '50%',
    top: '50%',
  }
  return <div ref={ref} className='absolute  z-[2]' style={style}></div>
})

CrossedLine.displayName = 'CrossedLine'
export default CrossedLine
