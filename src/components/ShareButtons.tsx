import { useState } from "react";
import { Share2, Facebook, Twitter, MessageCircle, Link as LinkIcon, Check } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ShareButtonsProps {
  title: string;
  url?: string;
  className?: string;
}

const ShareButtons = ({ title, url, className }: ShareButtonsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const shareUrl = url || window.location.href;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "הקישור הועתק!",
        description: "הקישור הועתק ללוח",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "לא הצלחנו להעתיק את הקישור",
        variant: "destructive",
      });
    }
  };

  const shareLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-blue-600 hover:text-white",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "hover:bg-sky-500 hover:text-white",
      bgColor: "bg-sky-50 dark:bg-sky-950/20",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: "hover:bg-green-600 hover:text-white",
      bgColor: "bg-green-50 dark:bg-green-950/20",
    },
  ];

  return (
    <div className={cn("relative", className)}>
      {/* Main Share Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="default"
        className="flex items-center gap-2 relative overflow-hidden group"
      >
        <Share2 className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
        <span>שתף</span>
      </Button>

      {/* Share Options Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Share Menu */}
          <div className="absolute top-full right-0 mt-2 z-50 animate-fade-in-scale">
            <div className="bg-card border border-border rounded-xl shadow-2xl p-3 min-w-[280px]">
              <p className="text-sm font-semibold text-foreground mb-3 px-2">שתף את הכתבה</p>
              
              {/* Social Media Buttons */}
              <div className="space-y-2 mb-2">
                {shareLinks.map((link, index) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "stagger-item flex items-center gap-3 p-3 rounded-lg transition-all duration-300 border border-border/50",
                      link.bgColor,
                      link.color,
                      `stagger-${index + 1}`
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <link.icon className="h-5 w-5" />
                    <span className="font-medium">{link.name}</span>
                  </a>
                ))}
              </div>

              {/* Copy Link Button */}
              <button
                onClick={handleCopyLink}
                className={cn(
                  "stagger-item stagger-4 w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 border border-border/50",
                  "bg-muted/50 hover:bg-primary hover:text-primary-foreground"
                )}
              >
                {copied ? (
                  <>
                    <Check className="h-5 w-5 animate-scale-in" />
                    <span className="font-medium">הקישור הועתק!</span>
                  </>
                ) : (
                  <>
                    <LinkIcon className="h-5 w-5" />
                    <span className="font-medium">העתק קישור</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareButtons;
