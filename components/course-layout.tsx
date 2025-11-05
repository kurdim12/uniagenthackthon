"use client";

import { useState, useEffect } from "react";
import { useCourse } from "@/components/course-context";
import { useStore } from "@/lib/store";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  FileText,
  Calendar,
  MessageSquare,
  StickyNote,
  GraduationCap,
  BarChart3,
  Settings,
  Search,
  Plus,
  Sparkles,
  CreditCard,
  Menu,
  X,
  ChevronLeft,
  Home,
  Layers,
  Brain,
  Zap,
} from "lucide-react";
import { CourseOverview } from "./course/overview";
import { CourseMaterials } from "./course/materials";
import { CourseAssignments } from "./course/assignments";
import { CoursePlanner } from "./course/planner";
import { CourseTutor } from "./course/tutor";
import { CourseAgents } from "./course/agents";
import { CourseNotes } from "./course/notes";
import { CourseExams } from "./course/exams";
import { CourseAnalytics } from "./course/analytics";
import { CourseSettings } from "./course/settings";
import { CourseFlashcards } from "./course/flashcards";
import { QuickActionsDrawer } from "./course/quick-actions-drawer";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function CourseLayout() {
  const { course, courses, switchCourse, isLoading } = useCourse();
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabFromUrl = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabFromUrl || "overview");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const user = useStore((state) => state.getCurrentUser());

  // Sync tab with URL
  useEffect(() => {
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl, activeTab]);

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isLoading || !course) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="text-muted-foreground">Loading course...</p>
        </div>
      </div>
    );
  }

  const filteredCourses = courses.filter(
    (c) =>
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Premium Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: isMobile && !sidebarOpen ? -300 : 0,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className={cn(
          "glass-effect border-r border-white/20 dark:border-slate-800/50 flex flex-col shadow-2xl z-50",
          "fixed lg:static inset-y-0 left-0 w-80"
        )}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/10 dark:border-slate-800/50 bg-gradient-to-r from-primary/5 to-purple-500/5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-base font-bold">UNI-Agent</h2>
                <p className="text-xs text-muted-foreground">AI Study Platform</p>
              </div>
            </div>
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                className="h-9 w-9 hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-white/50 dark:bg-slate-900/50 border-white/20 dark:border-slate-800 backdrop-blur-sm focus:bg-white dark:focus:bg-slate-900"
            />
          </div>
        </div>

        {/* Course List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredCourses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-sm text-muted-foreground">No courses found</p>
            </motion.div>
          ) : (
            filteredCourses.map((c, idx) => (
              <motion.button
                key={c.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => {
                  switchCourse(c.id);
                  if (isMobile) setSidebarOpen(false);
                }}
                className={cn(
                  "w-full text-left p-4 rounded-xl transition-all group relative overflow-hidden",
                  c.id === course.id
                    ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg scale-[1.02]"
                    : "hover:bg-white/50 dark:hover:bg-slate-800/50 hover:shadow-md"
                )}
              >
                {c.id === course.id && (
                  <motion.div
                    layoutId="active-course"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-xl"
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  />
                )}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-1">
                    <div className={cn(
                      "p-1.5 rounded-lg",
                      c.id === course.id ? "bg-white/20" : "bg-primary/10"
                    )}>
                      <BookOpen className={cn(
                        "w-4 h-4",
                        c.id === course.id ? "text-white" : "text-primary"
                      )} />
                    </div>
                    <p className={cn(
                      "font-semibold text-sm",
                      c.id === course.id ? "text-white" : "text-foreground"
                    )}>
                      {c.code}
                    </p>
                  </div>
                  <p className={cn(
                    "text-xs ml-9 truncate",
                    c.id === course.id ? "text-white/90" : "text-muted-foreground"
                  )}>
                    {c.title}
                  </p>
                </div>
              </motion.button>
            ))
          )}
        </div>

        {/* Quick Action Button */}
        <div className="p-4 border-t border-white/10 dark:border-slate-800/50 bg-gradient-to-r from-primary/5 to-purple-500/5">
          <Button
            className="w-full h-12 font-semibold bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg"
            onClick={() => {
              setDrawerOpen(true);
              if (isMobile) setSidebarOpen(false);
            }}
          >
            <Plus className="w-5 h-5 mr-2" />
            Quick Actions
          </Button>
        </div>
      </motion.div>

      {/* Premium Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Premium Course Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-effect border-b border-white/20 dark:border-slate-800/50 p-6 shadow-lg"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(true)}
                  className="h-10 w-10 hover:bg-white/20"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-lg">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                    {course.code}
                  </h1>
                  {course.term && (
                    <Badge className="bg-primary/10 text-primary border-primary/20 font-semibold px-3 py-1">
                      {course.term}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {course.title}
                </p>
              </div>
            </div>
            <Button
              onClick={() => setDrawerOpen(true)}
              size="lg"
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hidden md:flex"
            >
              <Zap className="mr-2 h-5 w-5" />
              Quick Actions
            </Button>
          </div>
        </motion.div>

        {/* Premium Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-1 flex flex-col overflow-hidden">
          <div className="glass-effect border-b border-white/10 dark:border-slate-800/50 px-6">
            <TabsList className="h-auto bg-transparent p-0 gap-2 overflow-x-auto">
              <TabsTrigger
                value="overview"
                className="gap-2 px-4 py-3 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all hover:bg-white/50 dark:hover:bg-slate-800/50"
              >
                <Home className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="materials"
                className="gap-2 px-4 py-3 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all hover:bg-white/50 dark:hover:bg-slate-800/50"
              >
                <FileText className="w-4 h-4" />
                Materials
              </TabsTrigger>
              <TabsTrigger
                value="assignments"
                className="gap-2 px-4 py-3 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all hover:bg-white/50 dark:hover:bg-slate-800/50"
              >
                <FileText className="w-4 h-4" />
                Assignments
              </TabsTrigger>
              <TabsTrigger
                value="tutor"
                className="gap-2 px-4 py-3 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all hover:bg-white/50 dark:hover:bg-slate-800/50"
              >
                <Brain className="w-4 h-4" />
                AI Tutor
              </TabsTrigger>
              <TabsTrigger
                value="flashcards"
                className="gap-2 px-4 py-3 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all hover:bg-white/50 dark:hover:bg-slate-800/50"
              >
                <CreditCard className="w-4 h-4" />
                Flashcards
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="gap-2 px-4 py-3 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl transition-all hover:bg-white/50 dark:hover:bg-slate-800/50"
              >
                <BarChart3 className="w-4 h-4" />
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Content with Premium Background */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-gradient-to-br from-slate-50/50 via-white to-blue-50/50 dark:from-slate-950/50 dark:via-slate-900/50 dark:to-slate-950/50">
            <TabsContent value="overview" className="mt-0 h-full">
              <CourseOverview />
            </TabsContent>
            <TabsContent value="materials" className="mt-0 h-full">
              <CourseMaterials />
            </TabsContent>
            <TabsContent value="assignments" className="mt-0 h-full">
              <CourseAssignments />
            </TabsContent>
            <TabsContent value="tutor" className="mt-0 h-full">
              <CourseTutor />
            </TabsContent>
            <TabsContent value="flashcards" className="mt-0 h-full">
              <CourseFlashcards />
            </TabsContent>
            <TabsContent value="analytics" className="mt-0 h-full">
              <CourseAnalytics />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Quick Actions Drawer */}
      <QuickActionsDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  );
}