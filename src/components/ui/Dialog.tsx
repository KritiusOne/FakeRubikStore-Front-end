interface Props {
  children: React.ReactNode
  onClose: () => void
}

export const Dialog: React.FC<Props> = ({ children, onClose }) => {
  const handleMainClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }
  return (
    <div onClick={() => onClose()} className='w-screen h-screen fixed top-0 left-0 flex justify-center items-center md:justify-center bg-black/[0.5] z-[300]'>
      <main className='h-11/12 w-11/12 text-dark z-[1000] flex flex-col justify-center items-center' onClick={handleMainClick} >
        {
          children
        }
      </main>
    </div>
  )
}