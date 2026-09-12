import React, { useState } from 'react';
import { Upload, Copy, Check, Trash2, Image, FileText, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const MediaLibrary: React.FC = () => {
  const { media, uploadMediaFile, deleteMedia } = usePortfolio();
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        await uploadMediaFile(files[i]);
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h2 className="font-display text-3xl font-black uppercase text-white tracking-tight">
          Media Library & Assets
        </h2>
        <p className="text-xs text-neutral-400 mt-1">
          Upload portfolio case study screenshots, client logos, and graphics directly to cloud storage.
        </p>
      </div>

      {/* Upload Dropzone */}
      <div className="relative p-8 rounded-3xl bg-neutral-900/60 border-2 border-dashed border-neutral-800 hover:border-[#FF6B00]/60 transition-colors text-center flex flex-col items-center justify-center">
        <input
          type="file"
          multiple
          accept="image/*,.pdf"
          onChange={(e) => handleFileUpload(e.target.files)}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          disabled={uploading}
        />
        <div className="w-14 h-14 rounded-2xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00] mb-3">
          <Upload className="w-7 h-7" />
        </div>
        <h3 className="font-display text-xl font-bold uppercase text-white mb-1">
          {uploading ? 'Uploading assets...' : 'Drag & Drop files or Click to Browse'}
        </h3>
        <p className="text-xs text-neutral-400">
          Supports PNG, JPG, WebP, SVG, and PDF documents.
        </p>
      </div>

      {/* Media Grid */}
      <div className="space-y-4">
        <h3 className="font-display text-xl font-bold uppercase text-white">
          Stored Assets ({media.length})
        </h3>

        {media.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-neutral-950/60 border border-neutral-800 text-xs text-neutral-400">
            No uploaded media yet. Use the area above to upload assets.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {media.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl bg-neutral-900/80 border border-neutral-800 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-video bg-neutral-950 flex items-center justify-center overflow-hidden">
                  {item.fileType?.includes('image') || item.url.startsWith('data:image') ? (
                    <img
                      src={item.url}
                      alt={item.fileName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FileText className="w-8 h-8 text-neutral-500" />
                  )}
                </div>

                <div className="p-3">
                  <p className="text-xs font-semibold text-white truncate mb-2">
                    {item.fileName}
                  </p>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => copyUrl(item.id, item.url)}
                      className="flex items-center gap-1 text-[11px] font-bold text-[#FF6B00] hover:underline"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={async () => {
                        if (window.confirm('Delete this media asset?')) {
                          await deleteMedia(item.id, item.url);
                        }
                      }}
                      className="p-1 rounded text-neutral-500 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
