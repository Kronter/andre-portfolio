import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import FourDotMark from './FourDotMark';
import { SITE } from '@/data/portfolio';

const links = [
  ['Work', '/#work'],
  ['Experience', '/#experience'],
  ['Skills', '/#skills'],
  ['About', '/#about'],
  ['Design Writing', '/design-writing'],
  ['Contact', '/#contact'],
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <div className="nav-inner">
        <Link className="brand" href="/" aria-label="André Gottgtroy, portfolio home">
          <FourDotMark />
          <span>{SITE.name}</span>
        </Link>

        <div className="desktop-nav">
          {links.map(([label, href]) => (
            <Link key={href} href={href}>{label}</Link>
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
            <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>
          ))}
          <a href={SITE.resume} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
            Resume <span aria-hidden="true">↗</span>
          </a>
        </div>
      )}
    </nav>
  );
}
