"use client";

import { useCourse } from "@/components/course-context";
import { useStore } from "@/lib/store";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, AlertCircle, TrendingUp, Calendar, Award, FileText, StickyNote, GraduationCap, CheckCircle2, Zap, Brain, Target, Sparkles, ArrowRight } from "lucide-react";
import { formatRelative } from "@/lib/time";
import { AutoActionsPanel } from "@/components/auto-actions-panel";
import { useXP } from "@/lib/hooks/xp";

export function CourseOverview() {
  const { courseId } = useCourse();
  const assignments = useStore((state) =>
    state.assignments.filter((a) => a.courseId === courseId)
  );
  const exams = useStore((state) =>
    state.exams.filter((e) => e.courseId === courseId)
  );
  const studyBlocks = useStore((state) =>
    state.studyBlocks.filter((b) => b.courseId === courseId)
  );
  const user = useStore((state) => state.getCurrentUser());

  const { totalXP, currentStreak } = useXP(user?.id || "", courseId || "");

  const today = new Date();
  const todayBlocks = studyBlocks.filter((block) => {
    if (!block.startAt) return false;
    const blockDate = new Date(block.startAt);
    return !isNaN(blockDate.getTime()) && blockDate.toDateString() === today.toDateString();
  });

  const dueThisWeek = assignments.filter((a) => {
    if (!a.dueAt || a.status === "submitted") return false;
    const dueDate = new Date(a.dueAt);
    if (isNaN(dueDate.getTime())) return false;
    const weekFromNow = new Date();
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    return dueDate <= weekFromNow;
  });

  const nextExam = exams
    .filter((e) => {
      if (!e.startAt) return false;
      const startDate = new Date(e.startAt);
      return !isNaN(startDate.getTime()) && startDate > today;
    })
    .sort((a, b) => {
      const dateA = a.startAt ? new Date(a.startAt).getTime() : 0;
      const dateB = b.startAt ? new Date(b.startAt).getTime() : 0;
      return dateA - dateB;
    })[0];

  const materials = useStore((state) =>
    state.materials.filter((m) => m.courseId === courseId)
  );

  return (
    <div className="space-y-6">
      {/* Hero Stats Section - Modern Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 p-6 md:p-8 border border-primary/20"
      >
        {/* Animated Background Orb */}
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
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

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-purple-600/20 backdrop-blur-sm"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold">Welcome Back!</h2>
              <p className="text-sm text-muted-foreground">Here's your progress overview</p>
            </div>
          </div>

          {/* Stats Grid - Modern Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="glass-effect border-2 border-primary/30 hover:border-primary/50 transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total XP</CardTitle>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Award className="h-5 w-5 text-primary" />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold gradient-text">{totalXP}</div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Keep earning points!
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="glass-effect border-2 border-orange-500/30 hover:border-orange-500/50 transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Streak</CardTitle>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="text-2xl">🔥</span>
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-orange-500">{currentStreak}</div>
                  <p className="text-xs text-muted-foreground mt-1">Days active</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="glass-effect border-2 border-blue-500/30 hover:border-blue-500/50 transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Assignments</CardTitle>
                  <FileText className="h-5 w-5 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-blue-500">{dueThisWeek.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {dueThisWeek.length === 0 ? "All caught up! 🎉" : "Due this week"}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="glass-effect border-2 border-purple-500/30 hover:border-purple-500/50 transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Materials</CardTitle>
                  <Brain className="h-5 w-5 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-purple-500">{materials.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">Available resources</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Auto Actions Panel */}
      <AutoActionsPanel />

      {/* Main Grid - Modern Layout */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Due This Week - Enhanced */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full border-2 hover:shadow-xl transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                </motion.div>
                <span className="gradient-text">Due This Week</span>
              </CardTitle>
              <CardDescription>
                {dueThisWeek.length} {dueThisWeek.length === 1 ? "assignment" : "assignments"} pending
              </CardDescription>
            </CardHeader>
            <CardContent>
              {dueThisWeek.length === 0 ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-3" />
                  </motion.div>
                  <p className="text-lg font-semibold">All caught up!</p>
                  <p className="text-sm text-muted-foreground mt-1">🎉 Great job staying on top of things</p>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  {dueThisWeek.slice(0, 5).map((assignment, idx) => (
                    <motion.div
                      key={assignment.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ x: 4 }}
                      className="group"
                    >
                      <div className="p-4 rounded-lg border-2 border-orange-200/50 dark:border-orange-800/50 bg-gradient-to-r from-orange-50/50 to-transparent dark:from-orange-950/20 dark:to-transparent hover:shadow-md transition-all cursor-pointer">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                              {assignment.title}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <p className="text-xs text-muted-foreground">
                                Due {formatRelative(assignment.dueAt)}
                              </p>
                            </div>
                          </div>
                          <Badge 
                            variant="outline" 
                            className="text-xs capitalize shrink-0 group-hover:border-primary transition-colors"
                          >
                            {assignment.status.replace("_", " ")}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Next Exam - Enhanced */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full border-2 hover:shadow-xl transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-red-500" />
                <span className="gradient-text">Next Exam</span>
              </CardTitle>
              <CardDescription>
                {nextExam ? "Prepare for success" : "No upcoming exams"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {nextExam ? (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="p-4 rounded-lg bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 border-2 border-red-200/50 dark:border-red-800/50">
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold">{nextExam.title}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            {formatRelative(nextExam.startAt)}
                          </p>
                        </div>
                        <Badge variant="outline" className="mt-2 text-xs capitalize">
                          {nextExam.type}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full group" variant="outline">
                    <Brain className="w-4 h-4 mr-2" />
                    Start Studying
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-12 h-12 text-muted-foreground/50 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No upcoming exams scheduled</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Additional Sections Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Today's Blocks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Today's Blocks
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todayBlocks.length === 0 ? (
              <p className="text-sm text-muted-foreground">No study blocks today</p>
            ) : (
              <div className="space-y-3">
                {todayBlocks.map((block) => (
                  <div key={block.id} className="p-3 rounded-lg bg-accent/50">
                    <p className="font-medium text-sm">{block.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {block.startAt && !isNaN(new Date(block.startAt).getTime())
                        ? new Date(block.startAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Invalid"}{" "}
                      -{" "}
                      {block.endAt && !isNaN(new Date(block.endAt).getTime())
                        ? new Date(block.endAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Invalid"}
                    </p>
                    <Badge variant="outline" className="mt-1 text-xs capitalize">
                      {block.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="h-20 flex flex-col gap-2">
                <FileText className="w-5 h-5" />
                <span className="text-xs">Add Material</span>
              </Button>
              <Button variant="outline" size="sm" className="h-20 flex flex-col gap-2">
                <FileText className="w-5 h-5" />
                <span className="text-xs">New Assignment</span>
              </Button>
              <Button variant="outline" size="sm" className="h-20 flex flex-col gap-2">
                <StickyNote className="w-5 h-5" />
                <span className="text-xs">New Note</span>
              </Button>
              <Button variant="outline" size="sm" className="h-20 flex flex-col gap-2">
                <Calendar className="w-5 h-5" />
                <span className="text-xs">Schedule Study</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

