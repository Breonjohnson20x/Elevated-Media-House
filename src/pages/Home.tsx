import { Link } from 'wouter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  Music,
  TrendingUp,
  Users,
  Star,
  Sparkles,
  Globe,
  Shield,
  Target,
  DollarSign,
  HeadphonesIcon,
  Zap,
  ChevronDown
} from 'lucide-react';

export function Home() {
  const stats = [
    { label: 'Artists', value: '100+', icon: Users },
    { label: 'Platforms', value: '150+', icon: Globe },
    { label: 'Streams', value: '50M+', icon: TrendingUp },
    { label: 'Satisfaction', value: '98%', icon: Star },
  ];

  const packages = [
    {
      name: 'Basic',
      priceRange: '$50-$75',
      popular: false,
      features: [
        'Global Distribution to 150+ platforms',
        'Professional Metadata Optimization',
        'SplitShare™ Royalty Setup',
        'ISRC & UPC Code Generation',
        'Store Delivery Confirmation',
        'Email Support (24-48 hours)',
      ],
    },
    {
      name: 'Pro',
      priceRange: '$150-$200',
      popular: true,
      features: [
        'Everything in Basic, PLUS:',
        'Professional Cover Art Design',
        'Strategic Playlist Pitching',
        'Pre-Save Campaign Setup',
        '30-Day Marketing Timeline',
        'Release Strategy Consultation',
        'Priority Email & Chat Support (12 hours)',
      ],
    },
    {
      name: 'Deluxe',
      priceRange: '$300-$500',
      popular: false,
      features: [
        'Everything in Pro, PLUS:',
        'Comprehensive Marketing Rollout',
        'Monthly Analytics Reports (3 Months)',
        'Follow-Up Strategy Consultation',
        'YouTube Content ID Setup',
        'Neighboring Rights Registration',
        'VIP Support (Phone, Email, Chat)',
      ],
    },
  ];

  const testimonials = [
    {
      name: 'Marcus Rivera',
      title: 'Hip-Hop Artist',
      quote: 'Elevated Media House helped me reach 250K+ streams and land on 3 editorial playlists. The team really cares about your success.',
      stats: '250K+ streams',
    },
    {
      name: 'Luna Sky',
      title: 'Electronic Producer',
      quote: 'The AI tools alone saved me thousands in marketing costs. Got 12 playlist placements in my first month!',
      stats: '180K+ streams',
    },
    {
      name: 'The Midnight Collective',
      title: 'Indie Band',
      quote: 'Best decision we made for our music career. Made $2,400 in royalties and our fanbase tripled.',
      stats: '320K+ streams',
    },
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'AI Powerhouse Toolkit',
      description: '7 AI tools included: Cover Art Generator, Marketing Copy Writer, Release Strategy Assistant, Metadata Optimizer, Analytics Insights, Social Content Generator, Music Recommendations. Save $2,000+ per release.',
    },
    {
      icon: Shield,
      title: 'Keep 100% Ownership',
      description: 'Full ownership of masters and compositions. We distribute your music, you keep all the rights.',
    },
    {
      icon: Target,
      title: 'Expert Playlist Pitching',
      description: 'Access to 500+ verified curators across all genres. Strategic pitching to maximize placements.',
    },
    {
      icon: DollarSign,
      title: 'Transparent Royalties',
      description: 'SplitShare™ automated split management. Track every penny with detailed analytics.',
    },
    {
      icon: TrendingUp,
      title: 'Professional Marketing',
      description: '30-day timelines, pre-save campaigns, and release strategies designed to grow your audience.',
    },
    {
      icon: HeadphonesIcon,
      title: 'Priority Support',
      description: 'Real humans who care about your success. Not bots, not automated responses.',
    },
    {
      icon: Zap,
      title: 'One-Time Pricing',
      description: 'No recurring subscriptions. Pay once per release and keep earning forever.',
    },
  ];

  const faqs = [
    {
      question: 'Do I keep ownership of my music?',
      answer: 'Yes! You retain 100% ownership of your masters and compositions. We simply distribute your music to streaming platforms.',
    },
    {
      question: 'How long does distribution take?',
      answer: 'Distribution typically takes 7-14 days. We recommend submitting your release at least 3-4 weeks before your target release date for optimal playlist consideration.',
    },
    {
      question: 'What platforms do you distribute to?',
      answer: 'We distribute to 150+ platforms including Spotify, Apple Music, Amazon Music, Tidal, YouTube Music, Deezer, and many more.',
    },
    {
      question: 'Can you guarantee playlist placements?',
      answer: 'While we cannot guarantee placements, our strategic pitching to 500+ verified curators significantly increases your chances. Our Pro and Deluxe packages have the highest success rates.',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-20 sm:py-32 lg:py-48 px-4 sm:px-6 lg:px-8 film-grain overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-background to-surface-elevated opacity-50" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Turn Your Music Into a<br />
              <span className="text-gradient">Sustainable Career</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto">
              Professional distribution, AI-powered tools, and boutique label services—without giving up your rights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/login">
                <Button size="lg">
                  Get Started <Music className="w-5 h-5" />
                </Button>
              </Link>
              <a href="#pricing">
                <Button variant="secondary" size="lg">
                  View Packages <ChevronDown className="w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-text-muted text-sm sm:text-base">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Choose Your <span className="text-gradient">Package</span>
            </h2>
            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">
              One-time pricing. No recurring fees. All packages include lifetime distribution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Card
                key={pkg.name}
                className={pkg.popular ? 'border-primary border-2 relative' : ''}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-background px-4 py-1 rounded-full text-sm font-semibold">
                    POPULAR
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-gradient mb-4">
                    {pkg.priceRange}
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/login">
                  <Button
                    variant={pkg.popular ? 'primary' : 'secondary'}
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Success <span className="text-gradient">Stories</span>
            </h2>
            <p className="text-lg sm:text-xl text-text-secondary">
              Real artists, real results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name}>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-text-secondary mb-6 italic">"{testimonial.quote}"</p>
                <div className="border-t border-border pt-4">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-text-muted">{testimonial.title}</div>
                  <div className="text-sm font-mono text-primary mt-2">
                    {testimonial.stats}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-gradient">Elevated Media House</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title}>
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <Card key={faq.question}>
                <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                <p className="text-text-secondary">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 film-grain relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-background to-surface-elevated opacity-50" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to Elevate Your <span className="text-gradient">Music Career?</span>
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary mb-8">
            Join 100+ independent artists building sustainable careers
          </p>
          <Link href="/login">
            <Button size="lg">
              Get Started Today <Music className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-surface-elevated py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-text-muted text-sm">
                <li>Distribution</li>
                <li>Marketing</li>
                <li>AI Tools</li>
                <li>Analytics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-text-muted text-sm">
                <li>About</li>
                <li>Contact</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-text-muted text-sm">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-text-muted text-sm">
            © 2025 Elevated Media House. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
