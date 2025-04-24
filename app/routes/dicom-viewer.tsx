import React, { useState, Suspense, lazy } from 'react';

// Sample DICOM Image URLs - Replace with actual DICOM images when available
const sampleImageIds = [
    'wadouri:https://github.com/cornerstonejs/cornerstoneWADOImageLoader/raw/2d947aff9d8430bd9c1a1ee4c3a1d105e65708f3/examples/test-images/CTImage.dcm',
    //'wadouri:https://raw.githubusercontent.com/cornerstonejs/cornerstoneDICOMImageLoader/master/examples/MRImage.dcm',
];

// Lazy load the DicomView component
const DicomView = lazy(() => import('../components/ui/dicom-view'));

// Placeholder component while loading
const LoadingPlaceholder = ({ height }: { height: string | number }) => (
    <div className="flex items-center justify-center bg-gray-100 rounded-md" style={{ height }}>
        <div className="text-center">
            <div className="animate-pulse bg-gray-300 h-6 w-32 mx-auto mb-2 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-4 w-48 mx-auto rounded"></div>
        </div>
    </div>
);

export default function DicomViewerPage() {
    const [tools] = useState([
        'Pan',
        'Zoom',
        'WindowLevel',
        'StackScroll',
        'Length',
        'Angle',
        'RectangleROI',
        'EllipticalROI'
    ]);

    const handleImageRendered = (element: HTMLDivElement, imageId: string) => {
        console.log('Image rendered:', imageId);
    };

    const handleMeasurementComplete = (measurement: any) => {
        console.log('Measurement completed:', measurement);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">DICOM Viewer Example</h1>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Single Image Viewer</h2>
                <Suspense fallback={<LoadingPlaceholder height="400px" />}>
                    <DicomView
                        imageIds={[sampleImageIds[0]]}
                        tools={tools}
                        height="400px"
                        onImageRendered={handleImageRendered}
                        onMeasurementComplete={handleMeasurementComplete}
                    />
                </Suspense>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Multiple Image Stack</h2>
                <Suspense fallback={<LoadingPlaceholder height="500px" />}>
                    <DicomView
                        imageIds={sampleImageIds}
                        tools={tools}
                        height="500px"
                        onImageRendered={handleImageRendered}
                        onMeasurementComplete={handleMeasurementComplete}
                    />
                </Suspense>
            </div>
        </div>
    );
} 