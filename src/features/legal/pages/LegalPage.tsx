interface LegalSection { title: string; body: string; }
interface LegalPageContent { heading: string; introduction: string; sections: LegalSection[]; }

const LEGAL_PAGES: Record<'privacy' | 'terms', LegalPageContent> = {
  privacy: {
    heading: 'Privacy Policy',
    introduction: 'This page describes the information KernBuild may receive when you contact us or use this website. Please review and adapt it to your actual business and hosting practices before publication.',
    sections: [
      { title: 'Information you provide', body: 'If you send a project inquiry or feedback, the information you enter (such as your name, email address, and message) may be processed so we can respond. Do not include passwords, payment details, or other sensitive information in a message.' },
      { title: 'How information is used', body: 'Information submitted through a connected form endpoint is used to respond to your request and discuss the related project or feedback. Retention, access, and deletion practices depend on the backend and hosting providers configured by the site owner.' },
      { title: 'Sharing and security', body: 'Information may pass through the service providers used to host this website and operate its configured API. No website can guarantee absolute security; confirm the safeguards and providers used by your deployment before publishing this policy.' },
      { title: 'Your choices and contact', body: 'You may contact KernBuild to ask about information you have submitted or request its correction or deletion, subject to applicable law. Add a verified business contact address here before launch.' },
      { title: 'Updates', body: 'This notice may be revised as the website, backend, or applicable requirements change. The site owner should add an effective date and obtain appropriate legal review before relying on this policy.' },
    ],
  },
  terms: {
    heading: 'Terms & Conditions',
    introduction: 'These draft terms describe general use of this website. They are a starting point only and should be reviewed and completed for KernBuild’s actual services and jurisdiction before publication.',
    sections: [
      { title: 'Website information', body: 'Website content is provided for general information about software development services. Project examples describe the work at a high level and do not promise a particular outcome, delivery date, or technical result.' },
      { title: 'Project engagements', body: 'The scope, deliverables, fees, schedule, support, and ownership terms for any software project should be agreed in a separate written proposal or contract before work begins.' },
      { title: 'Acceptable use', body: 'Do not misuse this website, interfere with its operation, attempt unauthorized access, or submit unlawful, harmful, or confidential material through its forms.' },
      { title: 'Third-party services', body: 'This website may rely on third-party hosting, APIs, or services. Their availability and terms are controlled by their respective providers.' },
      { title: 'Changes and contact', body: 'These terms may be updated as the website evolves. Add a verified business contact address, governing law, and effective date after review by qualified counsel.' },
    ],
  },
};

export function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const page = LEGAL_PAGES[kind];
  return (
    <article className="section">
      <div className="container">
        <header className="page-heading"><p className="eyebrow">KernBuild</p><h1>{page.heading}</h1><p>{page.introduction}</p></header>
        <div className="legal-copy">
          {page.sections.map(section => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}
        </div>
      </div>
    </article>
  );
}
