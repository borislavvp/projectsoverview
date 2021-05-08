import { ComputedRef } from "@vue/composition-api";
import { IDocument } from "./IDocument";

export interface PdfManager{
    prepareDocuments : () => Promise<void>,
    discardDocument:() => void,
    viewDocument: () => void,
    isDocumentSelected:ComputedRef<boolean>,
    documents: ComputedRef<IDocument[]>,
    fetching: ComputedRef<boolean>,
    selectedDocument:ComputedRef<IDocument>,
    documentsLoaded:ComputedRef<number>,
}