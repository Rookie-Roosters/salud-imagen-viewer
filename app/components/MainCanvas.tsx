import { Box, Flex, IconButton, Tooltip } from "@radix-ui/themes";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MagnifyingGlassIcon, PlusIcon, MinusIcon, ResetIcon, RotateCounterClockwiseIcon, EnterFullScreenIcon } from "@radix-ui/react-icons";
import { useRef, useEffect } from "react";

// Import cornerstone libraries
import { init as coreInit, RenderingEngine } from '@cornerstonejs/core';
import { init as dicomImageLoaderInit } from '@cornerstonejs/dicom-image-loader';
import type { PublicViewportInput } from "@cornerstonejs/core/types/IViewport";
import createImageIdsAndCacheMetaData from "../utils/createImageIdsAndCacheMetadata";
import { ViewportType } from "@cornerstonejs/core/enums";
import { init as csToolsInit } from "@cornerstonejs/tools"


export default function MainCanvas() {
    const elementRef = useRef<HTMLDivElement>(null)
    const running = useRef(false)

    useEffect(() => {
        async function initCornerstone() {
            if (running.current) {
                return
            }
            running.current = true

            coreInit();
            csToolsInit()

            // Initialize DICOM Image Loader with authorization header
            dicomImageLoaderInit({
                maxWebWorkers: 1,
                beforeSend: (xhr, imageId, defaultHeaders) => {
                    // Add authorization token to requests
                    xhr.setRequestHeader('Authorization', 'Bearer DICOM_TOKEN<<');
                    return defaultHeaders;
                }
            });

            // const projectId = 'salud-imagen';
            // const location = 'us-central1';
            // const datasetId = 'salud-imagen-dataset';
            // const dicomStoreId = 'salud-imagen-dicom-store';

            // const path = 'projects/saludimagen/locations/northamerica-northeast1/datasets/dicom_sample_v1/dicomStores/v1'

            const imageIds = await createImageIdsAndCacheMetaData({
                StudyInstanceUID:
                    '1.3.6.1.4.1.14519.5.2.1.1188.4001.866856253970500879015300047605',
                SeriesInstanceUID:
                    '1.3.6.1.4.1.14519.5.2.1.1188.4001.913510847891003552926172580049',
                wadoRsRoot: process.env.DICOM_SERVER_URL || '',
                authToken: process.env.DICOM_AUTH_TOKEN || ''
            });

            console.log('imageIds', imageIds);

            const renderingEngineId = 'myRenderingEngine';
            const renderingEngine = new RenderingEngine(renderingEngineId);

            const viewportId = 'CT_AXIAL_STACK';

            const viewportInput = {
                viewportId,
                element: elementRef.current,
                type: ViewportType.STACK,
            } as PublicViewportInput;



            renderingEngine.enableElement(viewportInput);

            console.log('renderingEngine', renderingEngine);

            const viewport = renderingEngine.getStackViewport(viewportId);

            viewport.setStack(imageIds);

            console.log('viewport', viewport);

            viewport.render();


            console.log('Cornerstone libraries initialized successfully');

            // Additional setup can go here
            // For example, configuring DICOM image loader or setting up tools


        }

        initCornerstone();


    }, [elementRef, running]);

    return (
        <div className="h-full w-full overflow-hidden rounded-lg p-2 relative">

            <div
                ref={elementRef}
                style={{
                    width: "512px",
                    height: "512px",
                    backgroundColor: "#000",
                }}
            ></div>

            {/* <TransformWrapper
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
            </TransformWrapper> */}
        </div>
    );
}