import { motion } from 'framer-motion'
import { easeSmooth } from '../../utils/motion'

export default function MessageBubble({ role, content, streaming }) {
  const isUser = role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: easeSmooth }}
      className={`msg-row ${isUser ? 'msg-row-user' : 'msg-row-assistant'}`}
    >
      <div className={`msg-avatar ${isUser ? 'msg-avatar-user' : 'msg-avatar-ai'}`}>
        {isUser ? 'You' : 'AI'}
      </div>
      <div className={`msg-bubble ${isUser ? 'msg-bubble-user' : 'msg-bubble-ai'}`}>
        <p className="msg-text">
          {content}
          {streaming && <span className="msg-caret" aria-hidden />}
        </p>
      </div>
    </motion.div>
  )
}
