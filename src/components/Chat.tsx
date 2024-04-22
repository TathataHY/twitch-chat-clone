import { SendMessageForm, ChatMessage, ChatPausedAlert } from '@/components'
import useChatLiveModeScrolling from '@/hooks/useChatLiveModeScrolling'
import useChatMessages from '@/hooks/useChatMessages'
import { MessageModel } from '@/utils/models'
import { forwardRef } from 'react'

export const Chat = () => {
  const { messages, send } = useChatMessages()
  const { chatMessagesBoxRef, isLiveModeEnabled, scrollNewMessages } =
    useChatLiveModeScrolling<HTMLDivElement>(messages)

  return (
    <div className="relative w-full max-w-[550px] px-4 py-3 rounded-lg bg-slate-900 opacity-80">
      <ChatMessagesBox ref={chatMessagesBoxRef} messages={messages} />
      {!isLiveModeEnabled && (
        <ChatPausedAlert
          onClick={scrollNewMessages}
          className="absolute inset-x-0 bottom-28 mx-auto"
        />
      )}
      <SendMessageForm onSend={send} className="mt-4" />
    </div>
  )
}

// eslint-disable-next-line react/display-name
const ChatMessagesBox = forwardRef<
  HTMLDivElement,
  { messages: MessageModel[] }
>(({ messages }, ref) => {
  const MessageList = messages.map((message) => (
    <ChatMessage message={message} key={message.id} className="mb-1" />
  ))

  return (
    <div ref={ref} className="h-[70vh] overflow-auto">
      {MessageList}
    </div>
  )
})
