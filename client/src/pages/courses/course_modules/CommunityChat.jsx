import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { 
  Send, User, MessageSquare, Loader2, Paperclip, 
  Smile, X, FileIcon, ImageIcon, ExternalLink, Download,
  Users, Shield, Check, CheckCheck, Clock, Sparkles,
  Mic, Video, Plus, MoreVertical, Reply, Copy, Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { io } from 'socket.io-client';

const CommunityChat = ({ courseId }) => {
  const { user } = useSelector(state => state.auth);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const scrollRef = useRef(null);
  const socketRef = useRef(null);
  const fileInputRef = useRef(null);
  const messageInputRef = useRef(null);

  useEffect(() => {
    fetchMessages();
    
    const socketUrl = window.API_URL;
    socketRef.current = io(socketUrl, {
      withCredentials: true
    });

    socketRef.current.emit('join-room', courseId, {
      _id: user?._id,
      name: user?.name,
      role: user?.role
    });

    socketRef.current.on('new-community-message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    socketRef.current.on('user-typing', ({ userId, name, isTyping }) => {
      if (isTyping) {
        setTypingUsers(prev => {
          if (!prev.find(u => u.userId === userId)) {
            return [...prev, { userId, name }];
          }
          return prev;
        });
      } else {
        setTypingUsers(prev => prev.filter(u => u.userId !== userId));
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [courseId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${window.API_URL}/api/community-chat/${courseId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setMessages(res.data);
    } catch (err) {
      console.error('Failed to fetch messages', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      socketRef.current?.emit('typing', { courseId, userId: user?._id, name: user?.name });
    }
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socketRef.current?.emit('stop-typing', { courseId, userId: user?._id });
    }, 1000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size should be less than 10MB');
        return;
      }
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if ((!newMessage.trim() && !selectedFile) || isSending) return;

    setIsSending(true);
    try {
      const formData = new FormData();
      if (newMessage.trim()) formData.append('content', newMessage);
      if (selectedFile) formData.append('file', selectedFile);
      if (replyTo) formData.append('replyTo', replyTo._id);

      await axios.post(`${window.API_URL}/api/community-chat/${courseId}`, 
        formData,
        { 
          headers: { 
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data'
          } 
        }
      );
      setNewMessage('');
      removeSelectedFile();
      setReplyTo(null);
      setShowEmojiPicker(false);
    } catch (err) {
      console.error('Failed to send message', err);
    } finally {
      setIsSending(false);
    }
  };

  const addEmoji = (emoji) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    messageInputRef.current?.focus();
  };

  const copyMessage = (text) => {
    navigator.clipboard.writeText(text);
    // Show toast notification here if you have one
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 rounded-2xl">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full"
        />
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading conversation...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
      
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Community Discussion</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <Users size={12} className="text-gray-400" />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {messages.length} messages • Encrypted
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="px-2 py-1 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-medium flex items-center gap-1">
              <Shield size={12} />
              Secure
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-950/50"
        style={{ scrollBehavior: 'smooth' }}
      >
        {messages.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full text-center"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center mb-4">
              <MessageSquare className="w-10 h-10 text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No messages yet</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
              Be the first to start the conversation! Share your thoughts, ask questions, or help others.
            </p>
          </motion.div>
        ) : (
          messages.map((msg, idx) => {
            const isMe = msg.sender?._id === user?._id;
            const isTeacher = msg.sender?.role === 'teacher' || msg.sender?.role === 'admin' || msg.sender?.role === 'hod';
            const showAvatar = idx === 0 || messages[idx-1]?.sender?._id !== msg.sender?._id;

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                key={msg._id || idx}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'} group`}
              >
                <div className={`flex gap-3 max-w-[85%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Avatar */}
                  {showAvatar && (
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-md ${
                        isMe 
                          ? 'bg-gradient-to-br from-primary-500 to-indigo-600 text-white' 
                          : isTeacher 
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                            : 'bg-gradient-to-br from-gray-400 to-gray-500 text-white'
                      }`}>
                        {msg.sender?.profilePicture ? (
                          <img src={msg.sender.profilePicture} alt="" className="w-full h-full rounded-full object-cover" />
                        ) : (
                          msg.sender?.name?.[0]?.toUpperCase() || '?'
                        )}
                      </div>
                    </div>
                  )}
                  
                  {!showAvatar && <div className="w-8 flex-shrink-0"></div>}

                  {/* Message Content */}
                  <div className="flex flex-col">
                    {!isMe && showAvatar && (
                      <div className="flex items-center gap-2 mb-1 ml-1">
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                          {msg.sender?.name}
                        </span>
                        {isTeacher && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-medium">
                            Faculty
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Reply Indicator */}
                    {msg.replyTo && (
                      <div className={`mb-1 px-3 py-1.5 rounded-lg text-xs bg-gray-100 dark:bg-gray-800 border-l-2 border-primary-500 ${isMe ? 'mr-2' : 'ml-2'}`}>
                        <p className="text-primary-600 dark:text-primary-400 text-[10px] font-semibold mb-0.5">
          Reply to {msg.replyTo.sender?.name}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 line-clamp-1">
                          {msg.replyTo.content?.substring(0, 60)}
                        </p>
                      </div>
                    )}
                    
                    {/* Message Bubble */}
                    <div className={`relative px-4 py-2.5 rounded-2xl shadow-sm ${
                      isMe 
                        ? 'bg-gradient-to-br from-primary-500 to-indigo-600 text-white rounded-tr-none' 
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-tl-none'
                    }`}>
                      
                      {/* Attachment */}
                      {msg.attachment && (
                        <div className="mb-2 max-w-full">
                          {msg.attachment.type === 'image' ? (
                            <div className="relative group/img">
                              <img 
                                src={msg.attachment.url} 
                                alt="Attachment" 
                                className="max-w-full max-h-64 rounded-lg cursor-pointer hover:opacity-95 transition-opacity"
                                onClick={() => window.open(msg.attachment.url, '_blank')}
                              />
                              <button
                                onClick={() => window.open(msg.attachment.url, '_blank')}
                                className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 text-white opacity-0 group-hover/img:opacity-100 transition-opacity"
                              >
                                <ExternalLink size={14} />
                              </button>
                            </div>
                          ) : (
                            <a 
                              href={msg.attachment.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-2 rounded-lg bg-black/10 dark:bg-white/5 hover:bg-black/20 dark:hover:bg-white/10 transition-all group/file"
                            >
                              <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center">
                                <FileIcon size={16} className="text-primary-600 dark:text-primary-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium truncate">{msg.attachment.name}</p>
                                <p className="text-[10px] opacity-60">Click to download</p>
                              </div>
                              <Download size={14} className="opacity-50 group-hover/file:opacity-100" />
                            </a>
                          )}
                        </div>
                      )}
                      
                      {/* Message Text */}
                      {msg.content && (
                        <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                          {msg.content}
                        </p>
                      )}
                      
                      {/* Message Footer */}
                      <div className={`flex items-center gap-1 mt-1 text-[10px] ${isMe ? 'text-primary-100' : 'text-gray-400'}`}>
                        <span>{formatTime(msg.timestamp)}</span>
                        {isMe && (
                          <CheckCheck size={12} className={msg.read ? 'text-primary-300' : 'opacity-50'} />
                        )}
                      </div>
                    </div>
                    
                    {/* Message Actions */}
                    <div className={`flex gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <button
                        onClick={() => {
                          setReplyTo(msg);
                          messageInputRef.current?.focus();
                        }}
                        className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        title="Reply"
                      >
                        <Reply size={12} className="text-gray-400" />
                      </button>
                      <button
                        onClick={() => copyMessage(msg.content)}
                        className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        title="Copy"
                      >
                        <Copy size={12} className="text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
        
        {/* Typing Indicator */}
        {typingUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 ml-12"
          >
            <div className="flex items-center gap-1 px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-800">
              <div className="flex gap-0.5">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                {typingUsers.length === 1 
                  ? `${typingUsers[0].name} is typing...`
                  : `${typingUsers.length} people are typing...`}
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Reply Indicator */}
      <AnimatePresence>
        {replyTo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="px-4 pt-3 pb-2 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Reply size={14} className="text-primary-500" />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  Replying to <span className="font-semibold text-gray-900 dark:text-white">{replyTo.sender?.name}</span>
                </span>
              </div>
              <button
                onClick={() => setReplyTo(null)}
                className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <X size={14} className="text-gray-400" />
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1 pl-6">
              {replyTo.content?.substring(0, 100)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        
        {/* File Preview */}
        <AnimatePresence>
          {selectedFile && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mb-3 flex items-center gap-3 p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              {filePreview ? (
                <img src={filePreview} alt="Preview" className="w-12 h-12 rounded-lg object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <FileIcon size={24} className="text-primary-600 dark:text-primary-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
              </div>
              <button 
                onClick={removeSelectedFile}
                className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <X size={16} className="text-gray-400" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message Input Form */}
        <form onSubmit={handleSendMessage} className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={messageInputRef}
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                handleTyping();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              placeholder="Type your message..."
              rows={1}
              className="w-full px-4 py-3 pr-24 bg-gray-100 dark:bg-gray-800 border-0 rounded-xl text-sm text-gray-900 dark:text-white placeholder:text-gray-500 focus:ring-2 focus:ring-primary-500 focus:outline-none resize-none"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            
            {/* Action Buttons */}
            <div className="absolute right-2 bottom-1.5 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Smile size={18} className="text-gray-400" />
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`p-1.5 rounded-lg transition-colors ${
                  selectedFile 
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400'
                }`}
              >
                <Paperclip size={18} />
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={(!newMessage.trim() && !selectedFile) || isSending}
            className="w-11 h-11 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 flex items-center justify-center text-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </button>
        </form>

        {/* Emoji Picker (Simplified) */}
        <AnimatePresence>
          {showEmojiPicker && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute bottom-20 left-4 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-2 z-10"
            >
              <div className="grid grid-cols-6 gap-1">
                {['😊', '😂', '❤️', '👍', '🎉', '🔥', '💡', '📚', '🤔', '🙏', '✨', '💪'].map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => addEmoji(emoji)}
                    className="w-8 h-8 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-lg"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        />
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.2);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default CommunityChat;