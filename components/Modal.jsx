import cn from 'classnames'

export default function Modal({ active, setActive, body, type = 'error' }) {
  return (
    <>
      <div
        className={cn(
          'modal transition-all opacity-0 pointer-events-none duration-300 h-screen w-screen fixed inset-0 flex-center z-50 overflow-hidden',
          { active: active }
        )}
        onClick={() => setActive((m) => ({ ...m, active: false }))}
      >
        <div
          className={cn(
            'modal-content transition-all transform scale-50 duration-300 rounded p-2 bg-white',
            { active: active }
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <h1
            className={cn(
              {
                'text-red-500': type === 'error',
                'text-blue-500': type === 'info',
              },
              'text-xl font-semibold'
            )}
          >
            {type === 'error' ? 'Error' : 'Info'}
          </h1>
          <p className='text-sm'>{body}</p>
        </div>
      </div>
      <style jsx>
        {`
          .modal {
            background-color: rgba(17, 24, 39, 0.5);
            opacity: 0;
            pointer-events: none;
          }
          .modal.active {
            opacity: 1;
            pointer-events: all;
          }

          .modal-content {
            transform: scale(0.5);
          }
          .modal-content.active {
            transform: scale(1);
          }
        `}
      </style>
    </>
  )
}
