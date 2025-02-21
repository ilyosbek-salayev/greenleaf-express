import { EllipsisVertical } from "lucide-react";
import CartButton from "./cart-button";
import ThemeSwitcher from "./theme-switcher";
import UserButton from "./user-button";
// import {
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";

export default function Menu({ forAdmin = false }: { forAdmin?: boolean }) {
  // const t = useTranslations()
  return (
    <div className="flex justify-end">
      <nav className="md:flex gap-3 hidden w-full">
        {/* <LanguageSwitcher /> */}
        <ThemeSwitcher />
        <UserButton />
        {forAdmin ? null : <CartButton />}
      </nav>
      <nav className="md:hidden">
        <Dialog>
          <DialogTrigger className="align-middle header-button">
            <EllipsisVertical className="h-6 w-6" />
          </DialogTrigger>
          <DialogContent className="bg-black text-white  flex flex-col items-start  ">
            <DialogHeader className="w-full">
              <div className="flex items-center justify-between ">
                <DialogTitle className="  ">{"Header.Site Menu"}</DialogTitle>
                <DialogDescription></DialogDescription>
              </div>
            </DialogHeader>
            {/* <LanguageSwitcher /> */}
            <ThemeSwitcher />
            <UserButton />
            <CartButton />
          </DialogContent>
        </Dialog>
      </nav>
    </div>
  );
}
