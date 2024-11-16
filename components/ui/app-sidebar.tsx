import { Home, DollarSign, CircleUserRound, Leaf } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ConnectKitButton } from "connectkit";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Funding",
    url: "/dashboard/funding",
    icon: DollarSign,
  },
  {
    title: "Beneficiaries",
    url: "/dashboard/beneficiary",
    icon: CircleUserRound,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <h3 className='flex place-content-center text-2xl font-semibold tracking-tight m-3'>
            Releaf &nbsp;
            <Leaf color='green' />
          </h3>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className='m-1'>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span className='flex place-content-center text-xl tracking-tight'>
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SidebarMenu className='m-3'>
              <ConnectKitButton />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
