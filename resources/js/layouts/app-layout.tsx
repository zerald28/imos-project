import AppLayoutTemplate from "@/layouts/app/app-sidebar-layout";
import { type BreadcrumbItem } from "@/types";
import { type ReactNode, useEffect } from "react";
import { Toaster } from "sonner";
import axios from "axios";
import LoadingOverlay from "@/components/loadingoverlay";

interface AppLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

// ✅ Must define a functional component before calling hooks
export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
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

  

  return (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
      <div>
        {children}
        <Toaster richColors position="top-right" />
      </div>
    </AppLayoutTemplate>
  );
}
