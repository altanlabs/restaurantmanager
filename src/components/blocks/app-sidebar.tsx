import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    title: string;
    icon: LucideIcon;
    href: string;
    children?: {
      title: string;
      href: string;
    }[];
  }[];
}

export default function AppSidebar({ className, items }: SidebarProps) {
  return (
    <div className={cn("pb-12 min-w-[250px] border-r h-screen", className)}>
      <ScrollArea className="h-full">
$1
      </ScrollArea>
    </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}