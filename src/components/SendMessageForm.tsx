import { useState } from 'react'
import { EmojiPickerButton } from '@/components'

type SendMessageFormProps = {
  onSend: (message: string) => void
  className?: string
}

const MAX_MESSAGES_LENGTH = 300

export const SendMessageForm = ({
  onSend,
  className,
}: SendMessageFormProps) => {
  const [message, setMessage] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!message) return
    const trimmedMessage = message.trim().slice(0, MAX_MESSAGES_LENGTH)
    onSend(trimmedMessage)
    setMessage('')
  }

  return (
    <form className={className} onSubmit={onSubmit}>
      <div className="relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 rounded bg-slate-700 focus:outline-none focus:ring-purple-500 focus:ring-2"
          placeholder="Send a chat message"
        />
        <div className="absolute top-0 inset-y-0 right-2 inline-flex items-center bg-slate-700">
          <EmojiPickerButton
            onEmojiPick={(emoji) =>
              setMessage((message) => message.concat(emoji))
            }
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-purple-600 p-2 float-right mt-2 rounded-md"
      >
        Chat
      </button>
    </form>
  )
}
