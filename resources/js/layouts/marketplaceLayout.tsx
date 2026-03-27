import AppLayoutTemplate from "@/layouts/app/app-header-layout";
import { type BreadcrumbItem } from "@/types";
import { type ReactNode, useEffect } from "react";
import { Toaster } from "sonner";
import axios from "axios";
import usePageLoading from "@/hooks/usePageLoading";
import LoadingOverlay from "@/components/loadingoverlay";
import MarketplaceIntroLoader from "@/components/MarketplaceIntroLoader";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

interface AppLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

// ✅ Must define a functional component before calling hooks
export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
      const loading = usePageLoading();
        const { url } = usePage();
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const echo = (window as any).Echo;
    if (!echo) return;

    const channel = echo.join("presence.chat")
      .here((users: any[]) => {
        console.log("Users currently online:", users);
        window.dispatchEvent(new CustomEvent("onlineUsersUpdate", { detail: users }));
      })
      .joining((user: any) => {
        window.dispatchEvent(new CustomEvent("onlineUsersUpdate", { detail: [user] }));
      })
      .leaving((user: any) => {
        window.dispatchEvent(new CustomEvent("userLeft", { detail: user.id }));
      });

    return () => echo.leave("presence.chat");
  }, []);

    useEffect(() => {
    // Only show intro loader if coming from outside /marketplace
    const visitedMarketplace = sessionStorage.getItem("visitedMarketplace");
    if (!visitedMarketplace && url.startsWith("/marketplace")) {
      setShowIntro(true);
      sessionStorage.setItem("visitedMarketplace", "true");
    }
  }, [url]);

  


  return (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
         
      <div>
        {children}
        <Toaster richColors position="top-right" />
          {/* {loading && <LoadingOverlay />} */}
      </div>
    </AppLayoutTemplate>
  );
}
