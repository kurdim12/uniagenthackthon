// Mode configuration and feature flags

export type AIOMode = "cloud" | "demo" | "offline";

export const AIO_MODE = (process.env.AIO_MODE || "cloud") as AIOMode;

export const config = {
  mode: AIO_MODE,
  
  // Feature flags based on mode
  features: {
    useLocalStorage: AIO_MODE === "demo" || AIO_MODE === "offline",
    useSupabase: AIO_MODE === "cloud",
    useRealAI: true, // Always use real AI in production
    useAuth: true, // Always require authentication
    useCloudStorage: AIO_MODE === "cloud",
    useVectorRetrieval: AIO_MODE === "cloud",
    enableSubscriptions: AIO_MODE === "cloud", // New: Enable billing
    enableUsageLimits: AIO_MODE === "cloud", // New: Track usage
  },
  
  // AI configuration
  ai: {
    apiKey: process.env.OPENAI_API_KEY || "",
    chatModel: process.env.AI_CHAT_MODEL || "gpt-4o-mini",
    embedModel: process.env.AI_EMBED_MODEL || "text-embedding-3-large",
  },
  
  // Stripe configuration for subscriptions
  stripe: {
    publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
    secretKey: process.env.STRIPE_SECRET_KEY || "",
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
    priceIds: {
      free: "price_free", // No charge
      pro: process.env.STRIPE_PRO_PRICE_ID || "price_pro_monthly",
      enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID || "price_enterprise_monthly",
    },
  },
  
  // Usage limits per plan
  limits: {
    free: {
      courses: 3,
      aiRequests: 50,
      storage: 100 * 1024 * 1024, // 100MB
      teamMembers: 1,
    },
    pro: {
      courses: 999,
      aiRequests: 1000,
      storage: 5 * 1024 * 1024 * 1024, // 5GB
      teamMembers: 1,
    },
    enterprise: {
      courses: 9999,
      aiRequests: -1, // Unlimited
      storage: 50 * 1024 * 1024 * 1024, // 50GB
      teamMembers: 50,
    },
  },
  
  // Supabase configuration (cloud mode only)
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    serviceRole: process.env.SUPABASE_SERVICE_ROLE || "",
    bucket: process.env.SUPABASE_BUCKET || "uniagent",
  },
  
  // NextAuth configuration (cloud mode only)
  auth: {
    secret: process.env.NEXTAUTH_SECRET || "changeme",
    url: process.env.NEXTAUTH_URL || "http://localhost:3000",
  },
};

// Helper functions
export const isDemoMode = () => AIO_MODE === "demo";
export const isCloudMode = () => AIO_MODE === "cloud";
export const isOfflineMode = () => AIO_MODE === "offline";

export const getModeName = () => {
  switch (AIO_MODE) {
    case "demo":
      return "Demo (No Database)";
    case "cloud":
      return "Cloud (Supabase)";
    case "offline":
      return "Offline (Mock)";
    default:
      return "Unknown";
  }
};

export const getModeDescription = () => {
  switch (AIO_MODE) {
    case "demo":
      return "Running with localStorage. Data is saved in your browser only.";
    case "cloud":
      return "Connected to Supabase. Data syncs across devices.";
    case "offline":
      return "Offline mode. No network calls, deterministic responses.";
    default:
      return "";
  }
};

