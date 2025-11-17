import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { PUBLICATIONS, PROCEEDINGS, THESES } from '../data/site';

interface PublicationItemProps {
  publication: {
    title: string;
    authors?: string;
    venue: string;
    year: string;
    volume?: string;
    link?: string;
  };
  pdfLink?: string;
}

const PublicationItem = ({ publication, pdfLink }: PublicationItemProps) => {
  return (
    <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <h3 className="text-lg font-medium text-black dark:text-black mb-2">
        {publication.title}
      </h3>
      {publication.authors && (
        <p className="text-black dark:text-gray-900 mb-1">
          <span className="font-medium">{publication.authors}</span>
        </p>
      )}
      <p className="text-black dark:text-gray-800 mb-2">
        <em>{publication.venue}</em>
        {publication.volume && `, ${publication.volume}`}
        {`, ${publication.year}`}
      </p>
      <div className="flex gap-3">
        {publication.link && (
          <a
            href={publication.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
          >
            View Publication →
          </a>
        )}
        {pdfLink && (
          <a
            href={pdfLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
          >
            Download PDF →
          </a>
        )}
      </div>
    </div>
  );
};

const Publications = () => {
  // Map publications to their PDF links if available
  const pdfLinks: Record<string, string> = {
  };

  return (
    <>
      <Helmet>
        <title>Publications | Alailton Alves Júnior</title>
        <meta 
          name="description" 
          content="Research publications and academic contributions in power systems, fault location, and digital substations." 
        />
      </Helmet>
      
      <motion.div
        className="w-full overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-black dark:text-black mb-8">
            Publications
          </h1>

          {/* Journal Articles */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black dark:text-black mb-6 pb-2 border-b-2 border-blue-500">
              Journal Articles
            </h2>
            <div className="space-y-2 text-black">
              {PUBLICATIONS.map((publication, index) => (
                <PublicationItem
                  key={index}
                  publication={publication}
                />
              ))}
            </div>
          </section>

          {/* Conference Proceedings */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black dark:text-black mb-6 pb-2 border-b-2 border-blue-500 ">
              Conference Proceedings
            </h2>
            <div className="space-y-2">
              {PROCEEDINGS.map((proceeding, index) => (
                <PublicationItem
                  key={index}
                  publication={proceeding}
                  pdfLink={pdfLinks[proceeding.title]}
                />
              ))}
            </div>
          </section>

          {/* Theses & Dissertations */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black dark:text-black mb-6 pb-2 border-b-2 border-blue-500">
              Theses & Dissertations
            </h2>
            <div className="space-y-2">
              {THESES.map((thesis, index) => (
                <PublicationItem
                  key={index}
                  publication={thesis}
                />
              ))}
            </div>
          </section>

          {/* Research Note */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-black dark:text-gray-300">
              <span className="font-semibold">Note:</span> Publications marked as "submitted, under review" are currently in the peer review process. Links and full details will be updated upon acceptance and publication.
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Publications;
