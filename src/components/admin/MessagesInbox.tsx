import React, { useState } from 'react';
import { Mail, Check, Trash2, Clock, Phone, MapPin, Building, MessageSquare, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ContactMessage } from '../../types';

export const MessagesInbox: React.FC = () => {
  const { messages, updateMessageStatus, deleteMessage } = usePortfolio();
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');

  const filteredMessages = messages.filter((m) => {
    if (filter === 'all') return true;
    return m.status === filter;
  });

  const handleSelect = async (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (msg.status === 'unread') {
      await updateMessageStatus(msg.id, 'read');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Delete message from "${name}"?`)) {
      if (selectedMessage?.id === id) setSelectedMessage(null);
      await deleteMessage(id);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-black uppercase text-white tracking-tight">
            Client Inquiries & CRM Inbox
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Real-time messages submitted by visitors through your public portfolio contact form.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl self-start sm:self-auto">
          {(['all', 'unread', 'read', 'replied'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                filter === tab ? 'bg-[#FF6B00] text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {tab} ({messages.filter((m) => (tab === 'all' ? true : m.status === tab)).length})
            </button>
          ))}
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-neutral-900/40 border border-neutral-800">
          <MessageSquare className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
          <h3 className="font-display text-xl font-bold uppercase text-white mb-1">
            No Inquiries Received Yet
          </h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            When potential clients submit the brief on your portfolio, their information will appear here instantly.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Messages List Column */}
          <div className="lg:col-span-5 space-y-3">
            {filteredMessages.map((msg) => {
              const isSelected = selectedMessage?.id === msg.id;
              return (
                <div
                  key={msg.id}
                  onClick={() => handleSelect(msg)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-900 border-[#FF6B00] shadow-lg shadow-[#FF6B00]/10'
                      : 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm text-white truncate max-w-[180px]">
                      {msg.name}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      msg.status === 'unread'
                        ? 'bg-red-950 text-red-400 border border-red-800'
                        : msg.status === 'replied'
                        ? 'bg-emerald-950 text-emerald-400'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}>
                      {msg.status}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 truncate mb-1">
                    {msg.company ? `${msg.company} • ` : ''}{msg.serviceNeeded}
                  </p>

                  <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>

                  <div className="mt-2 pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-400">
                    <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                    <span className="text-[#FF6B00] font-medium">{msg.budgetRange}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Detail Column */}
          <div className="lg:col-span-7">
            {selectedMessage ? (
              <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-6 sticky top-24">
                
                {/* Header */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-800">
                  <div>
                    <h3 className="font-display text-2xl font-bold uppercase text-white">
                      {selectedMessage.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Submitted on {new Date(selectedMessage.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateMessageStatus(
                          selectedMessage.id,
                          selectedMessage.status === 'replied' ? 'read' : 'replied'
                        )
                      }
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${
                        selectedMessage.status === 'replied'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{selectedMessage.status === 'replied' ? 'Marked Replied' : 'Mark as Replied'}</span>
                    </button>

                    <button
                      onClick={() => handleDelete(selectedMessage.id, selectedMessage.name)}
                      className="p-1.5 rounded-xl bg-neutral-800 hover:bg-red-950 hover:text-red-400 text-neutral-400 transition-colors"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Brief Meta Grid */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs">
                  <div>
                    <span className="text-neutral-400 block uppercase tracking-wider text-[10px] mb-0.5">Business Email</span>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-[#FF6B00] hover:underline font-medium break-all"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>

                  {selectedMessage.phone && (
                    <div>
                      <span className="text-neutral-400 block uppercase tracking-wider text-[10px] mb-0.5">Phone / WhatsApp</span>
                      <a href={`tel:${selectedMessage.phone}`} className="text-white hover:underline">
                        {selectedMessage.phone}
                      </a>
                    </div>
                  )}

                  <div>
                    <span className="text-neutral-400 block uppercase tracking-wider text-[10px] mb-0.5">Company / Brand</span>
                    <span className="text-white font-medium">
                      {selectedMessage.company || 'Not Specified'}
                    </span>
                  </div>

                  <div>
                    <span className="text-neutral-400 block uppercase tracking-wider text-[10px] mb-0.5">Budget Allocated</span>
                    <span className="text-[#F59E0B] font-bold">
                      {selectedMessage.budgetRange}
                    </span>
                  </div>

                  <div className="col-span-2 pt-2 border-t border-neutral-800">
                    <span className="text-neutral-400 block uppercase tracking-wider text-[10px] mb-0.5">Service Requested</span>
                    <span className="text-white font-bold">
                      {selectedMessage.serviceNeeded}
                    </span>
                  </div>
                </div>

                {/* Message Text */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF6B00] mb-2">
                    Inquiry Brief Message:
                  </h4>
                  <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-200 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>

                {/* Direct Action Reply */}
                <div className="pt-2">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=RE: Digital Marketing Inquiry - ${selectedMessage.serviceNeeded}&body=Hi ${selectedMessage.name},%0D%0A%0D%0AThank you for reaching out regarding ${selectedMessage.serviceNeeded}. I have reviewed your brief and would love to schedule a quick discovery call...`}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#F59E0B] text-black font-bold text-xs hover:brightness-110 flex items-center justify-center gap-2 shadow-lg shadow-[#FF6B00]/20"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Launch Direct Email Reply to {selectedMessage.email}</span>
                  </a>
                </div>

              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center p-6 rounded-3xl bg-neutral-900/30 border border-dashed border-neutral-800 text-center">
                <Mail className="w-8 h-8 text-neutral-600 mb-2" />
                <p className="text-xs text-neutral-400">Select an inquiry from the left to read full details and reply</p>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
