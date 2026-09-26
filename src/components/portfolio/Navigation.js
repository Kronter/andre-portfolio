import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import FourDotMark from './FourDotMark';
import { SITE } from '@/data/portfolio';

const links = [
  ['Work', '#work'],
  ['Experience', '#experience'],
  ['Skills', '#skills'],
  ['About', '#about'],
  ['Design Writing', '#design-writing'],
  ['Contact', '#contact'],
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <div className="nav-inner">
        <a className="brand" href="#top" aria-label="André Gottgtroy, back to top">
          <FourDotMark />
          <span>{SITE.name}</span>
        </a>

        <div className="desktop-nav">
          {links.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
          <a className="nav-resume" href={SITE.resume} target="_blank" rel="noreferrer">
            Resume <span aria-hidden="true">↗</span>
          </a>
        </div>

        <button
          type="button"
          className="menu-button"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <div id="mobile-navigation" className="mobile-nav">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a href={SITE.resume} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
            Resume <span aria-hidden="true">↗</span>
          </a>
        </div>
      )}
    </nav>
  );
}
