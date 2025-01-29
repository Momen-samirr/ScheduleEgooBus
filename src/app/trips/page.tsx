"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Trip {
  tableCode: string;
  prices: number;
  tripsNum: number;
  trips: string;
  kelometr: number;
  current_capacity: number;
}

export default function JsonUploadDisplay() {
  const [data, setData] = useState<Trip[]>([]);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Handle File Upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string) as Trip[];
        setData(json);
        setError("");
        setSuccessMessage("");
      } catch (err) {
        setError("Invalid JSON format. Please upload a valid JSON file.");
        setData([]);
      }
    };
    reader.readAsText(file);
  };

  // Handle Submit to API
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/upload", {
        // This matches your app/api/upload/route.ts endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage(result.message);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An error occurred while uploading the data.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="file"
          accept="application/json"
          onChange={handleFileUpload}
          className="file-input file-input-bordered w-full max-w-xs"
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && (
        <p className="text-green-500 mb-4">{successMessage}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item, index) => (
          <Card key={index} className="shadow-md">
            <CardHeader>
              <p>{item.prices}</p>
              <CardTitle className="text-red-500">{item.tableCode}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>عدد الرحلات:</strong> {item.tripsNum}
              </p>
              <p>
                <br /> {item.trips}
              </p>
              <p>
                <strong>كيلومتر:</strong> {item.kelometr} km
              </p>
              <p>
                <strong>السعة:</strong> {item.current_capacity}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={handleSubmit} className="mt-4">
        Upload to Database
      </Button>
    </div>
  );
}
