import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
