"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { Link, usePage } from "@inertiajs/react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

// Types
type NavSubItem = {
  title: string
  url: string
}

type NavItem = {
  title: string
  url: string
  icon?: LucideIcon
  items?: NavSubItem[]
}

export function NavMain({
  items,
  customItems,
}: {
  items: NavItem[]
  customItems?: React.ReactNode
}) {
  const page = usePage()
  const url = page.url

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const parentActive =
            url.startsWith(item.url) ||
            item.items?.some((sub) => url.startsWith(sub.url))

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={parentActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
              <CollapsibleTrigger asChild>
  <SidebarMenuButton
    asChild
    className={`${
      parentActive
        ? "bg-sidebar-accent text-sidebar-accent-foreground"
        : "hover:bg-sidebar-accent/50"
    }`}
    tooltip={{ children: item.title }}
  >
    <div className="flex items-center">
      {item.icon && <item.icon className="mr-2" />}
      <span>{item.title}</span>
      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
    </div>
  </SidebarMenuButton>
</CollapsibleTrigger>



                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const subActive = url.startsWith(subItem.url)
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={`${
                              subActive
                                ? "bg-sidebar-primary text-sidebar-accent-foreground"
                                : "hover:bg-sidebar-accent/50"
                            }`}
                          >
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}

        {/* Render custom items here */}
        {customItems}
      </SidebarMenu>
    </SidebarGroup>
  )
}

