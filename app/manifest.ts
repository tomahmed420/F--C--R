import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Friend Criminal Record',
    short_name: 'Friend FCR',
    description: 'A fictional comedy investigation game for friends.',
    start_url: '/',
    display: 'standalone',
    background_color: '#07080c',
    theme_color: '#07080c',
    orientation: 'portrait',
  };
}