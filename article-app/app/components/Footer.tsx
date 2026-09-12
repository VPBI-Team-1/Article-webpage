export default function Footer() {
  return (
    <footer className="py-3 flex flex-col items-center lg:items-start gap-1 lg:gap-2 mt-6 border-t lg:border-none border-secondary lg:px-5">
      <h2 className="text-xl md:text-3xl lg:text-2xl font-bold font-merriweather">
        Archive
      </h2>

      <ul className="flex lg:hidden gap-4 text-secondary text-sm md:text-xl">
        <li>About</li>
        <li>Contact</li>
        <li>Privacy</li>
        <li>Terms</li>
      </ul>

      <p className="text-secondary text-sm md:text-xl lg:text-lg">
        &copy; 2026 Archive Editorial. All rights reserved.
      </p>
    </footer>
  );
}
