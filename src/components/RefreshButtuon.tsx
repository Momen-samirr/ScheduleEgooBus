"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { RefreshCcwIcon } from "lucide-react";

const RefreshButton = () => {
  const [loading, setLoading] = useState(false);
  const handelRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  return (
    <div className="flex items-center gap-3">
      <Button
        variant={"outline"}
        onClick={handelRefresh}
        disabled={loading}
        className="justify-end"
      >
        <RefreshCcwIcon className={`${loading ? "animate-spin" : ""} size-5`} />
        {loading ? "جاري التحديث" : null}
      </Button>
    </div>
  );
};

export default RefreshButton;
