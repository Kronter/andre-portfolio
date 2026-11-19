import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function WritingChoices({ choices }) {
  return <div className="writing-series-chooser-grid">
    {choices.map((choice) => <Link key={choice.key} href={choice.href} className="writing-series-choice">
      <span className="writing-series-choice-content">
        <span className="writing-series-choice-count">{choice.label}</span>
        <span className="writing-series-choice-title">{choice.title}</span>
        <span className="writing-series-choice-description">{choice.description}</span>
      </span>
      <ArrowRight aria-hidden="true" />
    </Link>)}
  </div>;
}
