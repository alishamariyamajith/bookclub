import React, { useState, useEffect } from 'react';
import { Search, Plus, Users, MessageSquare, Hash, Bell, User, Settings, ChevronRight, Send, Image, Smile, Paperclip } from 'lucide-react';
import "./styles/BookClubNetwork.css";
const Community = () => {
  // State variables
  const [activeTab, setActiveTab] = useState('chats'); // 'chats' or 'communities'
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [newGroupModal, setNewGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newChannelModal, setNewChannelModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');

  // Mock data - would come from localStorage or backend in a real app
  const [users, setUsers] = useState([
    { id: 1, name: 'Sarah Johnson', avatar: '/api/placeholder/40/40', status: 'online', following: true },
    { id: 2, name: 'Mark Davies', avatar: '/api/placeholder/40/40', status: 'online', following: true },
    { id: 3, name: 'Priya Sharma', avatar: '/api/placeholder/40/40', status: 'offline', following: true },
    { id: 4, name: 'Tom Wilson', avatar: '/api/placeholder/40/40', status: 'online', following: false },
    { id: 5, name: 'Emma Chen', avatar: '/api/placeholder/40/40', status: 'offline', following: true },
  ]);

  const [groups, setGroups] = useState([
    { id: 1, name: 'Mystery Lovers Book Club', avatar: '/api/placeholder/40/40', type: 'group', unread: 3, lastMessage: { text: 'Has anyone read "The Silent Patient"?', time: '10:30 AM', sender: 'Mark Davies' } },
    { id: 2, name: 'Sci-Fi Enthusiasts', avatar: '/api/placeholder/40/40', type: 'group', unread: 0, lastMessage: { text: 'The next meeting is on Friday!', time: 'Yesterday', sender: 'You' } },
  ]);

  const [channels, setChannels] = useState([
    { id: 1, name: 'New Releases', avatar: '/api/placeholder/40/40', type: 'channel', unread: 5, lastMessage: { text: 'Check out these books coming out in March!', time: '11:45 AM', sender: 'Admin' } },
    { id: 2, name: 'Book Recommendations', avatar: '/api/placeholder/40/40', type: 'channel', unread: 0, lastMessage: { text: '"Project Hail Mary" is a must-read!', time: 'Yesterday', sender: 'Sarah Johnson' } },
    { id: 3, name: 'Reading Challenges', avatar: '/api/placeholder/40/40', type: 'channel', unread: 2, lastMessage: { text: 'New summer reading challenge announced!', time: '2 days ago', sender: 'Admin' } },
  ]);

  const [privateChats, setPrivateChats] = useState([
    { id: 1, user: users[0], unread: 2, lastMessage: { text: 'Would you like to join our book club?', time: '9:15 AM', sender: 'Sarah Johnson' } },
    { id: 2, user: users[2], unread: 0, lastMessage: { text: 'I really enjoyed that recommendation!', time: 'Yesterday', sender: 'You' } },
  ]);

  const [messages, setMessages] = useState({
    // Private chat messages
    'private-1': [
      { id: 1, text: 'Hi there! Have you read any good books lately?', sender: users[0], time: '9:00 AM', status: 'read' },
      { id: 2, text: 'I just finished "The Midnight Library". It was fantastic!', sender: { id: 0, name: 'You' }, time: '9:05 AM', status: 'read' },
      { id: 3, text: 'Oh, I love Matt Haig! Would you like to join our book club?', sender: users[0], time: '9:15 AM', status: 'read' },
    ],
    'private-2': [
      { id: 1, text: 'Thanks for recommending "Educated". I couldn\'t put it down!', sender: users[2], time: 'Yesterday 5:30 PM', status: 'read' },
      { id: 2, text: 'I really enjoyed that recommendation!', sender: { id: 0, name: 'You' }, time: 'Yesterday 6:45 PM', status: 'read' },
    ],
    // Group chat messages
    'group-1': [
      { id: 1, text: 'Welcome everyone to our Mystery Lovers Book Club!', sender: users[0], time: 'Yesterday 2:30 PM', status: 'read' },
      { id: 2, text: 'I\'m currently reading "The Girl on the Train". Anyone else read it?', sender: users[2], time: 'Yesterday 3:15 PM', status: 'read' },
      { id: 3, text: 'Yes! The unreliable narrator technique was so well done.', sender: { id: 0, name: 'You' }, time: 'Yesterday 4:20 PM', status: 'read' },
      { id: 4, text: 'Has anyone read "The Silent Patient"?', sender: users[1], time: '10:30 AM', status: 'read' },
    ],
    'group-2': [
      { id: 1, text: 'What did everyone think of the latest Dune book?', sender: users[4], time: '2 days ago 10:15 AM', status: 'read' },
      { id: 2, text: 'The worldbuilding is incredible!', sender: users[1], time: '2 days ago 11:30 AM', status: 'read' },
      { id: 3, text: 'The next meeting is on Friday!', sender: { id: 0, name: 'You' }, time: 'Yesterday 1:45 PM', status: 'read' },
    ],
    // Channel messages
    'channel-1': [
      { id: 1, text: 'Here are some exciting new releases for this month:', sender: { id: 'admin', name: 'Admin' }, time: '2 days ago 9:00 AM', status: 'read' },
      { id: 2, text: '1. "The Invisible Life of Addie LaRue" by V.E. Schwab', sender: { id: 'admin', name: 'Admin' }, time: '2 days ago 9:01 AM', status: 'read' },
      { id: 3, text: '2. "Klara and the Sun" by Kazuo Ishiguro', sender: { id: 'admin', name: 'Admin' }, time: '2 days ago 9:02 AM', status: 'read' },
      { id: 4, text: 'Check out these books coming out in March!', sender: { id: 'admin', name: 'Admin' }, time: '11:45 AM', status: 'read' },
    ],
  });

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return;

    const chatId = 
      activeChat.type === 'private' ? `private-${activeChat.id}` : 
      activeChat.type === 'group' ? `group-${activeChat.id}` : 
      `channel-${activeChat.id}`;

    const newMessage = {
      id: messages[chatId] ? messages[chatId].length + 1 : 1,
      text: message,
      sender: { id: 0, name: 'You' },
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    // Update messages
    setMessages(prev => ({
      ...prev,
      [chatId]: prev[chatId] ? [...prev[chatId], newMessage] : [newMessage]
    }));

    // Update last message in the chat list
    if (activeChat.type === 'private') {
      setPrivateChats(prev => prev.map(chat => 
        chat.id === activeChat.id ? 
        { ...chat, lastMessage: { text: message, time: 'Just now', sender: 'You' }, unread: 0 } : 
        chat
      ));
    } else if (activeChat.type === 'group') {
      setGroups(prev => prev.map(group => 
        group.id === activeChat.id ? 
        { ...group, lastMessage: { text: message, time: 'Just now', sender: 'You' }, unread: 0 } : 
        group
      ));
    } else if (activeChat.type === 'channel') {
      // Only admins can typically post in channels, but for demo we allow it
      setChannels(prev => prev.map(channel => 
        channel.id === activeChat.id ? 
        { ...channel, lastMessage: { text: message, time: 'Just now', sender: 'You' }, unread: 0 } : 
        channel
      ));
    }

    setMessage('');
  };

  // Create a new group
  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;
    
    const newGroup = {
      id: groups.length + 1,
      name: newGroupName,
      avatar: '/api/placeholder/40/40',
      type: 'group',
      unread: 0,
      lastMessage: { text: 'Group created', time: 'Just now', sender: 'You' }
    };
    
    setGroups(prev => [...prev, newGroup]);
    setNewGroupName('');
    setNewGroupModal(false);
  };

  // Create a new channel
  const handleCreateChannel = () => {
    if (!newChannelName.trim()) return;
    
    const newChannel = {
      id: channels.length + 1,
      name: newChannelName,
      avatar: '/api/placeholder/40/40',
      type: 'channel',
      unread: 0,
      lastMessage: { text: 'Channel created', time: 'Just now', sender: 'You' }
    };
    
    setChannels(prev => [...prev, newChannel]);
    setNewChannelName('');
    setNewChannelModal(false);
  };

  // Filter chats based on search term
  const filteredChats = () => {
    if (!searchTerm) {
      if (activeTab === 'chats') {
        return [...privateChats, ...groups];
      } else {
        return channels;
      }
    }

    const term = searchTerm.toLowerCase();
    
    if (activeTab === 'chats') {
      const filteredPrivate = privateChats.filter(chat => 
        chat.user.name.toLowerCase().includes(term) || 
        (chat.lastMessage && chat.lastMessage.text.toLowerCase().includes(term))
      );
      
      const filteredGroups = groups.filter(group => 
        group.name.toLowerCase().includes(term) || 
        (group.lastMessage && group.lastMessage.text.toLowerCase().includes(term))
      );
      
      return [...filteredPrivate, ...filteredGroups];
    } else {
      return channels.filter(channel => 
        channel.name.toLowerCase().includes(term) || 
        (channel.lastMessage && channel.lastMessage.text.toLowerCase().includes(term))
      );
    }
  };

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('bookClubMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    
    const savedPrivateChats = localStorage.getItem('bookClubPrivateChats');
    if (savedPrivateChats) {
      setPrivateChats(JSON.parse(savedPrivateChats));
    }
    
    const savedGroups = localStorage.getItem('bookClubGroups');
    if (savedGroups) {
      setGroups(JSON.parse(savedGroups));
    }
    
    const savedChannels = localStorage.getItem('bookClubChannels');
    if (savedChannels) {
      setChannels(JSON.parse(savedChannels));
    }
  }, []);

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem('bookClubMessages', JSON.stringify(messages));
    localStorage.setItem('bookClubPrivateChats', JSON.stringify(privateChats));
    localStorage.setItem('bookClubGroups', JSON.stringify(groups));
    localStorage.setItem('bookClubChannels', JSON.stringify(channels));
  }, [messages, privateChats, groups, channels]);

  // Handler for selecting a chat
  const handleSelectChat = (chat, type) => {
    const newActiveChat = { ...chat, type };
    setActiveChat(newActiveChat);
    
    // Mark as read
    if (type === 'private') {
      setPrivateChats(prev => prev.map(c => 
        c.id === chat.id ? { ...c, unread: 0 } : c
      ));
    } else if (type === 'group') {
      setGroups(prev => prev.map(g => 
        g.id === chat.id ? { ...g, unread: 0 } : g
      ));
    } else if (type === 'channel') {
      setChannels(prev => prev.map(c => 
        c.id === chat.id ? { ...c, unread: 0 } : c
      ));
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Book Club</h2>
            <div className="flex space-x-2">
              <button className="text-gray-500 hover:text-gray-700">
                <Settings size={20} />
              </button>
            </div>
          </div>
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-8 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-3 font-medium ${activeTab === 'chats' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('chats')}
          >
            Chats
          </button>
          <button
            className={`flex-1 py-3 font-medium ${activeTab === 'communities' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('communities')}
          >
            Communities
          </button>
        </div>

        {/* Chat/Community List */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'chats' && (
            <div>
              {/* Add new group button */}
              <div className="px-4 py-3 border-b border-gray-200">
                <button 
                  className="flex items-center text-blue-600 hover:text-blue-800"
                  onClick={() => setNewGroupModal(true)}
                >
                  <Plus size={18} className="mr-2" />
                  New Group
                </button>
              </div>

              {/* Private chats */}
              <div className="px-4 py-2 text-sm font-medium text-gray-500 uppercase">
                Private Messages
              </div>
              {privateChats.map(chat => (
                <div 
                  key={`private-${chat.id}`}
                  className={`px-4 py-3 flex items-center cursor-pointer hover:bg-gray-100 ${activeChat && activeChat.id === chat.id && activeChat.type === 'private' ? 'bg-blue-50' : ''}`}
                  onClick={() => handleSelectChat(chat, 'private')}
                >
                  <div className="relative">
                    <img src={chat.user.avatar} alt={chat.user.name} className="w-10 h-10 rounded-full" />
                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${chat.user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{chat.user.name}</span>
                      <span className="text-xs text-gray-500">{chat.lastMessage?.time}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage?.text}</p>
                      {chat.unread > 0 && (
                        <span className="ml-2 bg-blue-600 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Groups */}
              <div className="px-4 py-2 text-sm font-medium text-gray-500 uppercase mt-4">
                Groups
              </div>
              {groups.map(group => (
                <div 
                  key={`group-${group.id}`}
                  className={`px-4 py-3 flex items-center cursor-pointer hover:bg-gray-100 ${activeChat && activeChat.id === group.id && activeChat.type === 'group' ? 'bg-blue-50' : ''}`}
                  onClick={() => handleSelectChat(group, 'group')}
                >
                  <div className="relative">
                    <img src={group.avatar} alt={group.name} className="w-10 h-10 rounded-full" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-blue-500"></span>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{group.name}</span>
                      <span className="text-xs text-gray-500">{group.lastMessage?.time}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-sm text-gray-600 truncate">
                        <span className="font-medium">{group.lastMessage?.sender}: </span>
                        {group.lastMessage?.text}
                      </p>
                      {group.unread > 0 && (
                        <span className="ml-2 bg-blue-600 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                          {group.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'communities' && (
            <div>
              {/* Add new channel button */}
              <div className="px-4 py-3 border-b border-gray-200">
                <button 
                  className="flex items-center text-blue-600 hover:text-blue-800"
                  onClick={() => setNewChannelModal(true)}
                >
                  <Plus size={18} className="mr-2" />
                  New Channel
                </button>
              </div>

              {/* Channels */}
              <div className="px-4 py-2 text-sm font-medium text-gray-500 uppercase">
                Channels
              </div>
              {channels.map(channel => (
                <div 
                  key={`channel-${channel.id}`}
                  className={`px-4 py-3 flex items-center cursor-pointer hover:bg-gray-100 ${activeChat && activeChat.id === channel.id && activeChat.type === 'channel' ? 'bg-blue-50' : ''}`}
                  onClick={() => handleSelectChat(channel, 'channel')}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-500">
                    <Hash size={20} />
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{channel.name}</span>
                      <span className="text-xs text-gray-500">{channel.lastMessage?.time}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-sm text-gray-600 truncate">
                        <span className="font-medium">{channel.lastMessage?.sender}: </span>
                        {channel.lastMessage?.text}
                      </p>
                      {channel.unread > 0 && (
                        <span className="ml-2 bg-blue-600 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                          {channel.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-white">
              <div className="flex items-center">
                {activeChat.type === 'private' ? (
                  <img src={activeChat.user.avatar} alt={activeChat.user.name} className="w-10 h-10 rounded-full" />
                ) : activeChat.type === 'group' ? (
                  <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full" />
                ) : (
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-500">
                    <Hash size={20} />
                  </div>
                )}
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-900">
                    {activeChat.type === 'private' ? activeChat.user.name : activeChat.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {activeChat.type === 'private' ? 
                      activeChat.user.status === 'online' ? 'Online' : 'Offline' : 
                      activeChat.type === 'group' ? 'Group' : 'Channel'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-500">
                <button className="hover:text-gray-700">
                  <Search size={20} />
                </button>
                <button className="hover:text-gray-700">
                  <Bell size={20} />
                </button>
                {activeChat.type === 'group' && (
                  <button className="hover:text-gray-700">
                    <Users size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {activeChat.type === 'private' && messages[`private-${activeChat.id}`] ? (
                messages[`private-${activeChat.id}`].map(msg => (
                  <div key={msg.id} className={`mb-4 flex ${msg.sender.id === 0 ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender.id !== 0 && (
                      <img src={activeChat.user.avatar} alt={msg.sender.name} className="w-8 h-8 rounded-full mr-2" />
                    )}
                    <div className={`max-w-xs p-3 rounded-lg ${msg.sender.id === 0 ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'} shadow`}>
                      <p>{msg.text}</p>
                      <div className={`text-xs mt-1 ${msg.sender.id === 0 ? 'text-blue-100' : 'text-gray-500'}`}>
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))
              ) : activeChat.type === 'group' && messages[`group-${activeChat.id}`] ? (
                messages[`group-${activeChat.id}`].map(msg => (
                  <div key={msg.id} className={`mb-4 flex ${msg.sender.id === 0 ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender.id !== 0 && (
                      <img src={msg.sender.avatar || '/api/placeholder/40/40'} alt={msg.sender.name} className="w-8 h-8 rounded-full mr-2" />
                    )}
                    <div className={`max-w-xs p-3 rounded-lg ${msg.sender.id === 0 ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'} shadow`}>
                      {msg.sender.id !== 0 && (
                        <p className="font-medium text-xs mb-1">{msg.sender.name}</p>
                      )}
                      <p>{msg.text}</p>
                      <div className={`text-xs mt-1 ${msg.sender.id === 0 ? 'text-blue-100' : 'text-gray-500'}`}>
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))
              ) : activeChat.type === 'channel' && messages[`channel-${activeChat.id}`] ? (
                messages[`channel-${activeChat.id}`].map(msg => (
                  <div key={msg.id} className={`mb-4 flex ${msg.sender.id === 0 ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs p-3 rounded-lg ${msg.sender.id === 0 ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'} shadow`}>
                      <p className="font-medium text-xs mb-1">{msg.sender.name}</p>
                      <p>{msg.text}</p>
                      <div className={`text-xs mt-1 ${msg.sender.id === 0 ? 'text-blue-100' : 'text-gray-500'}`}>
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  No messages yet
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 bg-white p-4">
              <div className="flex items-center">
                <button className="text-gray-500 hover:text-gray-700 mx-2">
                  <Paperclip size={20} />
                </button>
                <button className="text-gray-500 hover:text-gray-700 mx-2">
                  <Image size={20} />
                </button>
                <button className="text-gray-500 hover:text-gray-700 mx-2">
                  <Smile size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 mx-2 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none"onClick={handleSendMessage}>
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-500">
            <div className="text-center">
              <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-medium mb-2">Welcome to Book Club Chat</h3>
              <p className="text-gray-400">Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* New Group Modal */}
      {newGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-semibold mb-4">Create New Group</h3>
            <input
              type="text"
              placeholder="Group name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50" onClick={() => setNewGroupModal(false)}>
                Cancel</button>
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handleCreateGroup}>
                Create</button>
            </div>
          </div>
        </div>
      )}

      {/* New Channel Modal */}
      {newChannelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-semibold mb-4">Create New Channel</h3>
            <input
              type="text"
              placeholder="Channel name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
            />
            <div className="mt-6 flex justify-end space-x-3">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"onClick={() => setNewChannelModal(false)}>
                Cancel</button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handleCreateChannel}>
                Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;