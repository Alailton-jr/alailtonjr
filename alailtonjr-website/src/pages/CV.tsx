import { Printer } from 'lucide-react';
import { PROFILE, EDUCATION, EXPERIENCE, RESEARCH_EXPERIENCE, PUBLICATIONS, PROCEEDINGS, THESES, AWARDS, SKILLS } from '../data/site';

export function CV() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Print Button - Hidden when printing */}
      <div className="print:hidden sticky top-20 z-10 flex justify-end mb-6">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-fg font-medium hover:opacity-90 transition-opacity shadow-lg"
        >
          <Printer className="w-5 h-5" />
          Print / Save PDF
        </button>
      </div>

      <div className="cv-content py-8 max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-8 pb-6 border-b-2 border-border">
          <h1 className="text-4xl font-bold mb-2">{PROFILE.name}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted-fg mb-2">
            {PROFILE.links?.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent print:text-fg"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="text-sm text-muted-fg">
            {PROFILE.phone && <span>Phone: {PROFILE.phone} | </span>}
            {PROFILE.email && <span>Email: {PROFILE.email}</span>}
          </div>
        </header>

        {/* Personal Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-accent uppercase border-b border-border pb-1">Personal Information</h2>
          <div className="space-y-2 text-sm">
            {PROFILE.bio && (
              <p className="text-justify">
                <span className="font-semibold">Bio:</span> {PROFILE.bio}
              </p>
            )}
            {PROFILE.location && (
              <p>
                <span className="font-semibold">Location:</span> {PROFILE.location}
              </p>
            )}
            {PROFILE.citizenship && (
              <p>
                <span className="font-semibold">Citizenship:</span> {PROFILE.citizenship}
              </p>
            )}
            {PROFILE.languages && (
              <p>
                <span className="font-semibold">Languages:</span> {PROFILE.languages}
              </p>
            )}
            {PROFILE.links?.find(l => l.label === 'ORCID') && (
              <p>
                <span className="font-semibold">ORCID:</span>{' '}
                <a
                  href={PROFILE.links.find(l => l.label === 'ORCID')?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline font-mono"
                >
                  {PROFILE.links.find(l => l.label === 'ORCID')?.href.replace('https://orcid.org/', '')}
                </a>
              </p>
            )}
          </div>
        </section>

        {/* Education */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-accent uppercase border-b border-border pb-1">Education</h2>
          <div className="space-y-4">
            {EDUCATION.map((edu, index) => (
              <div key={index} className="pb-3">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div className="flex-1">
                    <h3 className="font-bold">{edu.school}</h3>
                    <p className="text-sm">{edu.degree}</p>
                    {edu.notes && <p className="text-sm text-muted-fg mt-1">{edu.notes}</p>}
                  </div>
                  <span className="text-sm italic text-muted-fg">{edu.period}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Technical Knowledge */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-accent uppercase border-b border-border pb-1">Skills & Technical Knowledge</h2>
          <p className="text-sm text-justify mb-4">{SKILLS.description}</p>
          
          <ul className="list-disc list-inside space-y-1 text-sm mb-4 ml-2">
            {SKILLS.areas.map((area, index) => (
              <li key={index}>
                <span className="font-semibold">{area.title}:</span> {area.items.join(', ')}.
              </li>
            ))}
          </ul>

          <div className="space-y-2 text-sm">
            {SKILLS.technical.map((tech, index) => (
              <div key={index} className="grid grid-cols-[200px_1fr] gap-4">
                <span className="font-semibold">{tech.category}</span>
                <span>{tech.items}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Research Experience */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-accent uppercase border-b border-border pb-1">Research Experience</h2>
          <div className="space-y-6">
            {RESEARCH_EXPERIENCE.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold">{exp.role}</h3>
                    <p className="text-sm italic">{exp.org}</p>
                  </div>
                  <span className="text-sm italic text-muted-fg">{exp.period}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-fg ml-2">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Professional and Academic Experience */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-accent uppercase border-b border-border pb-1">Professional and Academic Experience</h2>
          <div className="space-y-6">
            {EXPERIENCE.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold">{exp.org}</h3>
                    <p className="text-sm italic">{exp.role}</p>
                    {exp.location && <p className="text-sm italic text-muted-fg">{exp.location}</p>}
                  </div>
                  <span className="text-sm italic text-muted-fg">{exp.period}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-fg ml-2">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Awards */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-accent uppercase border-b border-border pb-1">Awards</h2>
          <div className="space-y-2">
            {AWARDS.map((award, index) => (
              <div key={index}>
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div className="flex-1">
                    <span className="font-bold">{award.title}</span>
                    {award.description && <span className="text-sm ml-2">— {award.description}</span>}
                    {award.link && (
                      <a
                        href={award.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline text-sm ml-2 print:text-fg"
                      >
                        [link]
                      </a>
                    )}
                  </div>
                  <span className="text-sm italic text-muted-fg">{award.year}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Publications */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-accent uppercase border-b border-border pb-1">Publications</h2>
          
          {/* Academic Journals */}
          <div className="mb-6">
            <h3 className="font-bold mb-3">Academic Journals</h3>
            <ol className="list-decimal list-inside space-y-3 text-sm ml-2">
              {PUBLICATIONS.map((pub, index) => (
                <li key={index} className="pl-2">
                  <span className="font-semibold">{pub.authors}</span>
                  <br />
                  <span className="italic">{pub.title}</span>
                  <br />
                  <span className="font-semibold">{pub.venue}</span>
                  {pub.volume && <span>, {pub.volume}</span>}, {pub.year}.
                  {pub.link && (
                    <>
                      {' '}
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline print:text-fg"
                      >
                        {pub.link.replace('https://', '')}
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* Selected Proceedings */}
          <div className="mb-6">
            <h3 className="font-bold mb-3">Selected Proceedings</h3>
            <ol className="list-decimal list-inside space-y-3 text-sm ml-2">
              {PROCEEDINGS.map((pub, index) => (
                <li key={index} className="pl-2">
                  <span className="font-semibold">{pub.authors}</span>
                  <br />
                  <span className="italic">{pub.title}</span>
                  <br />
                  In: <span className="font-semibold">{pub.venue}</span>
                  {pub.volume && <span>, {pub.volume}</span>}, {pub.year}.
                  {pub.link && (
                    <>
                      {' '}
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline print:text-fg"
                      >
                        Available online
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* Theses */}
          <div>
            <h3 className="font-bold mb-3">Theses</h3>
            <ol className="list-decimal list-inside space-y-3 text-sm ml-2">
              {THESES.map((pub, index) => (
                <li key={index} className="pl-2">
                  <span className="font-semibold">{pub.authors}</span>
                  <br />
                  <span className="italic">{pub.title}</span>
                  <br />
                  {pub.venue}, {pub.year}.
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          
          .cv-content {
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          header, nav, footer, .print\\:hidden {
            display: none !important;
          }
          
          a {
            color: black !important;
            text-decoration: none !important;
          }
          
          section {
            page-break-inside: avoid;
          }
          
          h1, h2, h3 {
            page-break-after: avoid;
          }
        }
      `}</style>
    </>
  );
}
