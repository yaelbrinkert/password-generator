"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePasswords } from "@/context/PasswordsProvider";

interface ResultPasswordProps {
  sChar: boolean;
  nbChar: boolean;
  majChar: boolean;
  nbOfChar: number;
}

export default function ResultPassword({
  sChar,
  nbChar,
  majChar,
  nbOfChar,
}: ResultPasswordProps) {
  const [password, setPassword] = useState("");
  const { arrayOfPasswords, setArrayOfPasswords } = usePasswords();
  const { toast } = useToast();

  const generatePassword = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    // const special = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const special = "!@#$%&*?";

    // Initialize the password with required characters
    let requiredChars = [];
    let charset = lowercase; // Always include lowercase

    if (majChar) {
      charset += uppercase;
      requiredChars.push(
        uppercase[Math.floor(Math.random() * uppercase.length)]
      );
    }
    if (nbChar) {
      charset += numbers;
      requiredChars.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }
    if (sChar) {
      charset += special;
      requiredChars.push(special[Math.floor(Math.random() * special.length)]);
    }

    // Add required characters first
    let result = requiredChars.join("");

    // Fill the rest with random characters
    const remainingLength = nbOfChar - result.length;
    for (let i = 0; i < remainingLength; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    // Shuffle the password to make it more random
    result = result
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    setPassword(result);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      toast({
        title: "Copié!",
        description: "Mot-de-passe copié au clip-board",
      });
      setArrayOfPasswords([...arrayOfPasswords, password]);
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la copie du mot-de-passe",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    generatePassword();
  }, [sChar, nbChar, majChar, nbOfChar]);

  return (
    <Card className="p-6 mt-6 rounded-3xl">
      <div className="flex items-center justify-between gap-4">
        <code className="relative rounded bg-muted px-[0.5rem] py-[0.3rem] font-mono text-lg">
          {password}
        </code>
        <div className="flex gap-2">
          <Button
            className="rounded-[50%]"
            variant="outline"
            size="icon"
            onClick={generatePassword}
            title="Générer un nouveau mot-de-passe"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            className="rounded-[50%]"
            variant="outline"
            size="icon"
            onClick={copyToClipboard}
            title="Copier au clip-board"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
