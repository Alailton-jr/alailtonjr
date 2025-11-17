import { Link } from 'react-router-dom';
import { ArrowRight, Award, BookOpen, GraduationCap, Github, Linkedin, ExternalLink } from 'lucide-react';
import { PROFILE } from '../data/site';
import linesImage from '../assets/lines.jpg';
import mainImage from '../assets/main.jpg';

// Helper function to get icon for social links
const getSocialIcon = (label: string) => {
  const iconProps = { className: "w-4 h-4" };
  switch (label.toLowerCase()) {
    case 'github':
      return <Github {...iconProps} />;
    case 'linkedin':
      return <Linkedin {...iconProps} />;
    case 'google scholar':
    case 'orcid':
      return <GraduationCap {...iconProps} />;
    default:
      return <ExternalLink {...iconProps} />;
  }
};


export function Home() {
  return (
    <div className="flex flex-col gap-0 py-0">
      {/* Hero Section with background image */}
      <section className="w-full flex flex-col items-center text-center gap-0 py-0">
        {/* Hero image with name/headline overlay at bottom, full viewport width */}
        <div
          className="relative w-screen h-[420px] overflow-hidden"
          style={{ left: '0%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', maxWidth: '100vw' }}
        >
          <img
            src={linesImage}
            alt="Wind Farm Background"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center bottom', height: '100%' }}
          />
          {/* Full image overlay */}
          <div className="absolute inset-0 w-full h-full bg-black/20"></div>
          {/* Content overlay at bottom */}
          <div className="absolute bottom-0 left-0 w-full pb-8 px-6 flex flex-col items-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-md">
              {PROFILE.name}
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 font-medium drop-shadow-md">
              {PROFILE.headline}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {PROFILE.links?.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-accent hover:text-accent transition-colors text-sm font-medium text-white"
                >
                  {getSocialIcon(link.label)}
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="max-w-6xl mx-auto w-full mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          {/* Text Content */}
          <div className="space-y-4">
            <div className="text-muted-fg space-y-2 text-xl md:text-2xl lg:text-1xl text-justify">
              <p>
                I'm a passionate researcher and engineer focused on advancing power system protection
                through innovative solutions combining traditional electrical engineering with modern
                software development and machine learning.
              </p>
              <p>
                Currently pursuing my Master's degree at the University of São Paulo, I specialize in
                fault location algorithms for wind farm collector systems and the development of
                virtual Intelligent Electronic Devices (IEDs).
              </p>
              <p>
                My work bridges the gap between power systems engineering and cutting-edge technology,
                contributing to safer and more reliable electrical grids of the future.
              </p>
            </div>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-accent hover:underline font-semibold text-lg md:text-xl lg:text-2xl"
            >
              Learn more about me
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {/* Personal Image */}
          <div className="flex justify-center lg:justify-end items-start">
            <div className="w-full max-w-md h-[600px] rounded-2xl overflow-hidden shadow-lg border-4 border-blue-200">
              <img
                src={mainImage}
                alt="Alailton J. Alves Junior"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'top', height: '100%' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Menu Section */}
      <section className="max-w-5xl mx-auto w-full mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Navigate the Site</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Link
            to="/projects"
            className="group block p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow hover:border-accent"
          >
            <div className="flex flex-col items-center gap-2">
              <Award className="w-8 h-8 text-accent group-hover:text-blue-500" />
              <span className="text-lg font-semibold">Projects</span>
              <span className="text-sm text-muted-fg text-center">Explore my work and research contributions.</span>
            </div>
          </Link>
          <Link
            to="/cv"
            className="group block p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow hover:border-accent"
          >
            <div className="flex flex-col items-center gap-2">
              <GraduationCap className="w-8 h-8 text-accent group-hover:text-blue-500" />
              <span className="text-lg font-semibold">CV</span>
              <span className="text-sm text-muted-fg text-center">Academic and professional journey.</span>
            </div>
          </Link>
          <Link
            to="/about"
            className="group block p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow hover:border-accent"
          >
            <div className="flex flex-col items-center gap-2">
              <BookOpen className="w-8 h-8 text-accent group-hover:text-blue-500" />
              <span className="text-lg font-semibold">About</span>
              <span className="text-sm text-muted-fg text-center">Get to know more about me.</span>
            </div>
          </Link>
          <Link
            to="/contact"
            className="group block p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow hover:border-accent"
          >
            <div className="flex flex-col items-center gap-2">
              <Linkedin className="w-8 h-8 text-accent group-hover:text-blue-500" />
              <span className="text-lg font-semibold">Contact</span>
              <span className="text-sm text-muted-fg text-center">Reach out and connect with me.</span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
