import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';
import content from '@/data/content.json';

export default function FAQ() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <HelpCircle className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-up">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about investing with Speed Force EV
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 shadow-elevated">
              <Accordion type="single" collapsible className="w-full">
                {content.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto p-10 text-center">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-8">
              Our investor relations team is here to help. Get in touch and we'll clarify 
              any doubts about the investment process, returns, or our FOCO model.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-primary">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${content.contact.phone}`}>Call {content.contact.phone}</a>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Explore More</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 hover-lift">
                <h3 className="font-semibold mb-2">Investment Plans</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Calculate your returns with our ROI simulator
                </p>
                <Button asChild variant="link" className="p-0">
                  <Link to="/investment">View Plans →</Link>
                </Button>
              </Card>

              <Card className="p-6 hover-lift">
                <h3 className="font-semibold mb-2">How It Works</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Understand our 4-step investment process
                </p>
                <Button asChild variant="link" className="p-0">
                  <Link to="/how">Learn Process →</Link>
                </Button>
              </Card>

              <Card className="p-6 hover-lift">
                <h3 className="font-semibold mb-2">Why Us</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Discover the FOCO model advantage
                </p>
                <Button asChild variant="link" className="p-0">
                  <Link to="/why">Explore Benefits →</Link>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
