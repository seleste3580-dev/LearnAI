"use client";

import { useState, useRef } from 'react';
import { getSummaryForDocument } from '@/actions/ai';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, File, X, Loader2 } from 'lucide-react';
import type { SummarizeDocumentOutput } from '@/ai/flows/upload-document-for-summary';

export function DocumentUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<SummarizeDocumentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setSummary(null); // Clear previous summary
    }
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
        setFile(droppedFile);
        setSummary(null);
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }

  const handleAnalyze = async () => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please select a file to analyze.',
      });
      return;
    }

    setIsLoading(true);
    setSummary(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Data = reader.result as string;
      const result = await getSummaryForDocument(base64Data);
      if (result.success) {
        setSummary(result.data);
      } else {
        toast({
          variant: 'destructive',
          title: 'Analysis Failed',
          description: result.error,
        });
      }
      setIsLoading(false);
    };
    reader.onerror = () => {
      toast({
        variant: 'destructive',
        title: 'File Read Error',
        description: 'Could not read the selected file.',
      });
      setIsLoading(false);
    };
  };

  const clearFile = () => {
    setFile(null);
    setSummary(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Upload Document</CardTitle>
          <CardDescription>Select a document to get an AI-powered summary.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {!file ? (
                <div 
                    className="flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleFileDrop}
                    onDragOver={handleDragOver}
                >
                    <UploadCloud className="w-12 h-12 text-muted-foreground mb-4" />
                    <p className="font-semibold">Click or drag &amp; drop to upload</p>
                    <p className="text-sm text-muted-foreground">PDF, TXT, DOCX, etc.</p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
            ) : (
                <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                        <File className="w-6 h-6 text-primary" />
                        <div className="flex flex-col">
                            <span className="font-medium text-sm">{file.name}</span>
                            <span className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</span>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={clearFile}>
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            )}
            <Button onClick={handleAnalyze} disabled={!file || isLoading} className="w-full">
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                    </>
                ) : "Analyze Document" }
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Summary</CardTitle>
          <CardDescription>The key points from your document will appear here.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          )}
          {summary && (
            <p className="text-sm whitespace-pre-wrap">{summary.summary}</p>
          )}
          {!isLoading && !summary && (
            <div className="text-center text-muted-foreground py-10">
                <p>Upload a document and click &quot;Analyze&quot; to see the summary.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
