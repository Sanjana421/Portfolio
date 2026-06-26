import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'Sanjana Reddy Nenturi · Data Analytics Engineer',
  description:
    'Data Analytics Engineer and Research Scientist building data systems, audio DSP platforms, neuroimaging pipelines, and analytics infrastructure. M.S. Intelligent Systems Engineering, Indiana University. Three concurrent research and consulting roles.',
  keywords: [
    'Data Analytics Engineer', 'Python', 'SQL', 'Power BI', 'ETL',
    'fMRIPrep', 'SLURM', 'React', 'Indiana University', 'Sanjana Reddy Nenturi',
    'DistVRT', 'CARES Lab', 'Neuroimaging', 'LiDAR', 'GeoAI',
  ],
  authors: [{ name: 'Sanjana Reddy Nenturi' }],
  openGraph: {
    title: 'Sanjana Reddy Nenturi · Data Analytics Engineer',
    description:
      'Building data systems from raw signals to executive dashboards — across research, healthcare, and business domains.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* GoatCounter — free privacy-friendly visitor analytics */}
        {/* Dashboard: https://sanjanaportfolio.goatcounter.com */}
        <Script
          data-goatcounter="https://sanjanaportfolio.goatcounter.com/count"
          src="//gc.zgo.at/count.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
