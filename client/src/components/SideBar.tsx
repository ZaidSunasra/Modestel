import { NavLink } from "react-router";
import { SidebarMenuItem, Sidebar, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarContent, SidebarGroup } from "./ui/sidebar";

const navOptions = [
    {
        title: "Daily Report",
        url: "/dailyReport",
        logo: "📝",
        role: ["admin", "receptionist"]
    },
    {
        title: "Daily Expense",
        url: "/dailyExpense",
        logo: " 💸 ",
        role: ["admin", "receptionist"]
    },
    {
        title: "Monthly Income",
        url: "/monthlyIncome",
        logo: "📈",
        role: ["admin"]
    },
    {
        title: "Monthly Expense",
        url: "/monthlyExpense",
        logo: "📉 ",
        role: ["admin"]
    },
    {
        title: "Monthly Room",
        url: "/monthlyRoom",
        logo: "🛏️",
        role: ["admin"]
    },
    {
        title: "Monthly Advance",
        url: "/monthlyAdvance",
        logo: "📅",
        role: ["admin"]
    },
    {
        title: "Collection",
        url: "/collection",
        logo: "💰 ",
        role: ["admin"]
    },
    {
        title: "Final",
        url: "/final",
        logo: "✅",
        role: ["admin"]
    },
];

const SideBar = () => {

    const role = localStorage.getItem("Role") || "";
    const filteredOption = navOptions.filter((option) => option.role.includes(role));

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
                                    // variant={'outline'}
                                    className="text-lg font-semibold"
                                >
                                    <NavLink to={option.url}>
                                        <span>{option.logo}</span>
                                        <span> {option.title} </span>
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    </>
}

export default SideBar;