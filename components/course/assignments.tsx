"use client";

import { useState } from "react";
import { useCourse } from "@/components/course-context";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GripVertical, Plus, Calendar, CheckCircle2, Clock } from "lucide-react";
import { formatRelative } from "@/lib/time";
import type { AssignStatus } from "@/lib/types";
import { QuickActionsDrawer } from "./quick-actions-drawer";
import { motion } from "framer-motion";

const columns: { id: AssignStatus; title: string }[] = [
  { id: "planned", title: "To Do" },
  { id: "in_progress", title: "Doing" },
  { id: "submitted", title: "Done" },
];

export function CourseAssignments() {
  const { courseId } = useCourse();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const assignments = useStore((state) =>
    state.assignments.filter((a) => a.courseId === courseId)
  );
  const updateAssignment = useStore((state) => state.updateAssignment);

  const handleStatusChange = (assignmentId: string, newStatus: AssignStatus) => {
    updateAssignment(assignmentId, { status: newStatus });
  };

  return (
    <div className="space-y-6">
      {/* Header Card with Gradient */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <span className="text-2xl">📋</span>
                Assignments Kanban
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Drag and drop to organize your work
              </p>
            </div>
            <Button onClick={() => setDrawerOpen(true)} size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Add Assignment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {columns.map((column, colIdx) => {
              const columnAssignments = assignments.filter((a) => a.status === column.id);
              
              // Column styling based on type
              const columnColors: Record<AssignStatus, string> = {
                planned: "from-blue-500/10 to-blue-600/5 border-blue-500/30",
                in_progress: "from-yellow-500/10 to-orange-500/5 border-yellow-500/30",
                submitted: "from-green-500/10 to-emerald-500/5 border-green-500/30",
                overdue: "from-red-500/10 to-red-600/5 border-red-500/30",
              };
              
              const columnIcons: Record<AssignStatus, React.ReactNode> = {
                planned: <Clock className="w-4 h-4" />,
                in_progress: <Calendar className="w-4 h-4" />,
                submitted: <CheckCircle2 className="w-4 h-4" />,
                overdue: <Clock className="w-4 h-4" />,
              };
              
              return (
                <motion.div
                  key={column.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: colIdx * 0.1 }}
                  className={`rounded-xl bg-gradient-to-br ${columnColors[column.id]} border-2 p-4`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {columnIcons[column.id]}
                      <h3 className="font-bold text-lg">{column.title}</h3>
                    </div>
                    <Badge variant="secondary" className="text-sm font-semibold">
                      {columnAssignments.length}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 min-h-[300px]">
                    {columnAssignments.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                        <p className="text-sm">No assignments</p>
                      </div>
                    ) : (
                      columnAssignments.map((assignment, idx) => (
                        <motion.div
                          key={assignment.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ scale: 1.02, y: -2 }}
                        >
                          <Card className="cursor-move hover:shadow-xl transition-all border-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-2">
                                <GripVertical className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-sm mb-1">{assignment.title}</p>
                                  {assignment.description && (
                                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                      {assignment.description}
                                    </p>
                                  )}
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                                    <Calendar className="w-3 h-3" />
                                    Due {formatRelative(assignment.dueAt)}
                                  </div>
                                  {assignment.subtasks && assignment.subtasks.length > 0 && (
                                    <div className="mb-3">
                                      <div className="flex items-center justify-between text-xs mb-1">
                                        <span className="text-muted-foreground">Progress</span>
                                        <span className="font-semibold">
                                          {assignment.subtasks.filter((t) => t.done).length}/{assignment.subtasks.length}
                                        </span>
                                      </div>
                                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                        <div
                                          className="bg-primary h-1.5 rounded-full transition-all"
                                          style={{
                                            width: `${(assignment.subtasks.filter((t) => t.done).length / assignment.subtasks.length) * 100}%`,
                                          }}
                                        />
                                      </div>
                                    </div>
                                  )}
                                  <div className="flex gap-2">
                                    {column.id !== "planned" && (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-xs h-8 flex-1"
                                        onClick={() => {
                                          const prevIndex = columns.findIndex((c) => c.id === column.id);
                                          if (prevIndex > 0) {
                                            handleStatusChange(assignment.id, columns[prevIndex - 1].id);
                                          }
                                        }}
                                      >
                                        ← Move Back
                                      </Button>
                                    )}
                                    {column.id !== "submitted" && (
                                      <Button
                                        size="sm"
                                        className="text-xs h-8 flex-1"
                                        onClick={() => {
                                          const nextIndex = columns.findIndex((c) => c.id === column.id);
                                          if (nextIndex < columns.length - 1) {
                                            handleStatusChange(assignment.id, columns[nextIndex + 1].id);
                                          }
                                        }}
                                      >
                                        Move Forward →
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      <QuickActionsDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  );
}

