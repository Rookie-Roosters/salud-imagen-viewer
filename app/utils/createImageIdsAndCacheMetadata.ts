import { api } from "dicomweb-client";
import cornerstoneDICOMImageLoader from "@cornerstonejs/dicom-image-loader";
import type { WADORSMetaData } from "@cornerstonejs/dicom-image-loader/types";

export default async function createImageIdsAndCacheMetaData({
  StudyInstanceUID,
  SeriesInstanceUID,
  SOPInstanceUID = null,
  wadoRsRoot,
  client = null,
  authToken = null,
}: {
  StudyInstanceUID: string;
  SeriesInstanceUID: string;
  SOPInstanceUID?: string | null;
  wadoRsRoot: string;
  client?: api.DICOMwebClient | null;
  authToken?: string | null;
}): Promise<string[]> {
  const SOP_INSTANCE_UID = "00080018";
  const SERIES_INSTANCE_UID = "0020000E";

  // const request = new XMLHttpRequest();
  // request.withCredentials = true;

  const studySearchOptions = {
    studyInstanceUID: StudyInstanceUID,
    seriesInstanceUID: SeriesInstanceUID,
    //request,
  };

  // Configure client with authorization if token is provided
  const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
  client = new api.DICOMwebClient({
    url: wadoRsRoot,
    singlepart: true,
    headers: headers,
  });

  console.log("client", client);

  const instances = await client.retrieveSeriesMetadata(studySearchOptions);

  console.log("instances", instances);

  const imageIds = instances.map((instanceMetaData) => {
    const SeriesInstanceUID =
      instanceMetaData?.[SERIES_INSTANCE_UID]?.Value?.[0];
    const SOPInstanceUIDToUse =
      SOPInstanceUID || instanceMetaData?.[SOP_INSTANCE_UID]?.Value?.[0];

    const prefix = "wadors:";

    // Add authorization token to the imageId if provided
    let imageId =
      prefix +
      wadoRsRoot +
      "/studies/" +
      StudyInstanceUID +
      "/series/" +
      SeriesInstanceUID +
      "/instances/" +
      SOPInstanceUIDToUse +
      "/frames/1";

    // // Append authorization token as a query parameter if provided
    // if (authToken) {
    //   imageId += `?token=${authToken}`;
    // }

    cornerstoneDICOMImageLoader.wadors.metaDataManager.add(
      imageId,
      instanceMetaData as WADORSMetaData
    );
    return imageId;
  });

  // we don't want to add non-pet
  // Note: for 99% of scanners SUV calculation is consistent bw slices

  return imageIds;
}

// import { api } from "dicomweb-client";

// const client = new api.DICOMwebClient({
//   url: "https://d14fa38qiwhyfd.cloudfront.net/dicomweb", // tu wadoRsRoot
//   singlepart: true,
// });

// // Función para recuperar un arrayBuffer de una instancia DICOM
// async function fetchAndArrayBuffer(
//   studyUID: string,
//   seriesUID: string,
//   instanceUID: string
// ): Promise<ArrayBuffer> {
//   const blob = await client.retrieveInstance({
//     studyInstanceUID: studyUID,
//     seriesInstanceUID: seriesUID,
//     sopInstanceUID: instanceUID,
//     mediaTypes: [],
//     request: {
//       instance: undefined,
//       progressCallback: undefined,
//       responseType: undefined,
//       withCredentials: undefined,
//     },
//   });
//   return blob;
// }
