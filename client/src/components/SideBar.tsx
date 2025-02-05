import { NavLink, useLocation } from "react-router";
import { SidebarMenuItem, Sidebar, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarContent, SidebarGroup, SidebarFooter } from "./ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar } from "./ui/avatar";
import { ChevronsUpDown, LogOut, Moon, Sun } from "lucide-react";
import { useLogout } from "@/mutations/authMutation";
import { Button } from "./ui/button";
import { useTheme } from "@/context/theme";

const navOptions = [
    {
        title: "Daily Report",
        url: "/dailyReport",
        logo: "📝",
        role: ["admin", "receptionist", "user"]
    },
    {
        title: "Daily Expense",
        url: "/dailyExpense",
        logo: " 💸 ",
        role: ["admin", "receptionist", "user"]
    },
    {
        title: "Monthly Income",
        url: "/monthlyIncome",
        logo: "📈",
        role: ["admin", "user"]
    },
    {
        title: "Monthly Expense",
        url: "/monthlyExpense",
        logo: "📉 ",
        role: ["admin", "user"]
    },
    {
        title: "Monthly Room",
        url: "/monthlyRoom",
        logo: "🛏️",
        role: ["admin", "user"]
    },
    {
        title: "Monthly Advance",
        url: "/monthlyAdvance",
        logo: "📅",
        role: ["admin", "user"]
    },
    {
        title: "Collection",
        url: "/monthlyCollection",
        logo: "💰 ",
        role: ["admin", "user"]
    },
    {
        title: "Final",
        url: "/final",
        logo: "✅",
        role: ["admin", "user"]
    },
    {
        title: "Account Management",
        url: "/manageAccounts",
        logo: "🧑‍💼",
        role: ["admin", "user"]
    }
];

const SideBar = () => {

    const { theme, toggleTheme } = useTheme();
    const role = localStorage.getItem("Role") || "";
    const username = localStorage.getItem("Username") || "";
    const url = useLocation();
    const filteredOption = navOptions.filter((option) => option.role.includes(role));
    const logout = useLogout();

    return <>
        <Sidebar collapsible="icon" className="font-mono">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="font-bold text-2xl">
                            <div className="aspect-square size-6 rounded-lg flex items-center justify-center bg-sidebar">
                                <img
                                    src="/tauri.svg"
                                    alt="Logo"
                                    className="w-6 h-6 rounded"
                                />
                            </div>
                            <span>Modestel </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {filteredOption.map((option) => (
                            <SidebarMenuItem key={option.title}>
                                <SidebarMenuButton
                                    asChild
                                    size={'lg'}
                                    className="text-lg font-semibold"
                                >
                                    <NavLink
                                        to={option.url}
                                        className={`${url.pathname === option.url ? "bg-accent-foreground text-primary-foreground" : ""}`}
                                    >
                                        <span>{option.logo}</span>
                                        <span> {option.title} </span>
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar className="h-8 w-8 rounded-lg flex items-center justify-center border-2 border-sidebar-border">
                                        {username[0]?.toUpperCase()}
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            Hello, {username}
                                        </span>
                                        <span className="truncate text-xs">{role.toUpperCase()}</span>
                                    </div>
                                    <ChevronsUpDown />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg  border px-4 py-2 bg-sidebar"
                                align="end"
                                sideOffset={4}
                                side="right"
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg flex items-center justify-center border-2 border-sidebar-border">
                                            {username[0]?.toUpperCase()}
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">
                                                Hello, {username}
                                            </span>
                                            <span className="truncate text-xs">{role.toUpperCase()}</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Button onClick={toggleTheme} className="flex items-center gap-2 w-full">
                                            {theme === 'light' ? (
                                                <>
                                                    <Moon size={20} />
                                                    <span>Dark Mode</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Sun size={20} />
                                                    <span>Light Mode</span>
                                                </>
                                            )}
                                        </Button>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => {
                                            logout.mutate();
                                        }}>
                                        <LogOut />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    </>
}

export default SideBar;