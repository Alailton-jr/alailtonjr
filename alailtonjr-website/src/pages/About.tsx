export function About() {
  return (
    <div className="flex flex-col gap-8 py-12 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold">About Me</h1>

      <div className="flex flex-col gap-8 items-center">
        <div className="flex-shrink-0 w-full">
          <div className="w-full h-[300px] rounded-2xl overflow-hidden bg-muted flex items-center justify-center">
            <img
              src="/src/assets/about-me.jpg"
              alt="Alailton J. Alves Junior"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center bottom' }}
            />
          </div>
        </div>

        <div className="flex-1 space-y-4 text-muted-fg w-full">
          <p>
            I'm an Electrical Engineer specializing in power systems and protection,
            currently pursuing my M.S. in Electrical Engineering at the University of
            São Paulo (USP – São Carlos).
          </p>

          <p>
            My research focuses on fault location in wind farm collector systems with
            inverter-based resources (IBRs) and the development of virtual Intelligent
            Electronic Devices (IEDs) for line differential protection (87L).
          </p>

          <p>
            I'm passionate about bridging the gap between traditional power systems
            engineering and modern software development, with experience in building
            intelligent systems for power grid protection and B2B intelligence platforms.
          </p>

          <p>
            When I'm not working on research or coding, I enjoy participating in
            hackathons and contributing to open-source projects. I was honored to be
            a Global Finalist at NASA Space Apps Challenge 2024.
          </p>
        </div>
      </div>

      <div className="mt-8 p-6 rounded-2xl border border-border bg-card">
        <h2 className="text-2xl font-semibold mb-4">Skills & Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2 text-card-fg">Power Systems</h3>
            <ul className="text-sm text-muted-fg space-y-1">
              <li>• Protection & Relay Coordination</li>
              <li>• Fault Location & Analysis</li>
              <li>• IEC 61850 Standards</li>
              <li>• Wind Farm Systems</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-card-fg">Software Development</h3>
            <ul className="text-sm text-muted-fg space-y-1">
              <li>• React & TypeScript</li>
              <li>• Python & FastAPI</li>
              <li>• C++ & Embedded Systems</li>
              <li>• Machine Learning</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
