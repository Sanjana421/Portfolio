import dynamic from 'next/dynamic';
import Nav from '@/components/Nav/Nav';
import Work from '@/components/Work/Work';
import Stack from '@/components/Stack/Stack';
import Trajectory from '@/components/Trajectory/Trajectory';
import Contact from '@/components/Contact/Contact';

// Three.js + video must be client-only (no SSR)
const VideoIntro = dynamic(
  () => import('@/components/VideoIntro/VideoIntro'),
  { ssr: false }
);

export default function Home() {
  return (
    <main>
      <Nav />
      <VideoIntro videoSrc="/Portfolio/videos/intro.mp4" />
      <Work />
      <Stack />
      <Trajectory />
      <Contact />
    </main>
  );
}
