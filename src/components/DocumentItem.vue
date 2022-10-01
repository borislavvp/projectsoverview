<template>
  <transition
    appear
    appear-class="fade-enter"
    appear-active-class="fade-enter-active"
    name="fade"
    mode="out-in"
  >
    <div
      v-if="
        !documentIsSelected || (documentIsSelected && isCurrentDocumentSelected)
      "
      :class="[
        isCurrentDocumentSelected
          ? 'h-full p-3 md:p-8 w-full '
          : 'w-1/3 p-4 md:p-12',
      ]"
    >
      <button
        v-if="!isCurrentDocumentSelected"
        class="w-full focus:outline-none outline-none md:p-5 shadow-lg md:shadow-2xl select-none"
        tabindex="1"
        @click="viewDocument"
        :class="{
          'hover:scale-110 transform transition-default duration-500 cursor-pointer': !isMobile,
        }"
      >
        <img :src="coverPage" class="w-full h-full" :alt="documentItem.name" />
      </button>
      <div v-else class="flex items-center h-full w-full">
        <document-thumbnails
          v-if="!isMobile"
          :thumbnails="documentItem.value"
          :flipbook="flipbookRef"
          class="ml-4"
        />
        <flipbook
          v-slot="flipbook"
          ref="flipbookRef"
          class="mx-3 md:mx-6 w-full h-full relative justify-center flex flex-col-reverse"
          :pages="documentItem.value"
          :gloss="0.4"
          :ambient="0.97"
          :perspective="6000"
          :nPolygons="1"
        >
          <document-options :flipbook="flipbook" :is-mobile="isMobile" class="md:pt-4" />
        </flipbook>
      </div>
    </div>
  </transition>
</template>

<script>
import Flipbook from "flipbook-vue";
import { computed, defineComponent, ref } from "@vue/composition-api";
import { usePdfManager } from "../providers/provider";
import DocumentOptions from "./DocumentOptions.vue";
import DocumentThumbnails from "./DocumentThumbnails.vue";

export default defineComponent({
  components: {
    Flipbook,
    DocumentOptions,
    DocumentThumbnails,
  },
  props: {
    documentItem: {
      type: Object,
      required: true,
    },
    documentItemId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const isMobile = window.innerWidth < 500 && window.innerHeight < 900;

    const flipbookRef = ref(null);

    const pdfManager = usePdfManager();

    const coverPage = computed(() => props.documentItem.value[1]);

    const isCurrentDocumentSelected = computed(
      () => props.documentItem.name === pdfManager.selectedDocument.value.name
    );

    const viewDocument = () => pdfManager.viewDocument(props.documentItemId);

    return {
      isMobile,
      flipbookRef,
      coverPage,
      isCurrentDocumentSelected,
      documentIsSelected: pdfManager.isDocumentSelected,
      viewDocument,
      pdfManager,
    };
  },
});
</script>
<style>
.bounding-box {
  -webkit-box-shadow: 0px 5px 15px 5px rgba(53, 53, 53, 0.48);
  box-shadow: 0px 5px 15px 5px rgba(53, 53, 53, 0.48);
}
.click-to-flip {
  display: none;
}
.fade-enter-active {
  transition: opacity 1s;
  transform: translateY(0);
}
.fade-enter/* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.thumbnails {
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(198, 205, 210, 0.6) 52%,
    rgba(255, 255, 255, 0) 100%
  );
}
.thumbnails::-webkit-scrollbar {
  background-color: transparent;
  width: 8px;
}

.thumbnails::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 100px;
}

.thumbnails::-webkit-scrollbar-thumb {
  background-color: #e0e0e0;
  border-radius: 100px;
}
</style>
