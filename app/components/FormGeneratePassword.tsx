"use client";

import { useState } from "react";
import ResultPassword from "./ResultPassword";
import Instructions from "./Instructions";
import SavedPasswordsList from "./SavedPasswordsList";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { ThemeToggle } from "@/components/theme-toggle";

function FormGeneratePassword() {
  const [numberOfCharacters, setNumberOfCharacters] = useState(12);
  const [specialCharacter, setSpecialCharacter] = useState(true);
  const [numberCharacter, setNumberCharacter] = useState(true);
  const [majCharacter, setMajCharacter] = useState(true);

  return (
    <div className="container max-w-2xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold uppercase">
          Générez un mot-de-passe{" "}
          <span className="italic font-extralight font-serif font-[Montserrat]">
            sécurisé
          </span>
        </h1>
        <ThemeToggle />
      </div>
      <Card className="p-6 rounded-3xl">
        <form className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="specialCharacter" className="flex flex-col">
                <span>Caractères Spéciaux</span>
                <span className="text-sm text-muted-foreground">
                  Inclure des caractères comme <code>!@#$%&*?</code>
                </span>
              </Label>
              <Switch
                id="specialCharacter"
                checked={specialCharacter}
                onCheckedChange={setSpecialCharacter}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="numberCharacter" className="flex flex-col">
                <span>Chiffres</span>
                <span className="text-sm text-muted-foreground">
                  Inclure des chiffres de 0 à 9
                </span>
              </Label>
              <Switch
                id="numberCharacter"
                checked={numberCharacter}
                onCheckedChange={setNumberCharacter}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="majCharacter" className="flex flex-col">
                <span>Lettres Majuscules</span>
                <span className="text-sm text-muted-foreground">
                  Inclure des lettres de A à Z en majuscule
                </span>
              </Label>
              <Switch
                id="majCharacter"
                checked={majCharacter}
                onCheckedChange={setMajCharacter}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Longueur du mot-de-passe</Label>
                <span className="text-sm text-muted-foreground">
                  {numberOfCharacters} Caractères
                </span>
              </div>
              <Slider
                value={[numberOfCharacters]}
                onValueChange={(value) => setNumberOfCharacters(value[0])}
                min={4}
                max={30}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </form>
      </Card>

      <ResultPassword
        sChar={specialCharacter}
        nbChar={numberCharacter}
        majChar={majCharacter}
        nbOfChar={numberOfCharacters}
      />

      {/* <Instructions /> */}

      <SavedPasswordsList />
    </div>
  );
}

export default FormGeneratePassword;
