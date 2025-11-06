import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Building2 } from "lucide-react";

const OfferingsSection = () => {
  return (
    <section id="doar" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          {/* <div className="inline-flex items-center justify-center p-3 bg-primary-light rounded-lg mb-4">
            <DollarSign className="w-8 h-8 text-primary" />
          </div> */}
          <h2 className="text-primary mb-6">Dízimos & Ofertas</h2>
          <div className="bg-primary-light border border-primary/20 rounded-xl p-6 mb-6">
            <p className="text-lg italic text-foreground">
              `&quot;Cada um dê conforme determinou em seu coração, não com pesar ou por obrigação, 
              pois Deus ama quem dá com alegria.&quot;`
            </p>
            <p className="text-sm text-muted-foreground mt-2">2 Coríntios 9:7</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
          <Card className="hover:shadow-medium transition-smooth">
            <CardContent className="pt-6 text-center">
              <div className="bg-primary-light p-4 rounded-lg w-fit mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">PIX</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Chave: cnpj@cbatos29.com.br
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Copiar Chave
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-smooth">
            <CardContent className="pt-6 text-center">
              <div className="bg-primary-light p-4 rounded-lg w-fit mx-auto mb-4">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Transferência</h3>
              <p className="text-sm text-muted-foreground mb-1">
                Banco: 001 - Banco do Brasil
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                Ag: 1234-5 | CC: 12345-6
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Ver Detalhes
              </Button>
            </CardContent>
          </Card>

         
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Suas contribuições ajudam a sustentar a obra de Deus e impactar vidas
          </p>
        </div>
      </div>
    </section>
  );
};

export default OfferingsSection;
