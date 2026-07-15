import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'Sanjana Reddy Nenturi · Analytics & Data Engineer',
  description:
    'Analytics and data engineer building data systems from raw signals to dashboards — audio DSP platforms, neuroimaging QC pipelines, and analytics infrastructure. M.S. Intelligent Systems Engineering, Indiana University.',
  keywords: [
    'Analytics Engineer', 'Data Engineer', 'Python', 'SQL', 'Power BI', 'ETL',
    'DuckDB', 'Analytics Engineering', 'fMRIPrep', 'React', 'Indiana University', 'Sanjana Reddy Nenturi',
    'DistVRT', 'CARES Lab', 'Neuroimaging', 'Machine Learning',
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
