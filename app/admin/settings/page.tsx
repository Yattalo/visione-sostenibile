"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Input, Textarea } from "../../components/ui/Input";
import { SlideUp } from "../../components/animations";

export default function AdminSettingsPage() {
  const [companyName, setCompanyName] = useState("Visione Sostenibile");
  const [companyEmail, setCompanyEmail] = useState("info@visionesostenibile.it");
  const [companyPhone, setCompanyPhone] = useState("+39 06 1234567");
  const [heroClaim, setHeroClaim] = useState("Il Verde che Vive");

  return (
    <div className="space-y-6">
      <SlideUp>
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Impostazioni
          </h1>
          <p className="text-muted-foreground mt-1">
            Configurazioni generali del sito
          </p>
        </div>
      </SlideUp>

      <SlideUp delay={0.1}>
        <Card>
          <CardHeader>
            <CardTitle>Dati aziendali</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Nome azienda"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
            />
            <Input
              label="Telefono"
              value={companyPhone}
              onChange={(e) => setCompanyPhone(e.target.value)}
            />
            <Textarea
              label="Claim homepage"
              value={heroClaim}
              onChange={(e) => setHeroClaim(e.target.value)}
            />
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Salva impostazioni
            </Button>
          </CardContent>
        </Card>
      </SlideUp>
    </div>
  );
}
