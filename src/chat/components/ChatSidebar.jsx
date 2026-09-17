export default function ChatSidebar({
  conversations,
  activeId,
  onSelect,
  onNew,
  onDelete,
  open,
  onClose,
}) {
  return (
    <>
      {open && <button className="chat-sidebar-scrim" onClick={onClose} aria-label="Close sidebar" />}
      <aside className={`chat-sidebar ${open ? 'chat-sidebar-open' : ''}`}>
        <div className="chat-sidebar-head">
          <button type="button" className="chat-new-btn" onClick={onNew}>
            + New chat
          </button>
        </div>

        <div className="chat-sidebar-list">
          {conversations.length === 0 && (
            <p className="chat-sidebar-empty">No conversations yet. Start one.</p>
          )}
          {conversations.map((c) => (
            <div
              key={c.id}
              className={`chat-side-item ${c.id === activeId ? 'chat-side-item-active' : ''}`}
            >
              <button type="button" className="chat-side-title" onClick={() => onSelect(c.id)}>
                {c.title}
              </button>
              <button
                type="button"
                className="chat-side-delete"
                onClick={() => onDelete(c.id)}
                aria-label="Delete conversation"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="chat-sidebar-foot">
          <p className="chat-sidebar-note">
            Guest mode — chats stay on this device.
            <br />
            Sign-in for synced history coming soon.
          </p>
        </div>
      </aside>
    </>
  )
}
