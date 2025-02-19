import { IStrikethrough, IPriceBlockFont } from "./types/types"

interface ICrossedLienProps {
  strikethrough?: IStrikethrough | undefined
  font: IPriceBlockFont
}

const CrossedLine = ({ strikethrough, font }: ICrossedLienProps) => {
  if (!strikethrough) return null
  const style = {
    backgroundColor: strikethrough.color || font.color || '#000',
    transform: `rotate(${strikethrough.angle}deg)`,
    height: `${strikethrough.height}px`,
  }
  return <div className='absolute w-[90%] z-[2]' style={style}></div>
}

export default CrossedLine



