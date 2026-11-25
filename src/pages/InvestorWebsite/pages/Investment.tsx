import ROICalculator from '@/pages/InvestorWebsite/components/ROICalculator';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import content from '@/pages/InvestorWebsite/data/content.json';

export default function Investment() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-up">
            Investment Plans & ROI
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transparent returns with flexible investment slabs
          </p>
        </div>
      </section>

      {/* Example Investment */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-20">
            <Card className="p-10 shadow-elevated">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">Example Investment</span>
                </div>
                <h2 className="text-3xl font-bold mb-2">₹2.5 Lakhs Investment</h2>
                <p className="text-muted-foreground">48-month tenure with 15% salvage value</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-muted-foreground">Monthly Rent</span>
                    <span className="font-semibold">₹{content.investmentExample.monthlyRent.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-muted-foreground">Annual Rent</span>
                    <span className="font-semibold">₹{content.investmentExample.annualRent.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-muted-foreground">Total Rent (48 months)</span>
                    <span className="font-semibold">₹{content.investmentExample.total4Years.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-muted-foreground">Salvage Value</span>
                    <span className="font-semibold">₹{content.investmentExample.salvageValue.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b bg-primary/5 px-4 rounded-lg">
                    <span className="font-semibold">Total Receivable</span>
                    <span className="font-bold text-primary text-lg">₹{content.investmentExample.totalReceivable.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-muted-foreground">Total ROI</span>
                    <span className="font-semibold text-primary">{content.investmentExample.roi}%</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* ROI Calculator */}
          <ROICalculator />
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              How Speed Force EV Compares
            </h2>

            <Card className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">Investment Type</th>
                      <th className="text-left p-4 font-semibold">Indicative Returns</th>
                      <th className="text-left p-4 font-semibold">Typical Tenure</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-primary/5">
                      <td className="p-4 font-semibold">Speed Force EV</td>
                      <td className="p-4 font-semibold text-primary">{content.comparison.speedForceEV}</td>
                      <td className="p-4">48 months fixed</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Mutual Funds</td>
                      <td className="p-4">{content.comparison.mutualFunds}</td>
                      <td className="p-4">Variable</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Real Estate</td>
                      <td className="p-4">{content.comparison.realEstate}</td>
                      <td className="p-4">5-10 years+</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Gold</td>
                      <td className="p-4">{content.comparison.gold}</td>
                      <td className="p-4">Variable</td>
                    </tr>
                    <tr>
                      <td className="p-4">Fixed Deposits</td>
                      <td className="p-4">{content.comparison.fixedDeposits}</td>
                      <td className="p-4">1-5 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                *Returns are indicative and subject to market conditions. Past performance does not guarantee future results.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Invest?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start earning fixed monthly income from EV fleet investments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gradient-primary">
              <Link to="/contact">Apply Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/faq">View FAQ</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
