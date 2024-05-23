import { auth } from "@/auth";
import Hero from "@/components/hero/Hero";
import Menu from "@/components/menu/Menu"

export default async function Home({ searchParams }: { searchParams: { tags?: string } }) {
  const session = await auth();
  return (
    <main>
        {session ? (
          <Menu searchParams={searchParams}/>
        ) :(
          <Hero/>
        )}
    </main>
  );
}
