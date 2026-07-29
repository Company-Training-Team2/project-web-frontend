import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";


export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 p-8">
      <Typography variant="h1">
        EventHub
      </Typography>

      <Typography
        variant="body"
        className="text-muted-foreground text-center max-w-lg"
      >
        Find and book everything you need for your event in one place.
      </Typography>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button>Primary</Button>

        <Button variant="secondary">
          Secondary
        </Button>

        <Button variant="outline">
          Outline
        </Button>

        <Button variant="ghost">
          Ghost
        </Button>

        <Button variant="destructive">
          Delete
        </Button>

        <Button variant="link">
          Learn More
        </Button>
      </div>
    </main>
  );
}