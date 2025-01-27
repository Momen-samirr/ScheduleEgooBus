"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CSVUploader = () => {
  const [data, setData] = useState<string[][] | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const rows = text.split("\n").map((row) => row.split(";"));
        setData(rows);
      };
      reader.readAsText(file);
    }
  };

  const headers = data ? data[0] : [];
  const entries = data ? data.slice(1) : [];

  return (
    <div className=" w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-9xl p-6 shadow-lg mb-6">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">Upload and View CSV</h1>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
            <Button onClick={() => setData(null)} variant="outline">
              Clear Data
            </Button>
          </div>
          {!data && (
            <p className="text-gray-600 text-center">
              No file uploaded yet. Please upload a CSV file to view its
              content.
            </p>
          )}
        </CardContent>
      </Card>
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-7xl">
          {entries.map((row, rowIndex) => (
            <Card
              key={rowIndex}
              className="border border-gray-300 rounded-xl shadow-lg hover:shadow-xl transition-shadow bg-white"
            >
              <CardContent>
                <div className="flex flex-col gap-2 p-4">
                  {row.map((cell, cellIndex) => (
                    <p key={cellIndex} className="text-gray-700 text-sm">
                      <span className="font-bold text-blue-600">
                        {headers[cellIndex] || `Column ${cellIndex + 1}`}:
                      </span>{" "}
                      {cell}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CSVUploader;
