type ButtonProps = {
  onClick: () => void
  children: React.ReactNode
}

export function Button({ onClick, children }: ButtonProps) {
  return (
    <button
      className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 rounded-full w-64'
      onClick={onClick}
    >
      {children}
    </button>
  )
}
