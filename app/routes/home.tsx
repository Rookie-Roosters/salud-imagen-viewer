import type { Route } from "./+types/home";
import { Flex, Box, Card } from "@radix-ui/themes";
import MainCanvas from "~/components/MainCanvas";
import LeftSidebar from "~/components/LeftSidebar";
import RightSidebar from "~/components/RightSidebar";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Salud Imagen" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <Flex className="h-screen overflow-hidden" p="2">
      {/* Left Sidebar */}
      <Card className="hidden! md:block! md:w-sm">
        <LeftSidebar />
      </Card>

      {/* Main Content */}
      <Box className="flex-grow overflow-hidden">
        <MainCanvas />
      </Box>

      {/* Right Sidebar */}
      <Card className="hidden! md:block! md:w-sm">
        <RightSidebar />
      </Card>
    </Flex>
  )
}