<template>
  <div id="app">
    <b-modal
      id="modal-search"
      size="lg"
      :hide-footer="true"
      :hide-header="true"
    >
      <div class="d-flex flex-row justify-content-center align-items-center">
        <fa class="search-icon" :icon="['fas', 'search']" />
        <input
          ref="search"
          class="form-control form-control-lg"
          type="text"
          placeholder="Search ..."
          v-model="text_search"
          autofocus
        />
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Mutation } from "nuxt-property-decorator";
import { Component, Vue, Ref, Watch } from "vue-property-decorator";
import GifState from "~/store/gifState";
@Component
export default class Searchbar extends Vue {
  @Mutation("gifState/setStatusBar") setStatusBar: any;

  @Ref() readonly search!: HTMLInputElement;

  text_search: string = "";

  unsubscribeStore: any;
  created() {
    this.unsubscribeStore = this.$store.subscribe(
      (mutation: any, state: any) => {
        let showModal = (state.gifState as GifState).showSearchBar;
        this.openModal(showModal);
      }
    );
  }

  mounted() {
    window.addEventListener("keypress", this.onKeyUp);
  }

  destroyed() {
    window.removeEventListener("keypress", this.onKeyUp);
    this.unsubscribeStore();
  }

  onKeyUp(event: KeyboardEvent) {
    console.log(event);
    if (event.key == "Enter") {
      let showModal = (this.$store.state.gifState as GifState).showSearchBar;
      this.setStatusBar(!showModal)
      this.openModal((this.$store.state.gifState as GifState).showSearchBar, "Enter");
    }
  }

  openModal(show: boolean, key: string = "") {
    //this will emit the current value to the father component
    if (show == true) {
      this.$bvModal.show("modal-search");
      this.text_search = "";
      setTimeout(() => {
        this.$nextTick(() => this.search.focus());
      }, 100);
    } else {
      this.$bvModal.hide("modal-search");
      if (this.text_search != "" && this.text_search != undefined) {
        if (key != "") {
          this.$emit("onSearch", this.text_search);
        }
      }
    }
  }
}
</script>

<style lang="scss">
.search-icon {
  margin-left: 1rem;
  font-size: 1.5rem;
  color: gray;
}

.form-control {
  border-color: transparent;

  &:focus {
    box-shadow: none;
    border-color: transparent;
  }
}
</style>