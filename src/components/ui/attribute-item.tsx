// components/ui/attribute-item.tsx
import { cn } from "@/lib/utils";

interface AttributeItemProps {
  label: string;
  value: string | number;
  type?: "positive" | "negative" | "neutral";
  icon?: string;
  className?: string;
}

export const AttributeItem = ({
  label,
  value,
  type = "neutral",
  icon,
  className,
}: AttributeItemProps) => {
  return (
    <div className={cn("flex items-center justify-between py-1", className)}>
      <span className="text-sm text-muted-foreground flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {label}
      </span>
      <span
        className={cn(
          "text-sm font-medium",
          type === "positive" && "text-green-500",
          type === "negative" && "text-red-500"
        )}>
        {value}
      </span>
    </div>
  );
};

// Usage example:
/*
<AttributeItem 
  label="Attack Speed" 
  value="+15%" 
  type="positive" 
  icon="⚡"
/>

<AttributeItem 
  label="Health" 
  value="100/100" 
/>

<AttributeItem 
  label="Damage" 
  value="-10%" 
  type="negative"
/>
*/
