import { useCallback, useEffect, useState } from 'react'
import { MessageModel } from '@/utils/models'
import useChatConnection from '@/hooks/useChatConnection'

const MESSAGE_WINDOW = 30

const welcomeMessage: MessageModel = {
  id: 'welcome-message',
  author: {
    rgbColor: 'darkorchid',
    badges: ['moderator'],
    username: 'ChatBot',
  },
  content: 'Welcome to Twitch Chat Clone!',
}

export default function useChatMessages() {
  const [messages, setMessages] = useState<MessageModel[]>([welcomeMessage])

  const socket = useChatConnection()

  const appendMessage = useCallback((message: MessageModel) => {
    setMessages((prevMessages) => {
      const newMessages: MessageModel[] = [...prevMessages, message]
      if (newMessages.length > MESSAGE_WINDOW) {
        newMessages.shift()
      }
      return newMessages
    })
  }, [])

  const send = useCallback(
    (message: string) => {
      console.log(`Sending message: ${message}`)
      socket?.emit('message', message)
    },
    [socket]
  )

  useEffect(() => {
    socket?.on('new-message', (message: MessageModel) => {
      appendMessage(message)
    })
    return () => {
      socket?.off('new-message')
    }
  }, [socket, appendMessage])

  return {
    messages,
    send,
  }
}
