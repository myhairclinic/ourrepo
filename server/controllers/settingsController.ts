import { Request, Response } from "express";
import { storage } from "../storage";
import { insertSettingSchema } from "@shared/schema";
import { z } from "zod";

// Get all settings for a specific section
export const getSettingsBySection = async (req: Request, res: Response) => {
  try {
    const { section } = req.params;
    
    if (!section) {
      return res.status(400).json({ message: "Section parameter is required" });
    }
    
    const settings = await storage.getSettings(section);
    return res.status(200).json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return res.status(500).json({ message: "Failed to fetch settings" });
  }
};

// Get a specific setting by section and key
export const getSettingByKey = async (req: Request, res: Response) => {
  try {
    const { section, key } = req.params;
    
    if (!section || !key) {
      return res.status(400).json({ message: "Section and key parameters are required" });
    }
    
    const setting = await storage.getSettingsByKey(section, key);
    
    if (!setting) {
      return res.status(404).json({ message: "Setting not found" });
    }
    
    return res.status(200).json(setting);
  } catch (error) {
    console.error("Error fetching setting:", error);
    return res.status(500).json({ message: "Failed to fetch setting" });
  }
};

// Save a setting (create or update)
export const saveSetting = async (req: Request, res: Response) => {
  try {
    const settingData = req.body;
    
    // Parse and validate incoming data
    const result = insertSettingSchema.safeParse(settingData);
    
    if (!result.success) {
      return res.status(400).json({ 
        message: "Invalid setting data", 
        errors: result.error.format() 
      });
    }
    
    const setting = await storage.saveSetting(result.data);
    return res.status(200).json(setting);
  } catch (error) {
    console.error("Error saving setting:", error);
    return res.status(500).json({ message: "Failed to save setting" });
  }
};

// Update multiple settings at once
export const updateSettings = async (req: Request, res: Response) => {
  try {
    const settingsData = req.body;
    
    if (!Array.isArray(settingsData)) {
      return res.status(400).json({ message: "Expected an array of settings" });
    }
    
    // Validate each setting in the array
    const batchSettingSchema = z.array(insertSettingSchema);
    const result = batchSettingSchema.safeParse(settingsData);
    
    if (!result.success) {
      return res.status(400).json({ 
        message: "Invalid settings data", 
        errors: result.error.format() 
      });
    }
    
    const settings = await storage.updateSettings(result.data);
    return res.status(200).json(settings);
  } catch (error) {
    console.error("Error updating settings:", error);
    return res.status(500).json({ message: "Failed to update settings" });
  }
};

// Delete a setting
export const deleteSetting = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: "Valid ID parameter is required" });
    }
    
    const success = await storage.deleteSetting(Number(id));
    
    if (!success) {
      return res.status(404).json({ message: "Setting not found or could not be deleted" });
    }
    
    return res.status(200).json({ message: "Setting deleted successfully" });
  } catch (error) {
    console.error("Error deleting setting:", error);
    return res.status(500).json({ message: "Failed to delete setting" });
  }
};