"use client";
import { useEffect } from "react";

const VoiceflowChat = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
    script.onload = () => {
      (window as any).voiceflow?.chat?.load({
        verify: { projectID: "67a117a220c9c3fd172cb4f1" },
        url: "https://general-runtime.voiceflow.com",
        versionID: "production",
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default VoiceflowChat;
