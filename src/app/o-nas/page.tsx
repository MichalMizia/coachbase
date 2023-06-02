import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import workSvg from "@/../../public/assets/undraw_hiring_re_yk5n.svg";

interface pageProps {}

const page = ({}: pageProps) => {
  return (
    <main>
      <div className="main-gradient gradient" />
      <div className="container-sm w-full flex items-center justify-center gap-8 flex-col border-b border-indigo-100  min-h-[calc(100vh-66px)] py-4">
        <div className="flex flex-col gap-4 justify-center items-center">
          <h1 className="text-3xl text-center leading-12 max-w-[800px] font-bold md:text-5xl md:leading-20">
            Coach Base pomoże Ci osiągnąć Twój{" "}
            <span className="text-transparent bg-gradient-to-r bg-clip-text from-indigo-500 to-fuchsia-500">
              cel treningowy.
            </span>{" "}
            Nie szukaj, my zrobimy to za Ciebie.
          </h1>
          {/* <FakeBtn /> */}
          <p className="text-slate-700 text-lg text-center max-w-xl">
            Przeglądaj oferty najlepszych trenerów, dietetyków i fizjoterapeutów
            w Polsce, wszystko w jednym miejscu.
          </p>
        </div>
        <div className="flex items-center justify-evenly w-full flex-wrap gap-4">
          <Button size="large" className="text-lg">
            <Link href="/oferty">Zobacz Oferty</Link>
          </Button>
          <Image alt="workers" src={workSvg} height={100} />
          {/* <FakeBtn /> */}
        </div>
      </div>
      <div className="gradient secondary-gradient top-[100vh!important]" />
      <div className="py-20 container-md relative">
        {/* <HomepageTabs data={trainersData} /> */}
        {/* <button onClick={async () => handleClick()}>POST</button> */}
      </div>
      {/* <RulesHomepage /> */}
    </main>
  );
};

export default page;
