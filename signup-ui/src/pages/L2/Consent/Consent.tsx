import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~components/ui/alert-dialog";
import { Icons, Logo } from "~components/ui/icons";

export const Consent = () => {
  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader className="m-2">
          <AlertDialogTitle className="flex flex-col items-center justify-center gap-y-4 text-2xl">
            <p>Attention</p>
            <div className="flex items-center gap-6">
              <Logo.FastLine className="h-12 w-12" />
              <Icons.syncAltBlack />
              <Logo.eSignet className="h-12 w-12" />
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className="break-all text-center text-muted-dark-gray">
            Description
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            id="okay-button"
            name="okay-button"
            className="w-full bg-primary"
          >
            okay
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
