import Image from "next/image";
import Link from "next/link";
import { getAllCategories } from "@/lib/actions/product.actions";
import Menu from "./menu";
import Search from "./search";
// import data from "@/lib/data";
import Sidebar from "./sidebar";
import { getSetting } from "@/lib/actions/setting.actions";

import './header.css'

export default async function Header() {
  const categories = await getAllCategories();
  const { site } = await getSetting();
 
  return (
    <header className="bg-green-600  text-white">
      <div className="px-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center header-button font-extrabold text-2xl m-1 "
            >
              <Image
                src={site.logo}
                width={40}
                height={40}
                alt={`${site.name} logo`}
              />
              {site.name}
            </Link>
          </div>

          <div className="hidden md:block flex-1 max-w-xl">
            <Search />
          </div>
          <Menu />
        </div>
        <div className="md:hidden block py-2">
          <Search />
        </div>
      </div>
      <div className=" flex items-center justify-between px-3 mb-[1px] p-1 bg-green-900">
        <Sidebar categories={categories} />
        <div className="flex items-center flex-wrap gap-6 overflow-hidden  max-h-[42px]">
          <div className="hover:text-green-600 sidetext  flex gap-8">
            <span className="p-2 text-center bg-black">Greenleaf Express</span>
            
          </div>
        </div>
      </div>
    </header>
  );
}
