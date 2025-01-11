import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import WrapperDialog from "./index"; // Adjust the import path based on your file structure

function DialogExample() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to programmatically open dialog
  const openDialog = () => setIsOpen(true);

  // Function to programmatically close dialog
  const closeDialog = () => setIsOpen(false);

  return (
    <div>
      {/* Example 1: Using custom trigger */}
      <WrapperDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        trigger={<button className="button">Custom Trigger</button>}
        title="Custom Dialog"
        description="This is a custom description"
        footer={
          <>
            <Dialog.Close asChild>
              <button className="button secondary">Cancel</button>
            </Dialog.Close>
            <button
              className="button primary"
              onClick={() => {
                // Your confirm logic here
                closeDialog();
              }}
            >
              Confirm
            </button>
          </>
        }
      >
        <p>Your custom content goes here</p>
      </WrapperDialog>

      {/* Example 2: Programmatically controlled without trigger */}
      <WrapperDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Programmatic Dialog"
      >
        <p>This dialog can be opened programmatically</p>
      </WrapperDialog>

      {/* Button to open dialog programmatically */}
      <button onClick={openDialog}>Open Dialog Programmatically</button>
    </div>
  );
}

export default DialogExample;
