export default function Footer() {
  return (
    <footer className="footer footer-center text-base-content mb-2 mt-12">
      <aside>
        <p className="text-xs">
          Copyright © {new Date().getFullYear()} - All right reserved by ACME
          Industries Ltd
        </p>
      </aside>
    </footer>
  );
}
