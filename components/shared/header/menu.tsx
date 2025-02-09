import { ShoppingCartIcon,} from "lucide-react";
import Link from "next/link";

export default function Menu() {
  return (
    <div className="flex justify-end p-4">
      <nav className="flex gap-6 w-full">
        <Link href="/signin" className="flex items-center header-button ">
          Hello, Sign in
        </Link>

        <Link href="/cart" className="flex items-center header-button">
          <ShoppingCartIcon className="h-8 w-8" />
          <span className="font-bold">Cart</span>
        </Link>
      </nav>
    </div>
  );
}
