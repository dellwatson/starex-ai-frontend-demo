import * as Dialog from "@radix-ui/react-dialog";
import "./style.css";

interface WrapperDialogProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
}

function WrapperDialog({
  isOpen,
  onOpenChange,
  trigger,
  children,
  title = "Dialog Title",
  description,
  footer,
}: WrapperDialogProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Title className="dialog-title">{title}</Dialog.Title>

          {description && (
            <Dialog.Description className="dialog-description">
              {description}
            </Dialog.Description>
          )}

          <div className="content">{children}</div>

          {footer && <div className="button-container">{footer}</div>}

          <Dialog.Close asChild>
            <button className="close-button" aria-label="Close">
              ×
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default WrapperDialog;
