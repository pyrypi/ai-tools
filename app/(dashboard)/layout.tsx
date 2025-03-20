import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getLimitCount } from "@/lib/api_limits";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const limitCount = await getLimitCount();

  return (
    <div className="bg-[#10223a] bg-grid-small-white/[0.2] relative h-full overflow-auto">
      <div
        className="hidden h-full md:flex md:w-72 md:flex-col 
            md:fixed md:instet-y-0 z-[80] bg-[#10223a]"
      >
        <Sidebar limitCount={limitCount} />
      </div>

      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};
export default DashboardLayout;
