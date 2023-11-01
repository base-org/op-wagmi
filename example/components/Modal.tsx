type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    isOpen
      ? (
        <div className='relative z-10' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
          <div className='fixed inset-0 bg-stone-900 bg-opacity-75 transition-opacity' />

          <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
            <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
              <div className='relative transform overflow-hidden rounded-lg bg-gray-700 shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg flex flex-col'>
                <div className='w-full flex justify-end px-4 py-2'>
                  <button className='text-xl' onClick={onClose}>✕</button>
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>
      )
      : null
  )
}
