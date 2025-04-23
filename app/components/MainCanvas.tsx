import { Box, Flex, IconButton, Tooltip } from "@radix-ui/themes";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MagnifyingGlassIcon, PlusIcon, MinusIcon, ResetIcon, RotateCounterClockwiseIcon, EnterFullScreenIcon } from "@radix-ui/react-icons";

export default function MainCanvas() {
    return (
        <div className="h-full w-full overflow-hidden rounded-lg p-2 relative">
            <TransformWrapper
                initialScale={1}
                wheel={{ step: 0.3 }}
                doubleClick={{ disabled: true }}
                pinch={{ disabled: false }}>
                {({ zoomIn, zoomOut, resetTransform, setTransform }) => (
                    <>
                        <TransformComponent>
                            <img
                                src="/images/bombardino.jpeg"
                                alt="Viewer"
                                className="w-full h-full object-contain" />
                        </TransformComponent>

                        <Box className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                            <Flex gap="1" p="2" className="bg-slate-800/80 backdrop-blur-sm rounded-full shadow-lg">
                                <Tooltip content="Zoom Out">
                                    <IconButton
                                        size="2"
                                        variant="ghost"
                                        color="gray"
                                        highContrast
                                        radius="full"
                                        onClick={() => zoomOut()}>
                                        <MinusIcon width="18" height="18" />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip content="Zoom In">
                                    <IconButton
                                        size="2"
                                        variant="ghost"
                                        color="gray"
                                        highContrast
                                        radius="full"
                                        onClick={() => zoomIn()}>
                                        <PlusIcon width="18" height="18" />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip content="Reset View">
                                    <IconButton
                                        size="3"
                                        variant="ghost"
                                        color="gray"
                                        highContrast
                                        radius="full"
                                        onClick={() => resetTransform()}>
                                        <ResetIcon width="18" height="18" />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip content="Rotate">
                                    <IconButton
                                        size="3"
                                        variant="ghost"
                                        color="gray"
                                        highContrast
                                        radius="full"
                                        onClick={() => {
                                            const rotation = prompt("Enter rotation angle in degrees", "90");
                                            if (rotation) {
                                                setTransform(0, 0, Number(rotation));
                                            }
                                        }}>
                                        <RotateCounterClockwiseIcon width="18" height="18" />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip content="Fullscreen">
                                    <IconButton
                                        size="2"
                                        variant="ghost"
                                        color="gray"
                                        highContrast
                                        radius="full"
                                        onClick={() => {
                                            // Toggle fullscreen view
                                            if (!document.fullscreenElement) {
                                                document.documentElement.requestFullscreen();
                                            } else {
                                                document.exitFullscreen();
                                            }
                                        }}>
                                        <EnterFullScreenIcon width="18" height="18" />
                                    </IconButton>
                                </Tooltip>
                            </Flex>
                        </Box>
                    </>
                )}
            </TransformWrapper>
        </div>
    );
}