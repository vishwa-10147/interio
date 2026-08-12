export default function Footer() {
  return (
    <footer className="relative border-t border-line py-16">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <div className="flex flex-col justify-between gap-12 sm:flex-row">
          <div>
            <p className="font-display text-3xl text-stone">
              Verrant<span className="text-brass">.</span>
            </p>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-stonemuted">
              Interior architecture &amp; spatial design, working from
              Hyderabad on residences, offices and hospitality worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
            <div>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-widest2 text-brass">Studio</p>
              <ul className="space-y-2 font-body text-sm text-stonemuted">
                <li><a href="#portfolio" className="hover:text-stone">Portfolio</a></li>
                <li><a href="#services" className="hover:text-stone">Services</a></li>
                <li><a href="#process" className="hover:text-stone">Process</a></li>
                <li><a href="#admin" className="hover:text-stone">Admin</a></li>
              </ul>
            </div>
            <div>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-widest2 text-brass">Contact</p>
              <ul className="space-y-2 font-body text-sm text-stonemuted">
                <li>hello@verrant.studio</li>
                <li>+91 40 4567 8899</li>
                <li>Hyderabad, India</li>
              </ul>
            </div>
            <div>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-widest2 text-brass">Follow</p>
              <ul className="space-y-2 font-body text-sm text-stonemuted">
                <li><a href="#" className="hover:text-stone">Instagram</a></li>
                <li><a href="#" className="hover:text-stone">Pinterest</a></li>
                <li><a href="#" className="hover:text-stone">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-widest2 text-stonemuted sm:flex-row">
          <span>© {new Date().getFullYear()} Verrant Studio. All rights reserved.</span>
          <span>Built as a cinematic front-end concept.</span>
        </div>
      </div>
    </footer>
  );
}
