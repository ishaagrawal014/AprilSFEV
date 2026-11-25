import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, Shield, TrendingUp, Users, Zap } from 'lucide-react';
import content from '@/pages/InvestorWebsite/data/content.json';

export default function Why() {
  const comparisonData = [
    { asset: 'Speed Force EV', return: '21%', risk: 'Low', liquidity: '48 months', maintenance: 'Zero' },
    { asset: 'Mutual Funds', return: '10-12%', risk: 'Medium', liquidity: 'Anytime', maintenance: 'None' },
    { asset: 'Real Estate', return: '8-10%', risk: 'Medium', liquidity: 'Low', maintenance: 'High' },
    { asset: 'Gold', return: '6-8%', risk: 'Low', liquidity: 'High', maintenance: 'None' },
    { asset: 'Fixed Deposits', return: '5-7%', risk: 'Very Low', liquidity: 'Medium', maintenance: 'None' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-up">
            {content.why.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div>
              <div className="text-5xl font-bold text-primary mb-2">{content.why.returns}</div>
              <div className="text-muted-foreground">Absolute Returns</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-accent mb-2">{content.why.tenure}</div>
              <div className="text-muted-foreground">Fixed Payout Period</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOCO Model */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-10 shadow-elevated mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">{content.why.model}</h2>
                <p className="text-xl text-muted-foreground">
                  You Own the Assets, We Handle Everything Else
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Your Role (Franchise-Owned)
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Invest in EV assets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Receive guaranteed monthly rent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Track investments via app</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Zero operational involvement</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-accent" />
                    Our Role (Company-Operated)
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Vehicle maintenance & servicing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Rider management & training</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Fleet optimization & logistics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Insurance & compliance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Features */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {content.why.features.map((feature, index) => (
                <Card key={index} className="p-6 hover-lift">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{feature}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Investment Comparison</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-card rounded-lg overflow-hidden shadow-card">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-4 font-semibold">Investment Type</th>
                    <th className="text-left p-4 font-semibold">Annual Return</th>
                    <th className="text-left p-4 font-semibold">Risk Level</th>
                    <th className="text-left p-4 font-semibold">Liquidity</th>
                    <th className="text-left p-4 font-semibold">Maintenance</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-t ${index === 0 ? 'bg-primary/5 font-semibold' : ''}`}
                    >
                      <td className="p-4">{item.asset}</td>
                      <td className="p-4">
                        <span className={index === 0 ? 'text-primary text-lg' : ''}>
                          {item.return}
                        </span>
                      </td>
                      <td className="p-4">{item.risk}</td>
                      <td className="p-4">{item.liquidity}</td>
                      <td className="p-4">{item.maintenance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-muted-foreground text-center mt-6">
              *Returns are indicative based on ₹2.5L investment with 48-month tenure
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Experience the FOCO Advantage</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join investors who've chosen hassle-free passive income over traditional investments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gradient-primary">
              <Link to="/investment">Calculate Your Returns</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Talk to Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
