import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available from environment variables
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a nature image using the Gemini API.
 * @returns A promise that resolves to a Base64 data URL of the generated image.
 */
export const generateNatureImage = async (): Promise<string> => {
  try {
    const prompt = `A breathtaking, photorealistic image of a serene early morning in a classic Persian garden, reminiscent of the landscapes around Tehran. The scenery should accurately reflect the rainy weather for Tehran. Feature elements of Middle Eastern nature, such as elegant trees, and vibrant flowers, birds, glistening with morning dew. In the background, include a subtle view of majestic mountains, like the Alborz range. The lighting should match the weather: soft and golden for a clear morning, or diffused and gentle if it's overcast. The image must have a high-detail, cinematic quality, capturing the unique beauty of a Persian morning.`;

    const response = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '16:9',
      },
    });
    
    if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image.imageBytes) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("Image generation failed: No image data received.");
    }
  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unexpected error occurred during image generation.");
  }
};
