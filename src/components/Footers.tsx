import Logo from "./custom/Logo";

interface FootersProps {}

const Footers = ({}: FootersProps) => {
  return (
    <footer className="bg-gray-900 py-8 text-gray-200">
      <Logo />
    </footer>
  );
};

export default Footers;
