"use client";

import { useState, useRef } from "react";
import { useCourse } from "@/components/course-context";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Link as LinkIcon, Video, File, Loader2, ExternalLink, BookOpen } from "lucide-react";
import { QuickActionsDrawer } from "./quick-actions-drawer";
import { generateId } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

export function CourseMaterials() {
  const { courseId } = useCourse();
  const { toast } = useToast();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const materials = useStore((state) =>
    state.materials.filter((m) => m.courseId === courseId)
  );
  const addMaterial = useStore((state) => state.addMaterial);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !courseId) return;

    setUploading(true);

    try {
      let textPreview = "";
      if (file.type === "application/pdf") {
        try {
          const { extractTextFromPDF } = await import("@/lib/pdf-extraction");
          textPreview = await extractTextFromPDF(file);
          textPreview = textPreview.substring(0, 500);
        } catch (error) {
          console.error("PDF extraction failed:", error);
          textPreview = "PDF uploaded (text extraction failed)";
        }
      } else if (file.type === "text/plain") {
        textPreview = await file.text();
        textPreview = textPreview.substring(0, 500);
      }

      const newMaterial = {
        id: generateId(),
        courseId,
        title: file.name,
        type: file.type === "application/pdf" ? "pdf" as const : "text" as const,
        source: file.name,
        textPreview: textPreview || undefined,
      };

      addMaterial(newMaterial);

      toast({
        title: "Success",
        description: `File "${file.name}" uploaded successfully!`,
      });
    } catch (error) {
      console.error("Upload failed:", error);
      toast({
        title: "Error",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return FileText;
      case "url":
        return LinkIcon;
      case "video":
        return Video;
      default:
        return File;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="w-7 h-7" />
                Course Materials
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Upload PDFs, add links, and organize your study resources
              </p>
            </div>
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                variant="outline"
                size="lg"
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-5 w-5" />
                    Upload PDF
                  </>
                )}
              </Button>
              <Button onClick={() => setDrawerOpen(true)} size="lg">
                <Upload className="mr-2 h-5 w-5" />
                Add Material
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {materials.length === 0 ? (
            <div className="text-center py-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <FileText className="w-20 h-20 text-muted-foreground mx-auto mb-4" />
                <p className="text-xl font-semibold mb-2">No materials yet</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Add PDFs, links, or videos to build your study library
                </p>
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    size="lg"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-5 w-5" />
                        Upload PDF
                      </>
                    )}
                  </Button>
                  <Button onClick={() => setDrawerOpen(true)} variant="outline" size="lg">
                    <LinkIcon className="mr-2 h-5 w-5" />
                    Add Link
                  </Button>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {materials.map((material, idx) => {
                const Icon = getIcon(material.type);
                const typeColors = {
                  pdf: "from-red-500/10 to-red-600/10 border-red-500/30",
                  url: "from-blue-500/10 to-blue-600/10 border-blue-500/30",
                  video: "from-purple-500/10 to-purple-600/10 border-purple-500/30",
                  text: "from-green-500/10 to-green-600/10 border-green-500/30",
                };
                const bgClass = typeColors[material.type as keyof typeof typeColors] || "from-gray-500/10 to-gray-600/10 border-gray-500/30";
                
                return (
                  <motion.div
                    key={material.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -4 }}
                  >
                    <Card className={`hover:shadow-2xl transition-all border-2 bg-gradient-to-br ${bgClass} h-full`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-background/50">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-base font-semibold line-clamp-2">
                                {material.title}
                              </CardTitle>
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs uppercase font-semibold mt-2 w-fit">
                          {material.type}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {material.textPreview || material.source}
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="default" className="flex-1 gap-1">
                            <ExternalLink className="w-3 h-3" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="gap-1">
                            <Upload className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
      <QuickActionsDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  );
}
