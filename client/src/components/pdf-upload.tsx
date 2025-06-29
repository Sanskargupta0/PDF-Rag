import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CloudUpload, File } from "lucide-react";

export function PDFUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const  handleFileChange = async(selectedFile: File | null) => {
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    if (selectedFile.size > 10 * 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 100MB",
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        toast({
          title: "File uploaded successfully",
          description: `Your PDF has been uploaded successfully. You can now ask questions.`
        });
      } else {
        toast({
          title: "Error uploading file",
          description: "Please try again later",
          variant: "destructive",
        });
        setFile(null);
      }

    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Error uploading file",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`w-full max-w-lg mx-auto rounded-xl border-2 border-dashed p-8 text-center transition-all ${
        isDragging
          ? "border-accent bg-accent/10"
          : "border-border hover:border-accent/50"
      } glassmorphism`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        className="hidden"
        accept=".pdf"
      />

      {file ? (
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
            <File className="h-6 w-6 text-accent" />
          </div>
          <div>
            <p className="font-medium">{file.name}</p>
            <p className="text-sm text-muted-foreground">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              setFile(null);
            }}
          >
            Replace File
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center animate-pulse">
            <CloudUpload className="h-6 w-6 text-accent" />
          </div>
          <div>
            <p className="font-medium">Drop your PDF here or click to browse</p>
            <p className="text-sm text-muted-foreground">
              Upload a PDF document to start asking questions
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
