// src/api/base44Client.js
// Mock Base44 client for demo & frontend-only deployment

export const base44 = {
  entities: {
    Product: {
      list: async () => {
        // return empty array or demo products
        return [];
      },
      create: async (product) => {
        console.log("Product created (mock):", product);
        return { id: Date.now(), ...product };
      },
    },

    Order: {
      list: async () => {
        // return empty array or demo orders
        return [];
      },
      update: async (id, updates) => {
        console.log("Order updated (mock):", id, updates);
        return { id, ...updates };
      },
    },
  },

  integrations: {
    Core: {
      UploadFile: async ({ file }) => {
        // Create local preview URL (works on Vercel)
        const file_url = URL.createObjectURL(file);
        console.log("File uploaded (mock):", file_url);
        return { file_url };
      },
    },
  },
};
