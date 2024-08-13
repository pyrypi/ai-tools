import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "@/components/mobile-sidebar";
import { getLimitCount } from "@/lib/api_limits";

const Navbar = async () => {

    const limitCount = await getLimitCount();

    return (
        <div className="flex items-center p-4">
            <MobileSidebar limitCount={limitCount}/>
            <div className="flex w-full justify-end">
            <UserButton afterSignOutUrl="/" />
            </div>

        </div>

    );
}

export default Navbar;