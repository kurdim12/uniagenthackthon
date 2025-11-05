"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getAllAccounts, getCurrentAccountId, setCurrentAccountId, getAccount, type DemoAccount } from "@/lib/accounts";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Onboarding } from "@/components/onboarding";

export default function SelectAccountPage() {
  const router = useRouter();
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [switching, setSwitching] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const accounts = getAllAccounts();
  const currentAccountId = getCurrentAccountId();
  const store = useStore();

  const handleSelectAccount = async (accountId: string) => {
    if (switching || accountId === currentAccountId) return;

    setSwitching(true);
    setSelectedAccountId(accountId);

    try {
      // Switch account in store
      await store.switchAccount(accountId);
      
      // Set as current account
      setCurrentAccountId(accountId);
      
      // Wait a bit for store to update
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      // Get account info
      const account = getAccount(accountId);
      if (!account) return;

      // Show onboarding on first account selection
      const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
      if (!hasSeenOnboarding) {
        setShowOnboarding(true);
        localStorage.setItem("hasSeenOnboarding", "true");
        setSwitching(false); // Stop switching state
        // Don't redirect - let onboarding complete first
      } else {
        // If already seen onboarding, redirect immediately
        const courses = store.courses;
        if (courses.length > 0) {
          router.push(`/courses/${courses[0].id}`);
        } else {
          router.push("/courses");
        }
      }
    } catch (error) {
      console.error("Failed to switch account:", error);
      setSwitching(false);
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    // Now redirect after onboarding completes
    const courses = store.courses;
    if (courses.length > 0) {
      router.push(`/courses/${courses[0].id}`);
    } else {
      router.push("/courses");
    }
  };

  return (
    <>
      {showOnboarding && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}
      
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-90" />
        
        {/* Animated orbs */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <div className="w-full max-w-5xl relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md mb-6 shadow-2xl relative border border-white/30"
            >
              <Sparkles className="w-10 h-10 text-white" />
              <motion.div
                className="absolute inset-0 rounded-3xl bg-white/20"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">UNI-Agent</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl">Choose your demo account to begin</p>
          </motion.div>

        {/* Account Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {accounts.map((account, idx) => {
            const isCurrent = account.id === currentAccountId;
            const isSelected = account.id === selectedAccountId;
            const isDisabled = switching && !isSelected;

            return (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={cn(
                    "relative cursor-pointer transition-all backdrop-blur-md bg-white/10 border-2 border-white/20 hover:bg-white/20 hover:shadow-2xl overflow-hidden",
                    isCurrent && "ring-2 ring-yellow-400 bg-white/20",
                    isDisabled && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => !isDisabled && handleSelectAccount(account.id)}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {isCurrent && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-yellow-400 text-black font-semibold">
                        <Check className="w-3 h-3 mr-1" />
                        Current
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="text-6xl">{account.avatar}</div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl text-white">{account.name}</CardTitle>
                        <CardDescription className="mt-1 text-white/70">{account.email}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4 relative z-10">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/80">Major:</span>
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">{account.major}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/80">Year:</span>
                        <span className="font-medium text-white">{account.year}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/80">Study Style:</span>
                        <Badge variant="outline" className="capitalize bg-white/10 text-white border-white/30">
                          {account.preferences.studyStyle}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/80">Best Time:</span>
                        <Badge variant="outline" className="capitalize bg-white/10 text-white border-white/30">
                          {account.preferences.studyTime}
                        </Badge>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/20">
                      <Button
                        className={cn(
                          "w-full min-h-[44px] font-semibold transition-all",
                          isCurrent 
                            ? "bg-white/20 text-white border-white/30"
                            : "bg-white text-purple-600 hover:bg-white/90"
                        )}
                        disabled={isDisabled || isCurrent}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isDisabled && !isCurrent) {
                            handleSelectAccount(account.id);
                          }
                        }}
                      >
                        {switching && isSelected ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Loading...
                          </>
                        ) : isCurrent ? (
                          "Current Account"
                        ) : (
                          <>
                            Select Account
                            <motion.span
                              className="ml-2"
                              animate={{ x: [0, 4, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              →
                            </motion.span>
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Info */}
        <div className="mt-8 text-center">
          <p className="text-white/70 text-sm">
            Each account has completely isolated data and different course content
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

