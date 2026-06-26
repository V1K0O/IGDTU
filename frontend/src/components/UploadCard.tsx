"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Video, Music, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";
import { YoutubeIcon } from "@/components/SocialIcons";

interface UploadCardProps {
  onGenerationComplete: (results: any) => void;
}

export default function UploadCard({ onGenerationComplete }: UploadCardProps) {
  const [fileType, setFileType] = useState<"video" | "audio" | "youtube">("video");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [dragActive, setDragActive] = useState(false);
  
  // Status states
  const [status, setStatus] = useState<"idle" | "uploading" | "transcribing" | "generating" | "completed">("idle");
  const [progress, setProgress] = useState(0);
  const [backendStatus, setBackendStatus] = useState<"checking" | "online" | "offline">("checking");
  const [apiLogs, setApiLogs] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check backend status on mount
  React.useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((res) => {
        if (res.ok) setBackendStatus("online");
        else setBackendStatus("offline");
      })
      .catch(() => {
        setBackendStatus("offline");
      });
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    const isVideoFile = file.type.startsWith("video/");
    const isAudioFile = file.type.startsWith("audio/");

    if (fileType === "video" && !isVideoFile) {
      alert("Please upload a valid video file.");
      return;
    }
    if (fileType === "audio" && !isAudioFile) {
      alert("Please upload a valid audio file.");
      return;
    }

    setSelectedFile(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const logAction = (message: string) => {
    setApiLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const handleGenerate = async () => {
    if (fileType !== "youtube" && !selectedFile) return;
    if (fileType === "youtube" && !youtubeUrl.trim()) return;

    setStatus("uploading");
    setProgress(15);
    setApiLogs([]);
    
    if (fileType === "youtube") {
      logAction(`Initiating YouTube import for link: ${youtubeUrl}`);
    } else {
      logAction(`Initiating upload process for file: ${selectedFile?.name}`);
    }

    try {
      if (backendStatus === "online") {
        // Step 1: Upload File or URL to FastAPI
        const formData = new FormData();
        if (fileType === "youtube") {
          formData.append("youtube_url", youtubeUrl);
          logAction("Calling API: POST /upload with youtube_url form field ...");
        } else if (selectedFile) {
          formData.append("file", selectedFile);
          logAction("Calling API: POST /upload with file payload ...");
        }
        
        const uploadRes = await fetch("http://127.0.0.1:8000/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) throw new Error("Upload failed");
        const uploadData = await uploadRes.json();
        
        if (fileType === "youtube") {
          logAction(`API Success: YouTube link registered. Assigned ID: ${uploadData.file_id}`);
        } else {
          logAction(`API Success: Upload completed. Assigned ID: ${uploadData.file_id}`);
        }
        
        // Step 2: Transcribe
        setStatus("transcribing");
        setProgress(50);
        logAction(`Calling API: POST /transcribe for ID: ${uploadData.file_id} ...`);
        
        const transcribeRes = await fetch("http://127.0.0.1:8000/transcribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file_id: uploadData.file_id }),
        });

        if (!transcribeRes.ok) throw new Error("Transcription failed");
        const transcribeData = await transcribeRes.json();
        logAction(`API Success: Transcript generated.`);

        // Step 3: Generate Social Content
        setStatus("generating");
        setProgress(80);
        logAction("Calling API: POST /generate-content ...");
        
        const generateRes = await fetch("http://127.0.0.1:8000/generate-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transcript: transcribeData.transcript,
            video_title: uploadData.title
          }),
        });

        if (!generateRes.ok) throw new Error("Generation failed");
        const contentData = await generateRes.json();
        
        setProgress(100);
        setStatus("completed");
        logAction("API Success: Repurposing completed successfully!");
        
        setTimeout(() => {
          onGenerationComplete(contentData);
          setStatus("idle");
          setProgress(0);
        }, 800);
      } else {
        // Client-side Mock Fallback (if backend is offline)
        logAction("Backend offline. Engaging client-side mock simulation...");
        
        // Simulating upload/download
        if (fileType === "youtube") {
          logAction(`Simulation: Fetching video track from ${youtubeUrl}...`);
          await new Promise((resolve) => setTimeout(resolve, 800));
          setProgress(40);
          setStatus("transcribing");
          logAction("Simulation: Transcribing YouTube audio stream (Whisper mock)...");
        } else {
          logAction("Simulation: Uploading media file...");
          await new Promise((resolve) => setTimeout(resolve, 800));
          setProgress(40);
          setStatus("transcribing");
          logAction("Simulation: Transcription active (Whisper mock)...");
        }
        
        // Simulating transcribing
        await new Promise((resolve) => setTimeout(resolve, 900));
        setProgress(75);
        setStatus("generating");
        logAction("Simulation: Generating platforms posts (GPT mock)...");
        
        // Simulating generate
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setProgress(100);
        setStatus("completed");
        logAction("Simulation: Completed! Rendering dashboard.");

        const fallbackData = {
          status: "success",
          transcript: "AI tools are transforming how students learn and work.",
          linkedin: "AI is changing education faster than ever. Here are 5 tools every student should know...",
          twitter_thread: "🧵 5 AI tools every student should know:\n\nChatGPT\nPerplexity\nNotion AI",
          instagram: "Study smarter, not harder 🚀",
          newsletter: "This week we're exploring the best AI tools for students...",
          hooks: [
            "Nobody talks about these AI tools.",
            "This changed how I study forever.",
            "Most students are doing this wrong.",
            "Stop wasting time.",
            "Here's the shortcut."
          ],
          calendar: [
            { day: "Monday", platform: "LinkedIn" },
            { day: "Tuesday", platform: "Instagram" },
            { day: "Wednesday", platform: "X Thread" },
            { day: "Thursday", platform: "Reel" },
            { day: "Friday", platform: "Newsletter" }
          ]
        };

        setTimeout(() => {
          onGenerationComplete(fallbackData);
          setStatus("idle");
          setProgress(0);
        }, 600);
      }
    } catch (err) {
      logAction(`Error encountered during pipeline. Resetting.`);
      alert("An error occurred during content generation. Check console or try again.");
      setStatus("idle");
      setProgress(0);
    }
  };

  const isProcessing = status !== "idle" && status !== "completed";

  return (
    <div className="glass-panel rounded-2xl border border-slate-700/60 p-6 md:p-8 space-y-6">
      {/* Header and Backend Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white">Upload Media</h2>
          <p className="text-sm text-slate-400">Select audio or video files to repurpose</p>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center space-x-2">
          {backendStatus === "checking" && (
            <span className="flex items-center text-xs text-slate-400">
              <RefreshCw className="h-3 w-3 mr-1 animate-spin" /> Checking API...
            </span>
          )}
          {backendStatus === "online" && (
            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
              FastAPI Online
            </span>
          )}
          {backendStatus === "offline" && (
            <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400 border border-amber-500/20">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Mock Failover Active
            </span>
          )}
        </div>
      </div>

      {/* Select file type */}
      {!isProcessing && (
        <div className="flex space-x-2 p-1 rounded-xl bg-slate-900 border border-slate-800 max-w-sm">
          <button
            onClick={() => { setFileType("video"); setSelectedFile(null); setYoutubeUrl(""); }}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
              fileType === "video"
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Video className="h-4 w-4" />
            <span>Video File</span>
          </button>
          <button
            onClick={() => { setFileType("audio"); setSelectedFile(null); setYoutubeUrl(""); }}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
              fileType === "audio"
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Music className="h-4 w-4" />
            <span>Audio File</span>
          </button>
          <button
            onClick={() => { setFileType("youtube"); setSelectedFile(null); setYoutubeUrl(""); }}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
              fileType === "youtube"
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <YoutubeIcon className={`h-4 w-4 ${fileType === "youtube" ? "text-rose-500" : ""}`} />
            <span>YouTube Link</span>
          </button>
        </div>
      )}

      {/* Drop Zone / Progress Bar */}
      {status === "idle" ? (
        fileType === "youtube" ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800 hover:border-slate-700/60 rounded-xl p-8 bg-slate-900/10 transition-all duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-rose-500 mb-4 border border-slate-700">
              <YoutubeIcon className="h-6 w-6" />
            </div>
            <div className="w-full max-w-md space-y-3 text-center">
              <div>
                <p className="text-sm font-semibold text-white">Import from YouTube</p>
                <p className="text-xs text-slate-500 mt-1">Paste a YouTube video or short URL directly to repurpose</p>
              </div>
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-xs text-slate-200 placeholder-slate-650 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
              />
              <p className="text-[10px] text-slate-600">Supports standard video links (youtube.com/watch?v=... or youtu.be/...)</p>
            </div>
          </div>
        ) : (
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={handleButtonClick}
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all duration-300 ${
              dragActive
                ? "border-primary-indigo bg-primary-indigo/5"
                : selectedFile
                ? "border-slate-600 bg-slate-800/20"
                : "border-slate-800 hover:border-slate-700 hover:bg-slate-800/10"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              accept={fileType === "video" ? "video/*" : "audio/*"}
              className="hidden"
            />

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-slate-300 mb-4 border border-slate-700">
              {fileType === "video" ? <Video className="h-6 w-6" /> : <Music className="h-6 w-6" />}
            </div>

            {selectedFile ? (
              <div className="text-center">
                <p className="text-sm font-semibold text-white truncate max-w-xs mx-auto">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                  }}
                  className="mt-3 text-xs text-rose-400 hover:text-rose-300 font-medium underline"
                >
                  Remove File
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm font-medium text-white">
                  Drag and drop your {fileType} here, or <span className="text-primary-indigo underline">browse</span>
                </p>
                <p className="text-xs text-slate-500 mt-1.5">
                  {fileType === "video"
                    ? "Accepts MP4, MOV, AVI (Max 100MB)"
                    : "Accepts MP3, WAV, M4A (Max 50MB)"}
                </p>
              </div>
            )}
          </div>
        )
      ) : (
        <div className="space-y-6 rounded-xl border border-slate-800 bg-slate-900/40 p-6">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-white capitalize flex items-center">
              {status === "uploading" && <RefreshCw className="h-4 w-4 mr-2 animate-spin text-primary-indigo" />}
              {status === "transcribing" && <RefreshCw className="h-4 w-4 mr-2 animate-spin text-secondary-violet" />}
              {status === "generating" && <RefreshCw className="h-4 w-4 mr-2 animate-spin text-indigo-400" />}
              {status === "completed" && <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-400 animate-bounce" />}
              {status === "uploading" && "Uploading media..."}
              {status === "transcribing" && "Transcribing audio (AI Whisper)..."}
              {status === "generating" && "Generating structured content..."}
              {status === "completed" && "Generation successful!"}
            </span>
            <span className="font-mono text-xs text-slate-400">{progress}%</span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* API Pipeline Logs */}
          <div className="rounded-lg bg-black/40 border border-slate-900 p-4 h-28 overflow-y-auto font-mono text-[10px] text-slate-400 space-y-1 scroll-smooth">
            {apiLogs.map((log, index) => (
              <div key={index} className="leading-relaxed">
                <span className="text-slate-600">&gt;</span> {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Button */}
      {!isProcessing && (
        <button
          onClick={handleGenerate}
          disabled={fileType === "youtube" ? !youtubeUrl.trim() : !selectedFile}
          className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-semibold text-white shadow-lg transition-all ${
            (fileType === "youtube" ? youtubeUrl.trim() : selectedFile)
              ? "bg-gradient-primary shadow-primary-indigo/20 hover:shadow-primary-indigo/35 hover:-translate-y-0.5"
              : "bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed"
          }`}
        >
          <UploadCloud className="h-5 w-5" />
          <span>Generate Content</span>
        </button>
      )}
    </div>
  );
}
