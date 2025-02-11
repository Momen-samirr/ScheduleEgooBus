"use client";
import { useState } from "react";

const UploadHunkelRoute = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);

      const response = await fetch("/api/uploadroutes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tripsData: jsonData }),
      });

      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Failed to upload file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow-md w-96">
      <h2 className="text-lg font-bold mb-2">Upload Hunkel Route Trips</h2>
      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {loading ? "Uploading..." : "Upload JSON"}
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
};

export default UploadHunkelRoute;
