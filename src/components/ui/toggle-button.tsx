import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Button } from "@radix-ui/themes";
import * as React from "react";

interface ToggleButtonsSingleProps {
  type: "single";
  value: string;
  onValueChange: (value: string) => void;
}

interface ToggleButtonsMultipleProps {
  type: "multiple";
  value: string[];
  onValueChange: (value: string[]) => void;
}

interface ToggleButtonsCommonProps {
  tabIndex?: number;
  values: string[];
  children?: (value: string) => React.ReactNode;
}

type ToggleGroupRootElement = React.ElementRef<typeof ToggleGroup.Root>;

type ToggleButtonsProps = (
  | ToggleButtonsSingleProps
  | ToggleButtonsMultipleProps
) &
  ToggleButtonsCommonProps;

export const ToggleButtons = React.forwardRef<
  ToggleGroupRootElement,
  ToggleButtonsProps
>(({ children, tabIndex, values, ...props }, forwardedRef) => {
  const isActive = (value: string) =>
    props.type === "single"
      ? props.value === value
      : props.value.includes(value);

  return (
    <ToggleGroup.Root
      ref={forwardedRef}
      {...props}
      {...(tabIndex !== undefined && { tabIndex })}
      onValueChange={(value) => {
        if (value) {
          props.onValueChange(value);
        }
      }}
    >
      {values.map((value) => (
        <ToggleGroup.Item asChild key={value} value={value}>
          <Button
            highContrast
            variant={isActive(value) ? "solid" : "soft"}
            style={{ fontWeight: 400 }}
            {...(tabIndex !== undefined && { tabIndex })}
          >
            {children ? children(value) : value}
          </Button>
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
});
