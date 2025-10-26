import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/_core/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  Music,
  BarChart3,
  Send,
  User,
  Sparkles,
  LogOut,
  Home,
  ExternalLink,
  TrendingUp,
  DollarSign,
  Calendar,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { formatCurrency, formatNumber, formatDate } from '@/lib/utils';

type Tab = 'releases' | 'analytics' | 'submissions' | 'profile';

interface Release {
  id: string;
  track_title: string;
  artist_name: string;
  cover_art_url: string | null;
  release_date: string;
  streams: number;
  revenue: number;
  platforms: Record<string, string>;
  status: string;
}

interface Submission {
  id: string;
  artist_name: string;
  track_title: string;
  genre: string | null;
  release_date: string | null;
  package_type: string | null;
  status: string;
  created_at: string;
}

export function ClientPortal() {
  const [, setLocation] = useLocation();
  const { user, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('releases');
  const [releases, setReleases] = useState<Release[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      setLocation('/login');
    }
  }, [user, loading, setLocation]);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      const [releasesRes, submissionsRes] = await Promise.all([
        supabase.from('releases').select('*').order('created_at', { ascending: false }),
        supabase.from('artist_submissions').select('*').order('created_at', { ascending: false }),
      ]);

      if (releasesRes.data) setReleases(releasesRes.data);
      if (submissionsRes.data) setSubmissions(submissionsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setLocation('/');
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Music className="w-12 h-12 text-primary animate-pulse" />
      </div>
    );
  }

  const totalStreams = releases.reduce((sum, r) => sum + r.streams, 0);
  const totalRevenue = releases.reduce((sum, r) => sum + r.revenue, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Music className="w-8 h-8 text-primary" />
              <div>
                <div className="font-bold text-gradient text-lg">Elevated</div>
                <div className="text-xs tracking-widest">MEDIA HOUSE</div>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setActiveTab('releases')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'releases'
                    ? 'bg-primary text-background'
                    : 'text-text-secondary hover:bg-surface-elevated'
                }`}
              >
                <Music className="w-4 h-4 inline-block mr-2" />
                Releases
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'analytics'
                    ? 'bg-primary text-background'
                    : 'text-text-secondary hover:bg-surface-elevated'
                }`}
              >
                <BarChart3 className="w-4 h-4 inline-block mr-2" />
                Analytics
              </button>
              <button
                onClick={() => setActiveTab('submissions')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'submissions'
                    ? 'bg-primary text-background'
                    : 'text-text-secondary hover:bg-surface-elevated'
                }`}
              >
                <Send className="w-4 h-4 inline-block mr-2" />
                Submissions
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-primary text-background'
                    : 'text-text-secondary hover:bg-surface-elevated'
                }`}
              >
                <User className="w-4 h-4 inline-block mr-2" />
                Profile
              </button>
              <a
                href="/ai-tools"
                className="px-4 py-2 rounded-lg text-primary hover:bg-surface-elevated transition-colors font-semibold flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                AI Tools
              </a>
            </nav>

            <div className="flex items-center gap-2">
              <a href="/">
                <Button variant="ghost" size="sm">
                  <Home className="w-4 h-4" />
                </Button>
              </a>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <nav className="md:hidden flex gap-1 pb-3 overflow-x-auto">
            <button
              onClick={() => setActiveTab('releases')}
              className={`px-3 py-2 text-sm rounded-lg whitespace-nowrap ${
                activeTab === 'releases' ? 'bg-primary text-background' : 'text-text-secondary'
              }`}
            >
              Releases
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-2 text-sm rounded-lg whitespace-nowrap ${
                activeTab === 'analytics' ? 'bg-primary text-background' : 'text-text-secondary'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('submissions')}
              className={`px-3 py-2 text-sm rounded-lg whitespace-nowrap ${
                activeTab === 'submissions' ? 'bg-primary text-background' : 'text-text-secondary'
              }`}
            >
              Submissions
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3 py-2 text-sm rounded-lg whitespace-nowrap ${
                activeTab === 'profile' ? 'bg-primary text-background' : 'text-text-secondary'
              }`}
            >
              Profile
            </button>
            <a
              href="/ai-tools"
              className="px-3 py-2 text-sm rounded-lg whitespace-nowrap text-primary font-semibold"
            >
              AI Tools
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'releases' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Your Releases</h1>
              <Button>
                <Music className="w-4 h-4" />
                New Release
              </Button>
            </div>

            {loadingData ? (
              <div className="text-center py-12">
                <Music className="w-12 h-12 text-primary animate-pulse mx-auto" />
              </div>
            ) : releases.length === 0 ? (
              <Card className="text-center py-12">
                <Music className="w-16 h-16 text-text-muted mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No releases yet</h3>
                <p className="text-text-secondary mb-6">
                  Start your music journey by submitting your first release
                </p>
                <Button>Submit Your Music</Button>
              </Card>
            ) : (
              <div className="grid gap-6">
                {releases.map((release) => (
                  <Card key={release.id}>
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="w-full sm:w-32 h-32 bg-surface-elevated rounded-lg flex items-center justify-center">
                        {release.cover_art_url ? (
                          <img
                            src={release.cover_art_url}
                            alt={release.track_title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <Music className="w-12 h-12 text-text-muted" />
                        )}
                      </div>

                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-xl font-bold">{release.track_title}</h3>
                          <p className="text-text-secondary">{release.artist_name}</p>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-text-muted" />
                            <span>{formatDate(release.release_date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4 text-text-muted" />
                            <span className="font-mono">{formatNumber(release.streams)} streams</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-text-muted" />
                            <span className="font-mono">{formatCurrency(release.revenue)}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {Object.entries(release.platforms).map(([platform, url]) => (
                            <a
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs px-3 py-1 bg-surface-elevated rounded-full hover:bg-primary hover:text-background transition-colors flex items-center gap-1"
                            >
                              {platform}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              release.status === 'live'
                                ? 'bg-green-500/20 text-green-500'
                                : 'bg-yellow-500/20 text-yellow-500'
                            }`}
                          >
                            {release.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Analytics Overview</h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-mono">{formatNumber(totalStreams)}</div>
                    <div className="text-sm text-text-muted">Total Streams</div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-mono">{formatCurrency(totalRevenue)}</div>
                    <div className="text-sm text-text-muted">Total Revenue</div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Music className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-mono">{releases.length}</div>
                    <div className="text-sm text-text-muted">Active Releases</div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-mono">+24%</div>
                    <div className="text-sm text-text-muted">Growth Rate</div>
                  </div>
                </div>
              </Card>
            </div>

            {releases.length === 0 ? (
              <Card className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-text-muted mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No analytics data yet</h3>
                <p className="text-text-secondary">
                  Submit your first release to start tracking your performance
                </p>
              </Card>
            ) : (
              <Card>
                <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {releases.slice(0, 5).map((release) => (
                    <div key={release.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div>
                        <div className="font-semibold">{release.track_title}</div>
                        <div className="text-sm text-text-muted">{release.artist_name}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-semibold">{formatNumber(release.streams)}</div>
                        <div className="text-sm text-text-muted">streams</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'submissions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Submissions</h1>
              <Button>
                <Send className="w-4 h-4" />
                New Submission
              </Button>
            </div>

            {submissions.length === 0 ? (
              <Card className="text-center py-12">
                <Send className="w-16 h-16 text-text-muted mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No submissions yet</h3>
                <p className="text-text-secondary mb-6">
                  Submit your music for distribution to start reaching millions of listeners
                </p>
                <Button>Submit Your Music</Button>
              </Card>
            ) : (
              <div className="grid gap-6">
                {submissions.map((submission) => (
                  <Card key={submission.id}>
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold">{submission.track_title}</h3>
                          <p className="text-text-secondary">{submission.artist_name}</p>
                        </div>
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            submission.status === 'completed'
                              ? 'bg-green-500/20 text-green-500'
                              : submission.status === 'in_progress'
                              ? 'bg-blue-500/20 text-blue-500'
                              : 'bg-yellow-500/20 text-yellow-500'
                          }`}
                        >
                          {submission.status}
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4 text-sm">
                        {submission.genre && (
                          <div>
                            <div className="text-text-muted">Genre</div>
                            <div className="font-semibold">{submission.genre}</div>
                          </div>
                        )}
                        {submission.package_type && (
                          <div>
                            <div className="text-text-muted">Package</div>
                            <div className="font-semibold capitalize">{submission.package_type}</div>
                          </div>
                        )}
                        {submission.release_date && (
                          <div>
                            <div className="text-text-muted">Release Date</div>
                            <div className="font-semibold">{formatDate(submission.release_date)}</div>
                          </div>
                        )}
                      </div>

                      <div className="text-xs text-text-muted">
                        Submitted {formatDate(submission.created_at)}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Profile Settings</h1>

            <Card>
              <h3 className="text-xl font-bold mb-6">Account Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    defaultValue={user.user_metadata?.full_name || user.email?.split('@')[0]}
                    className="w-full px-4 py-2 bg-surface-elevated border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    disabled
                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-text-muted"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Artist Name</label>
                  <input
                    type="text"
                    placeholder="Your artist or band name"
                    className="w-full px-4 py-2 bg-surface-elevated border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <Button>Save Changes</Button>
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-bold mb-6">Notification Preferences</h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span>Email notifications for new releases</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span>Analytics and performance reports</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span>Marketing tips and best practices</span>
                </label>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
