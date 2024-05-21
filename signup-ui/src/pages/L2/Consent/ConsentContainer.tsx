import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~components/ui/alert-dialog";

export const ConsentContainer = () => {
  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader className="m-2">
          <AlertDialogTitle className="flex flex-col items-center justify-center gap-y-4">
            Attention
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
