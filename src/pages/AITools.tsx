import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  Sparkles,
  Image,
  PenTool,
  Calendar,
  Tag,
  BarChart3,
  Smartphone,
  Music as MusicIcon,
  Download,
  Copy,
  RefreshCw,
  Home,
} from 'lucide-react';

type ToolType = 'cover-art' | 'copy-writer' | 'strategy' | 'metadata' | 'analytics' | 'social' | 'recommendations';

export function AITools() {
  const [activeTool, setActiveTool] = useState<ToolType | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string>('');

  const [coverArtPrompt, setCoverArtPrompt] = useState('');
  const [coverArtStyle, setCoverArtStyle] = useState<string>('photorealistic');

  const [copyType, setCopyType] = useState<string>('playlist-pitch');
  const [trackName, setTrackName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [genre, setGenre] = useState('');

  const tools = [
    {
      id: 'cover-art' as ToolType,
      name: 'Cover Art Generator',
      icon: Image,
      gradient: 'from-purple-500 to-pink-500',
      description: 'Generate professional album artwork from text descriptions',
    },
    {
      id: 'copy-writer' as ToolType,
      name: 'Marketing Copy Writer',
      icon: PenTool,
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Create compelling marketing copy for your releases',
    },
    {
      id: 'strategy' as ToolType,
      name: 'Release Strategy Assistant',
      icon: Calendar,
      gradient: 'from-green-500 to-emerald-500',
      description: 'Get personalized release timing and strategy recommendations',
    },
    {
      id: 'metadata' as ToolType,
      name: 'Metadata Optimizer',
      icon: Tag,
      gradient: 'from-orange-500 to-amber-500',
      description: 'Optimize your track metadata for maximum discoverability',
    },
    {
      id: 'analytics' as ToolType,
      name: 'Analytics Insights',
      icon: BarChart3,
      gradient: 'from-teal-500 to-cyan-500',
      description: 'Get natural language summaries of your streaming data',
    },
    {
      id: 'social' as ToolType,
      name: 'Social Media Content Generator',
      icon: Smartphone,
      gradient: 'from-pink-500 to-rose-500',
      description: 'Create engaging social media content and calendars',
    },
    {
      id: 'recommendations' as ToolType,
      name: 'Music Recommendation Engine',
      icon: MusicIcon,
      gradient: 'from-indigo-500 to-purple-500',
      description: 'Discover collaboration opportunities and target playlists',
    },
  ];

  const generateCoverArt = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGeneratedContent('https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600');
    setLoading(false);
  };

  const generateCopy = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const copies: Record<string, string> = {
      'playlist-pitch': `🎵 Playlist Pitch for "${trackName}"\n\nHey there!\n\nI'm ${artistName}, and I'd love to submit my latest ${genre} track "${trackName}" for your consideration.\n\nThis track blends modern production with authentic emotion, creating a sound that resonates with fans of the genre while bringing something fresh to the table. The production quality is radio-ready, and early feedback from listeners has been overwhelmingly positive.\n\nI believe "${trackName}" would be a great fit for your playlist because it captures that perfect balance of energy and emotion your listeners love.\n\nThank you for considering my music!\n\nBest regards,\n${artistName}`,
      'social-caption': `Just dropped my new ${genre} track "${trackName}" 🔥\n\nThis one's special. Poured my heart into every beat, every lyric. Link in bio to stream now on all platforms! 🎧\n\n#NewMusic #${genre} #IndependentArtist #MusicRelease #NowPlaying`,
      'press-release': `FOR IMMEDIATE RELEASE\n\n${artistName} Releases New ${genre} Single "${trackName}"\n\nEmerging ${genre} artist ${artistName} has released their latest single "${trackName}", now available on all major streaming platforms.\n\nThe track showcases ${artistName}'s signature sound while pushing creative boundaries. With its compelling production and authentic storytelling, "${trackName}" is poised to make waves in the ${genre} scene.\n\n"${trackName}" is available now on Spotify, Apple Music, and all major streaming platforms.`,
      'artist-bio': `${artistName} is an innovative ${genre} artist known for crafting emotionally resonant music that connects with listeners on a deep level.\n\nWith a unique approach to songwriting and production, ${artistName} has been steadily building a dedicated fanbase through authentic storytelling and memorable melodies.\n\nTheir latest release, "${trackName}", continues to showcase their evolution as an artist while staying true to their ${genre} roots.`,
    };

    setGeneratedContent(copies[copyType] || 'Generated content will appear here...');
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary" />
              <div>
                <h1 className="font-bold text-lg">AI Powerhouse Toolkit</h1>
                <p className="text-xs text-text-muted">7 professional tools for artists</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/portal">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <Home className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!activeTool ? (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold">
                AI Tools to <span className="text-gradient">Accelerate Your Career</span>
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Professional-grade AI tools that would cost $2,000+ individually, included free with every release package
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <Card
                  key={tool.id}
                  className="cursor-pointer group relative overflow-hidden"
                  onClick={() => setActiveTool(tool.id)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  <tool.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                  <p className="text-text-secondary text-sm mb-4">{tool.description}</p>
                  <Button variant="secondary" size="sm" className="w-full">
                    Launch Tool
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => { setActiveTool(null); setGeneratedContent(''); }}>
              ← Back to All Tools
            </Button>

            {activeTool === 'cover-art' && (
              <Card>
                <div className="flex items-center gap-3 mb-6">
                  <Image className="w-8 h-8 text-primary" />
                  <h2 className="text-2xl font-bold">Cover Art Generator</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Describe your vision</label>
                    <textarea
                      value={coverArtPrompt}
                      onChange={(e) => setCoverArtPrompt(e.target.value)}
                      placeholder="A dreamy landscape with vibrant sunset colors and abstract shapes..."
                      className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Style</label>
                    <select
                      value={coverArtStyle}
                      onChange={(e) => setCoverArtStyle(e.target.value)}
                      className="w-full px-4 py-2 bg-surface-elevated border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="photorealistic">Photorealistic</option>
                      <option value="illustrated">Illustrated</option>
                      <option value="abstract">Abstract</option>
                      <option value="minimalist">Minimalist</option>
                    </select>
                  </div>

                  <Button onClick={generateCoverArt} disabled={loading || !coverArtPrompt}>
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate Cover Art
                      </>
                    )}
                  </Button>

                  {generatedContent && (
                    <div className="space-y-4">
                      <div className="border border-border rounded-lg overflow-hidden">
                        <img src={generatedContent} alt="Generated cover art" className="w-full" />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="secondary" className="flex-1">
                          <Download className="w-4 h-4" />
                          Download (3000x3000)
                        </Button>
                        <Button variant="secondary" onClick={generateCoverArt}>
                          <RefreshCw className="w-4 h-4" />
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {activeTool === 'copy-writer' && (
              <Card>
                <div className="flex items-center gap-3 mb-6">
                  <PenTool className="w-8 h-8 text-primary" />
                  <h2 className="text-2xl font-bold">Marketing Copy Writer</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Content Type</label>
                    <select
                      value={copyType}
                      onChange={(e) => setCopyType(e.target.value)}
                      className="w-full px-4 py-2 bg-surface-elevated border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="playlist-pitch">Playlist Pitch</option>
                      <option value="social-caption">Social Caption</option>
                      <option value="press-release">Press Release</option>
                      <option value="artist-bio">Artist Bio</option>
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Track Name</label>
                      <input
                        type="text"
                        value={trackName}
                        onChange={(e) => setTrackName(e.target.value)}
                        placeholder="Midnight Dreams"
                        className="w-full px-4 py-2 bg-surface-elevated border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Artist Name</label>
                      <input
                        type="text"
                        value={artistName}
                        onChange={(e) => setArtistName(e.target.value)}
                        placeholder="Luna Sky"
                        className="w-full px-4 py-2 bg-surface-elevated border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Genre/Mood</label>
                    <input
                      type="text"
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      placeholder="Electronic, Ambient, Chill"
                      className="w-full px-4 py-2 bg-surface-elevated border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <Button onClick={generateCopy} disabled={loading || !trackName || !artistName}>
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate Copy
                      </>
                    )}
                  </Button>

                  {generatedContent && (
                    <div className="space-y-4">
                      <div className="border border-border rounded-lg p-4 bg-surface-elevated">
                        <pre className="whitespace-pre-wrap font-sans text-sm">{generatedContent}</pre>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="secondary" onClick={copyToClipboard}>
                          <Copy className="w-4 h-4" />
                          Copy to Clipboard
                        </Button>
                        <Button variant="secondary" onClick={generateCopy}>
                          <RefreshCw className="w-4 h-4" />
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {(activeTool === 'strategy' || activeTool === 'metadata' || activeTool === 'analytics' ||
              activeTool === 'social' || activeTool === 'recommendations') && (
              <Card className="text-center py-12">
                <div className="max-w-md mx-auto space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                    {activeTool === 'strategy' && <Calendar className="w-8 h-8 text-primary" />}
                    {activeTool === 'metadata' && <Tag className="w-8 h-8 text-primary" />}
                    {activeTool === 'analytics' && <BarChart3 className="w-8 h-8 text-primary" />}
                    {activeTool === 'social' && <Smartphone className="w-8 h-8 text-primary" />}
                    {activeTool === 'recommendations' && <MusicIcon className="w-8 h-8 text-primary" />}
                  </div>
                  <h3 className="text-2xl font-bold">Coming Soon</h3>
                  <p className="text-text-secondary">
                    This tool is currently in development. We're working hard to bring you the best AI-powered music tools.
                  </p>
                  <Button onClick={() => setActiveTool(null)}>
                    Explore Other Tools
                  </Button>
                </div>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
