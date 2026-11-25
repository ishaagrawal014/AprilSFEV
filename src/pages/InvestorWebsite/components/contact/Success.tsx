import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuccessStateProps {
  name: string;
  className?: string;
}

export const SuccessState = ({ name, className }: SuccessStateProps) => (
  <div className={cn("space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-300", className)}>
    <CheckCircle2 className="mx-auto h-14 w-14 text-green-500" />
    <div className="space-y-2">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Submission received</p>
      <h3 className="text-3xl font-semibold">Thank you{name ? `, ${name}` : ""}!</h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        Our investment team will review your details and connect with you within the next business day. Keep your phone handy — we can’t wait to collaborate.
      </p>
    </div>
  </div>
);

