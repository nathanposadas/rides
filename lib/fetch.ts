// lib/fetchUtils.ts (or fetchUtils.js if not using TypeScript)
import { useState, useEffect, useCallback } from "react";

export const fetchAPI = async (url: string, options?: RequestInit): Promise<any> => {
  try {
    const response = await fetch(url, options);
    
    // Log the response for debugging
    const text = await response.text();
    console.log("Response text:", text); // Log the raw response text

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, message: ${response.statusText}`);
    }

    // Attempt to parse the JSON response
    try {
      return JSON.parse(text); // Parse the JSON response
    } catch (jsonError) {
      console.error("JSON parsing error:", jsonError);
      throw new Error("Failed to parse JSON response.");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Re-throw the error for handling in useFetch
  }
};

export const useFetch = <T>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchAPI(url, options);
      setData(result); // Assuming result is the expected data directly
    } catch (err) {
      setError((err as Error).message); // Set the error message from the thrown error
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
