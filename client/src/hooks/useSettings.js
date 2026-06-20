import { useState, useEffect } from "react";
import { settingsService } from "../services/settingsService";

let cachedSettings = null;

export const useSettings = () => {
  const [settings, setSettings] = useState(cachedSettings);
  const [loading, setLoading] = useState(!cachedSettings);

  useEffect(() => {
    if (cachedSettings) return;

    const fetch = async () => {
      try {
        const data = await settingsService.get();
        cachedSettings = data;
        setSettings(data);
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { settings, loading };
};
