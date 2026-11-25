import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, CreditCard, Smartphone, CheckCircle2 } from 'lucide-react';
import content from '@/pages/InvestorWebsite//data/content.json';

export default function How() {
  const icons = [FileText, FileText, CreditCard, Smartphone];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-up">
            {content.how.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Begin your investment journey in 4 simple steps
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {content.how.steps.map((step, index) => {
                const Icon = icons[index];
                return (
                  <div
                    key={index}
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Card className="p-8 hover-lift">
                      <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-shrink-0">
                          <div className="h-20 w-20 rounded-2xl gradient-primary flex items-center justify-center">
                            <Icon className="h-10 w-10 text-primary-foreground" />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-5xl font-bold text-muted">{step.number}</span>
                            <h3 className="text-2xl font-bold">{step.title}</h3>
                          </div>
                          <p className="text-muted-foreground text-lg leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </Card>

                    {index < content.how.steps.length - 1 && (
                      <div className="flex justify-center my-6">
                        <div className="h-12 w-0.5 bg-border" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* What Happens After */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What Happens Next?</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-6">
                <CheckCircle2 className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Vehicle Deployment</h3>
                <p className="text-muted-foreground">
                  Your EV units are deployed to our fleet within 7-14 days. You receive deployment 
                  confirmation with vehicle details and tracking numbers.
                </p>
              </Card>

              <Card className="p-6">
                <CheckCircle2 className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Monthly Payouts Begin</h3>
                <p className="text-muted-foreground">
                  First payout credited to your account by the 5th of the following month. 
                  Track all transactions via your investor dashboard.
                </p>
              </Card>

              <Card className="p-6">
                <CheckCircle2 className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Real-Time Monitoring</h3>
                <p className="text-muted-foreground">
                  Access your dashboard to see vehicle status, daily kilometers, maintenance 
                  schedules, and earnings timeline.
                </p>
              </Card>

              <Card className="p-6">
                <CheckCircle2 className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Dedicated Support</h3>
                <p className="text-muted-foreground">
                  Our investor relations team is available to answer queries and provide 
                  monthly performance reports.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Investment Timeline</h2>
            
            <Card className="p-8 shadow-elevated">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="font-bold text-primary w-32">Day 1-2</div>
                  <div>Application submitted & verified</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-bold text-primary w-32">Day 3-5</div>
                  <div>E-agreements signed & payment processed</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-bold text-primary w-32">Day 7-14</div>
                  <div>Vehicles deployed & app access granted</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-bold text-primary w-32">Month 1</div>
                  <div>First payout credited (pro-rata if mid-month)</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-bold text-primary w-32">Month 2-47</div>
                  <div>Fixed monthly payouts on 5th of each month</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-bold text-primary w-32">Month 48</div>
                  <div>Final payout + salvage value settlement</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join 30+ investors already earning monthly income from EV fleets
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gradient-primary">
              <Link to="/contact">Start Your Application</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/investment">Calculate Returns First</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
