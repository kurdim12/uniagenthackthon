"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Sparkles, Calendar, MessageSquare, ArrowRight, Play, CheckCircle2, Zap, Brain, Target, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const router = useRouter();

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Learning",
      description: "7 specialized AI agents help you study smarter, not harder",
    },
    {
      icon: Calendar,
      title: "Smart Study Planning",
      description: "AI optimizes your schedule and detects conflicts automatically",
    },
    {
      icon: BookOpen,
      title: "Course Management",
      description: "Organize materials, assignments, exams, and notes in one place",
    },
    {
      icon: MessageSquare,
      title: "Intelligent Tutor",
      description: "Ask questions about your course materials with RAG-powered responses",
    },
  ];

  const goldenPaths = [
    {
      title: "PDF → Flashcards",
      description: "Upload PDFs and automatically generate spaced repetition flashcards",
      icon: BookOpen,
      path: "/courses/course-1?tab=flashcards",
    },
    {
      title: "Study Plan → iCal Export",
      description: "AI-powered study planning with calendar integration",
      path: "/study-plan",
      icon: Calendar,
    },
    {
      title: "Tutor → RAG Q&A",
      description: "Ask questions with retrieval-augmented generation and citations",
      path: "/courses/course-1?tab=tutor",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 ai-glow"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Academic Operating System</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="gradient-text">
              UNI-Agent
            </span>
            <br />
            <span className="text-foreground">Your Intelligent</span>
            <br />
            <span className="text-foreground">Study Companion</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Transform your academic journey with AI-powered course management, 
            intelligent study planning, and personalized tutoring—all in one beautiful platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              onClick={() => router.push("/auth/signin")}
              className="min-h-[44px] px-8 text-lg group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <Play className="mr-2 h-5 w-5" />
                Enter Demo
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => router.push("/demo")}
              className="min-h-[44px] px-8 text-lg group"
            >
              <ArrowRight className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              See Golden Paths
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 pt-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">7</div>
              <div className="text-sm text-muted-foreground">AI Agents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">28K+</div>
              <div className="text-sm text-muted-foreground">Lines of Code</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">100%</div>
              <div className="text-sm text-muted-foreground">TypeScript</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-24 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Card className="border-2 hover:shadow-xl transition-all hover:border-primary/50 h-full group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="p-6 relative z-10">
                    <motion.div
                      className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-purple-600/10 w-fit mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Golden Paths Demo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Try the <span className="gradient-text">Golden Paths</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Experience the power of AI-driven learning in three quick demos
              </p>
            </motion.div>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {goldenPaths.map((path, idx) => {
              const Icon = path.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.9 + idx * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className="group cursor-pointer hover:shadow-2xl transition-all border-2 hover:border-primary/50 h-full relative overflow-hidden"
                    onClick={() => router.push(path.path)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-purple-600/0 group-hover:from-primary/10 group-hover:to-purple-600/10 transition-all duration-300" />
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-start gap-4">
                        <motion.div
                          className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-purple-600/20"
                          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon className="w-6 h-6 text-primary" />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{path.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{path.description}</p>
                          <div className="flex items-center gap-2 text-primary text-sm font-medium">
                            <span>Try it</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <div className="mt-20 text-center">
          <p className="text-sm text-muted-foreground mb-4">Built with</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <span className="px-3 py-1 rounded-full bg-card border">Next.js 14</span>
            <span className="px-3 py-1 rounded-full bg-card border">TypeScript</span>
            <span className="px-3 py-1 rounded-full bg-card border">Tailwind CSS</span>
            <span className="px-3 py-1 rounded-full bg-card border">shadcn/ui</span>
            <span className="px-3 py-1 rounded-full bg-card border">OpenAI</span>
            <span className="px-3 py-1 rounded-full bg-card border">Supabase</span>
          </div>
        </div>
      </div>
    </div>
  );
}

