import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/_core/hooks/useAuth';
import { Music, Sparkles, TrendingUp, Shield, Github } from 'lucide-react';

export function Login() {
  const [, setLocation] = useLocation();
  const { user, loading, signIn } = useAuth();

  useEffect(() => {
    if (user && !loading) {
      setLocation('/portal');
    }
  }, [user, loading, setLocation]);

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signIn('github');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Music className="w-12 h-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-center px-12 xl:px-20 bg-gradient-to-br from-surface via-background to-surface-elevated film-grain relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
        <div className="relative z-10 space-y-8">
          <div className="space-y-2">
            <h1 className="text-5xl xl:text-6xl font-bold">
              <span className="text-gradient">Elevated</span>
              <div className="text-sm tracking-widest font-sans font-normal mt-1">
                MEDIA HOUSE
              </div>
            </h1>
          </div>

          <div className="space-y-6 text-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <p className="text-text-secondary">
                7 AI-powered tools to supercharge your music career
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <p className="text-text-secondary">
                Keep 100% ownership of your masters and compositions
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <p className="text-text-secondary">
                Professional distribution to 150+ streaming platforms
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient">100+</div>
              <div className="text-xs text-text-muted">Artists</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient">150+</div>
              <div className="text-xs text-text-muted">Platforms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient">50M+</div>
              <div className="text-xs text-text-muted">Streams</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient">98%</div>
              <div className="text-xs text-text-muted">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-12 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:hidden mb-8">
            <h1 className="text-4xl font-bold mb-1">
              <span className="text-gradient">Elevated</span>
            </h1>
            <div className="text-xs tracking-widest">MEDIA HOUSE</div>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold">Welcome Back</h2>
            <p className="text-text-secondary">
              Sign in to access your artist dashboard
            </p>
          </div>

          <div className="space-y-4">
            <Button
              variant="secondary"
              className="w-full text-lg py-4"
              onClick={handleGoogleSignIn}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <Button
              variant="secondary"
              className="w-full text-lg py-4"
              onClick={handleGithubSignIn}
            >
              <Github className="w-5 h-5" />
              Continue with GitHub
            </Button>
          </div>

          <p className="text-center text-sm text-text-muted">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>

          <div className="text-center pt-4">
            <a href="/" className="text-primary hover:underline text-sm">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
