import { Twitter, Globe, ExternalLink } from "lucide-react";

export default function SocialLinks() {
  return (
    <div className="social-links flex flex-col md:flex-row gap-6">
      <a 
        href="https://x.com/OskarSchlemmer" 
        target="_blank" 
        rel="noopener noreferrer"
        className="social-link flex items-center gap-2 hover:text-primary transition-colors duration-300"
      >
        <Twitter className="w-5 h-5" />
        <span>@OskarSchlemmer</span>
      </a>
      
      <a 
        href="https://x.com/one33seven_" 
        target="_blank" 
        rel="noopener noreferrer"
        className="social-link flex items-center gap-2 hover:text-primary transition-colors duration-300"
      >
        <Twitter className="w-5 h-5" />
        <span>@one33seven</span>
      </a>
      
      <a 
        href="https://www.schlemmer.org/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="social-link flex items-center gap-2 hover:text-primary transition-colors duration-300"
      >
        <Globe className="w-5 h-5" />
        <span>schlemmer.org</span>
      </a>
    </div>
  );
} 