import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Target, Heart, TrendingUp, Leaf } from 'lucide-react';
import content from '@/data/content.json';

export default function Vision() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-up">
            {content.vision.title}
          </h1>
          <p className="text-3xl font-bold text-primary mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {content.vision.tagline}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-10 shadow-elevated mb-12">
              <div className="text-center mb-8">
                <Target className="h-16 w-16 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              </div>
              <p className="text-xl leading-relaxed text-center text-muted-foreground">
                {content.vision.mission}
              </p>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              {content.vision.highlights.map((highlight, index) => (
                <Card
                  key={index}
                  className="p-6 hover-lift animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {index === 0 && <Leaf className="h-6 w-6 text-primary" />}
                      {index === 1 && <TrendingUp className="h-6 w-6 text-primary" />}
                      {index === 2 && <Target className="h-6 w-6 text-primary" />}
                      {index === 3 && <Heart className="h-6 w-6 text-primary" />}
                    </div>
                    <p className="text-lg">{highlight}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Our Environmental Impact</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="p-8">
                <Leaf className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">1 Cr+</div>
                <div className="text-muted-foreground">Green Kilometers Driven</div>
              </Card>

              <Card className="p-8">
                <Leaf className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">500+ Tons</div>
                <div className="text-muted-foreground">CO₂ Emissions Prevented</div>
              </Card>

              <Card className="p-8">
                <Leaf className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">3,820+</div>
                <div className="text-muted-foreground">Petrol Bikes Replaced</div>
              </Card>
            </div>

            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Every investment in Speed Force EV contributes to India's carbon neutrality goals 
              while generating sustainable returns. Together, we're building a cleaner, greener 
              future for logistics.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Transparency</h3>
                <p className="text-muted-foreground">
                  Clear communication, real-time tracking, and honest reporting
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Reliability</h3>
                <p className="text-muted-foreground">
                  Guaranteed payouts, proven track record, trusted partnerships
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
                <p className="text-muted-foreground">
                  Green technology, environmental responsibility, social impact
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Be Part of the Green Revolution</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
            Invest in EV fleets today and contribute to India's sustainable logistics future 
            while earning predictable monthly returns
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gradient-primary">
              <Link to="/contact">Start Investing</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/opportunity">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
