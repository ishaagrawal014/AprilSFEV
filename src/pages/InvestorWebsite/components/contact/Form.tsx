import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import content from "@/data/content.json";
import { cn } from "@/lib/utils";

export interface LeadFormValues {
  name: string;
  phone: string;
  email: string;
  investmentSlab: string;
}

interface LeadFormProps {
  values: LeadFormValues;
  onChange: (field: keyof LeadFormValues, value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  error?: string;
  className?: string;
}

export const LeadForm = ({
  values,
  onChange,
  onSubmit,
  loading,
  error,
  className,
}: LeadFormProps) => (
  <form
    onSubmit={onSubmit}
    className={cn(
      "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300",
      className
    )}
  >
    <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-sm">
      <p className="font-semibold text-accent">{content.contact.notice}</p>
    </div>

    <div className="space-y-2">
      <Label htmlFor="lead-name">Full Name *</Label>
      <Input
        id="lead-name"
        value={values.name}
        onChange={(event) => onChange("name", event.target.value)}
        placeholder="Enter your full name"
        autoComplete="name"
        required
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="lead-phone">Phone Number *</Label>
      <div className="flex rounded-md border border-input focus-within:ring-2 focus-within:ring-primary/30 transition">
        <span className="inline-flex min-w-16 items-center justify-center rounded-l-md bg-muted px-3 text-sm text-muted-foreground border-r border-input">
          +91
        </span>
        <Input
          id="lead-phone"
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          value={values.phone}
          onChange={(event) => onChange("phone", event.target.value)}
          placeholder="9876543210"
          className="rounded-l-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          autoComplete="tel-national"
          required
        />
      </div>
    </div>

    <div className="space-y-2">
      <Label htmlFor="lead-email">Email Address *</Label>
      <Input
        id="lead-email"
        type="email"
        value={values.email}
        onChange={(event) => onChange("email", event.target.value)}
        placeholder="your.email@example.com"
        autoComplete="email"
        required
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="lead-slab">Investment Slab *</Label>
      <Select
        value={values.investmentSlab}
        onValueChange={(value) => onChange("investmentSlab", value)}
        required
      >
        <SelectTrigger id="lead-slab">
          <SelectValue placeholder="Select investment amount" />
        </SelectTrigger>
        <SelectContent>
          {content.contact.slabs.map((slab) => (
            <SelectItem key={slab} value={slab}>
              {slab}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    {error && (
      <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 p-3 rounded-md">
        {error}
      </p>
    )}

    <Button type="submit" disabled={loading} className="w-full">
      {loading ? "Submitting..." : "Submit"}
    </Button>
  </form>
);
