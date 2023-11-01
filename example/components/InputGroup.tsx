type InputGroupProps = {
  label: string
  placeholder?: string
  value: string
  setValue: (value: string) => void
  defaultValue?: string
}

export function InputGroup({ label, placeholder, value, setValue, defaultValue }: InputGroupProps) {
  return (
    <div className='flex flex-row justify-between items-center w-full'>
      <span className='text-white'>{label}</span>
      <input
        className='p-2 rounded-md bg-white text-black w-64 placeholder-stone-400'
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        defaultValue={defaultValue}
      />
    </div>
  )
}
