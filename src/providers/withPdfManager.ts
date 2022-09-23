import { computed, reactive } from "@vue/composition-api";
import { BlobServiceClient } from "@azure/storage-blob";
import pdfjslib from "pdfjs-dist/build/pdf.js";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { IDocument } from "./types/IDocument";
pdfjslib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const blobServiceClient = new BlobServiceClient(
  `https://${process.env.VUE_APP_BLOB_ACC}.blob.core.windows.net${process.env.VUE_APP_BLOB_SAS}`
);
const containerClient = blobServiceClient.getContainerClient(
  process.env.VUE_APP_BLOB_PROJECTS_CONTAINER!
);

const pdfManager = reactive({
  documents: [] as IDocument[],
  selectedDocument: {} as IDocument,
  fetching: false,
  numberOfBlobs: 10,
});

export const withPdfManager = () => {
  const blobToString = (blob: Blob) => {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.onloadend = (ev) => {
        resolve(ev.target?.result);
      };
      fileReader.onerror = reject;
      fileReader.readAsText(blob);
    });
  };
  const viewDocument = (document: IDocument) => {
    pdfManager.selectedDocument = JSON.parse(JSON.stringify(document));
  };
  const discardDocument = () => {
    pdfManager.selectedDocument = {} as IDocument;
  };

  const selectedDocument = computed(() => pdfManager.selectedDocument);

  const isDocumentSelected = computed(
    () => selectedDocument.value.name !== undefined
  );

  const documentsLoaded = computed(
    () => (pdfManager.documents.length / pdfManager.numberOfBlobs) * 100
  );

  const getBlobs = async () => {
    const blobs = [];

    const iter = containerClient.listBlobsFlat();
    for await (const item of iter) {
      blobs.push(item.name);
    }
    pdfManager.numberOfBlobs = blobs.length;
    return blobs;
  };

  const prepareDocuments = async () => {
    if (pdfManager.documents.length === 0) {
      try {
        pdfManager.fetching = true;
        const blobs = await getBlobs();

        for (let index = 0; index < blobs.length; index++) {
          const blockBlobClient = containerClient.getBlockBlobClient(
            blobs[index]
          );

          try {
            const downloadBlockBlobResponse = await blockBlobClient.download();

            const downloaded = await blobToString(
              await downloadBlockBlobResponse.blobBody!
            );
            const images = ["", ...JSON.parse(`${downloaded}`)];
            pdfManager.documents.push({ name: blobs[index], value: images });
          } catch (error) {
            console.log("Document skpped!");
          }
        }
        pdfManager.fetching = false;
      } catch (error) {
        pdfManager.fetching = false;
      }
    }
  };

  return {
    prepareDocuments,
    discardDocument,
    viewDocument,
    isDocumentSelected,
    documents: computed(() => pdfManager.documents),
    fetching: computed(() => pdfManager.fetching),
    selectedDocument,
    documentsLoaded,
  };
};
