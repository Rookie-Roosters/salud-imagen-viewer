import { useState, useEffect } from "react";

// Track initialization state
let initialized = false;

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined";

/**
 * Custom hook for CornerstoneJS initialization and common functionalities
 * @returns {Object} Cornerstone utilities and state
 */
export const useCornerstone = () => {
  const [isInitialized, setIsInitialized] = useState(initialized);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cornerstone, setCornerstone] = useState<any>(null);
  const [cornerstoneTools, setCornerstoneTools] = useState<any>(null);
  const [cornerstoneDICOMImageLoader, setCornerStoneDICOMImageLoader] =
    useState<any>(null);

  // Initialize Cornerstone
  useEffect(() => {
    // Only run in browser environment
    if (!isBrowser) {
      setIsLoading(false);
      return;
    }

    const init = async () => {
      if (initialized) {
        setIsInitialized(true);
        setIsLoading(false);
        return;
      }

      try {
        // Dynamically import Cornerstone modules
        const [
          cornerstoneModule,
          cornerstoneToolsModule,
          dicomImageLoaderModule,
        ] = await Promise.all([
          import("@cornerstonejs/core"),
          import("@cornerstonejs/tools"),
          import("@cornerstonejs/dicom-image-loader"),
        ]);

        // Set modules to state
        setCornerstone(cornerstoneModule);
        setCornerstoneTools(cornerstoneToolsModule);
        setCornerStoneDICOMImageLoader(dicomImageLoaderModule);

        // Initialize cornerstone core
        await cornerstoneModule.init();

        // Initialize cornerstone tools
        await cornerstoneToolsModule.init();

        await dicomImageLoaderModule.init();

        // // Initialize DICOM Loader - using any to bypass type errors
        // const dicomLoader = dicomImageLoaderModule as any;
        // if (dicomLoader && dicomLoader.wadouri && dicomLoader.wadors) {
        //   // Register loaders with cornerstone
        //   cornerstoneModule.imageLoader.registerImageLoader(
        //     "wadouri",
        //     dicomLoader.wadouri.loadImage
        //   );
        //   cornerstoneModule.imageLoader.registerImageLoader(
        //     "wadors",
        //     dicomLoader.wadors.loadImage
        //   );
        // }

        // Register common tools
        cornerstoneToolsModule.addTool(cornerstoneToolsModule.PanTool);
        cornerstoneToolsModule.addTool(cornerstoneToolsModule.ZoomTool);
        cornerstoneToolsModule.addTool(cornerstoneToolsModule.WindowLevelTool);
        cornerstoneToolsModule.addTool(cornerstoneToolsModule.StackScrollTool);
        cornerstoneToolsModule.addTool(cornerstoneToolsModule.MagnifyTool);
        cornerstoneToolsModule.addTool(cornerstoneToolsModule.LengthTool);
        cornerstoneToolsModule.addTool(cornerstoneToolsModule.AngleTool);
        cornerstoneToolsModule.addTool(cornerstoneToolsModule.RectangleROITool);
        cornerstoneToolsModule.addTool(
          cornerstoneToolsModule.EllipticalROITool
        );
        cornerstoneToolsModule.addTool(
          cornerstoneToolsModule.BidirectionalTool
        );
        cornerstoneToolsModule.addTool(
          cornerstoneToolsModule.ArrowAnnotateTool
        );

        initialized = true;
        setIsInitialized(true);
        setIsLoading(false);
        console.log("Cornerstone initialized successfully");
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Unknown error initializing Cornerstone";
        console.error("Error initializing Cornerstone:", err);
        setError(errorMessage);
        setIsLoading(false);
      }
    };

    init();
  }, []);

  /**
   * Get Cornerstone tool by name
   * @param {string} toolName - The name of the tool
   * @returns {Object|null} - The tool object or null if not found
   */
  const getToolByName = (toolName: string) => {
    if (!cornerstoneTools) return null;

    switch (toolName) {
      case "Pan":
        return cornerstoneTools.PanTool;
      case "Zoom":
        return cornerstoneTools.ZoomTool;
      case "WindowLevel":
        return cornerstoneTools.WindowLevelTool;
      case "StackScroll":
        return cornerstoneTools.StackScrollTool;
      case "Magnify":
        return cornerstoneTools.MagnifyTool;
      case "Length":
        return cornerstoneTools.LengthTool;
      case "Angle":
        return cornerstoneTools.AngleTool;
      case "RectangleROI":
        return cornerstoneTools.RectangleROITool;
      case "EllipticalROI":
        return cornerstoneTools.EllipticalROITool;
      case "Bidirectional":
        return cornerstoneTools.BidirectionalTool;
      case "ArrowAnnotate":
        return cornerstoneTools.ArrowAnnotateTool;
      default:
        return null;
    }
  };

  /**
   * Create a rendering engine and viewport
   * @param {HTMLDivElement} element - The DOM element to render in
   * @param {string} engineId - Rendering engine ID
   * @param {string} viewportId - Viewport ID
   * @returns {Object} - The viewport and rendering engine
   */
  const createViewport = async (
    element: HTMLDivElement,
    engineId = "cornerstoneRenderingEngine",
    viewportId = "cornerstoneViewport"
  ) => {
    if (!cornerstone) {
      throw new Error("Cornerstone is not initialized");
    }

    try {
      // Create rendering engine
      const renderingEngine = new cornerstone.RenderingEngine(engineId);

      // Create viewport
      const viewportInput = {
        viewportId,
        element,
        type: cornerstone.Enums.ViewportType.STACK,
      };

      renderingEngine.enableElement(viewportInput);

      // Get viewport
      const viewport = renderingEngine.getViewport(viewportId);

      return { viewport, renderingEngine };
    } catch (err) {
      console.error("Error creating viewport:", err);
      throw err;
    }
  };

  /**
   * Create a tool group and add tools
   * @param {string} toolGroupId - Tool group ID
   * @param {string} viewportId - Viewport ID
   * @param {string} renderingEngineId - Rendering engine ID
   * @param {string[]} tools - Array of tool names to add
   * @returns {Object} - The tool group
   */
  const createToolGroup = (
    toolGroupId: string,
    viewportId: string,
    renderingEngineId: string,
    tools: string[] = ["Pan", "Zoom", "WindowLevel", "StackScroll"]
  ) => {
    if (!cornerstoneTools) {
      throw new Error("Cornerstone Tools is not initialized");
    }

    try {
      const toolGroup =
        cornerstoneTools.ToolGroupManager.createToolGroup(toolGroupId);

      if (!toolGroup) {
        throw new Error("Failed to create tool group");
      }

      // Add tools to tool group
      tools.forEach((toolName) => {
        const toolClass = getToolByName(toolName);
        if (toolClass) {
          toolGroup.addTool(toolClass.name);
        }
      });

      // Add viewport to tool group
      toolGroup.addViewport(viewportId, renderingEngineId);

      // Set active tool
      if (tools.length > 0) {
        const firstTool = getToolByName(tools[0]);
        if (firstTool) {
          toolGroup.setToolActive(firstTool.name, {
            bindings: [{ mouseButton: 1 }],
          });
        }
      }

      return toolGroup;
    } catch (err) {
      console.error("Error creating tool group:", err);
      throw err;
    }
  };

  /**
   * Load an image and display it in the viewport
   * @param {Object} viewport - The viewport to display the image in
   * @param {string|string[]} imageIds - Image ID or array of image IDs
   */
  const loadAndDisplayImage = async (
    viewport: any,
    imageIds: string | string[]
  ) => {
    if (!cornerstone) {
      throw new Error("Cornerstone is not initialized");
    }

    try {
      const stackViewport = viewport;
      const imageIdArray = Array.isArray(imageIds) ? imageIds : [imageIds];

      // Set the stack
      await stackViewport.setStack(imageIdArray);

      // Render the image
      stackViewport.render();

      return true;
    } catch (err) {
      console.error("Error loading image:", err);
      throw err;
    }
  };

  return {
    isInitialized,
    isLoading,
    error,
    getToolByName,
    createViewport,
    createToolGroup,
    loadAndDisplayImage,
    cornerstone,
    cornerstoneTools,
    cornerstoneDICOMImageLoader,
  };
};

export default useCornerstone;
