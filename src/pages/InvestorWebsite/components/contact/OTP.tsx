import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";

interface OtpVerificationProps {
  phone: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onResend?: () => void;
  loading: boolean;
  error?: string;
  className?: string;
}

export const OtpVerification = ({
  phone,
  value,
  onChange,
  onSubmit,
  onResend,
  loading,
  error,
  className,
}: OtpVerificationProps) => (
  <div className={cn("space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-300", className)}>
    <div className="space-y-2">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Step 2 · Secure Verification</p>
      <h3 className="text-2xl font-semibold">Verify your OTP</h3>
      <p className="text-muted-foreground">
        We sent a 6-digit OTP to <span className="font-semibold text-foreground">{phone}</span>. Enter it below to continue.
      </p>
    </div>

    <div className="flex justify-center">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={onChange}
        disabled={loading}
        className="w-full justify-center"
      >
        <InputOTPGroup className="gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <InputOTPSlot key={`otp-slot-${index}`} index={index} className="h-14 w-12 text-lg" />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>

    {error && (
      <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 p-3 rounded-md">
        {error}
      </p>
    )}

    <Button
      type="button"
      className="w-full h-12 gradient-primary"
      onClick={onSubmit}
      disabled={loading || value.length !== 6}
    >
      {loading ? "Verifying..." : "Verify OTP"}
    </Button>

    {onResend && (
      <button
        type="button"
        className="text-sm text-accent hover:text-primary transition-colors"
        onClick={onResend}
        disabled={loading}
      >
        Didn’t receive the code? <span className="underline underline-offset-4">Resend OTP</span>
      </button>
    )}
  </div>
);

