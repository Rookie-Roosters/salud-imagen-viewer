import type { Route } from "./+types/home";
import { Flex, Text, Button } from "@radix-ui/themes";
import { BookmarkIcon } from "@radix-ui/react-icons";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Salud Imagen" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Flex direction="column" gap="2">
    <Text>Hello from Radix Themes :)</Text>
    <span className="text-4xl font-bold">Salud Imagen</span>
    <Button><BookmarkIcon />Let's go</Button>
  </Flex>
}


