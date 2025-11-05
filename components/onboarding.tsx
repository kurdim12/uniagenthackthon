"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BookOpen,
  Calendar,
  MessageSquare,
  Sparkles,
  Target,
  Zap,
  X,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface OnboardingStep {
  icon: any;
  title: string;
  description: string;
  highlight: string;
  demo?: string;
}

const steps: OnboardingStep[] = [
  {
    icon: Sparkles,
    title: "Welcome to UNI-Agent",
    description: "Your AI-powered academic operating system. Let's take a quick 60-second tour of what makes this platform special.",
    highlight: "Multi-Agent AI System",
    demo: "7 specialized AI agents work together to help you study smarter",
  },
  {
    icon: BookOpen,
    title: "Course Management",
    description: "Each course gets its own dedicated space with materials, assignments, exams, and more—all organized intelligently.",
    highlight: "Single-Route Architecture",
    demo: "Everything you need in one place, beautifully organized",
  },
  {
    icon: Calendar,
    title: "Smart Study Planning",
    description: "AI detects conflicts, optimizes your schedule, and exports to Google Calendar—all automatically.",
    highlight: "AI-Powered Optimization",
    demo: "Never miss a deadline or double-book yourself again",
  },
  {
    icon: MessageSquare,
    title: "Intelligent Tutor",
    description: "Ask questions about your course materials. The AI searches your PDFs and notes to give cited answers.",
    highlight: "RAG-Powered Q&A",
    demo: "Like ChatGPT, but trained on YOUR course content",
  },
  {
    icon: Target,
    title: "Ready to Start!",
    description: "You're all set! Explore your courses, upload materials, and let the AI help you ace your exams.",
    highlight: "Let's Go",
    demo: "Jump in and experience the future of learning",
  },
];

export function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleNext = () => {
    console.log('Next clicked! Current step:', currentStep);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      console.log('Moving to step:', currentStep + 1);
    } else {
      console.log('Completing onboarding');
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  const handleSkip = () => {
    handleClose();
  };

  const step = steps[currentStep];
  const Icon = step.icon;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl relative z-50"
          >
            <Card className="relative overflow-hidden border-2 ai-glow">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-accent transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Progress Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-purple-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Icon */}
                    <div className="flex justify-center">
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-600/20 relative">
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <Icon className="w-12 h-12 text-primary" />
                        </motion.div>
                        <motion.div
                          className="absolute inset-0 rounded-2xl bg-primary/20"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-4">
                      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        {step.title}
                      </h2>
                      <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        {step.description}
                      </p>

                      {/* Highlight Badge */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">
                          {step.highlight}
                        </span>
                      </div>

                      {step.demo && (
                        <p className="text-sm text-muted-foreground italic">
                          {step.demo}
                        </p>
                      )}
                    </div>

                    {/* Step Indicator */}
                    <div className="flex justify-center gap-2">
                      {steps.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentStep(idx)}
                          className="group"
                        >
                          <div
                            className={`h-2 rounded-full transition-all ${
                              idx === currentStep
                                ? "w-8 bg-primary"
                                : idx < currentStep
                                ? "w-2 bg-primary/50"
                                : "w-2 bg-muted"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="border-t px-8 py-6 flex items-center justify-between bg-background relative z-50">
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  className="text-muted-foreground hover:text-foreground"
                  type="button"
                >
                  Skip Tour
                </Button>

                <div className="flex gap-2">
                  {currentStep > 0 && (
                    <Button 
                      variant="outline" 
                      onClick={handlePrev}
                      type="button"
                      className="z-50"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Back
                    </Button>
                  )}
                  <Button 
                    onClick={handleNext} 
                    className="min-w-[120px] z-50"
                    type="button"
                  >
                    {currentStep === steps.length - 1 ? (
                      "Get Started"
                    ) : (
                      <>
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
