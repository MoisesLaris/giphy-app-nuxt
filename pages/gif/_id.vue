
<template>
  <div class="row my-4" v-if="isLoaded">
    <div class="col-lg-2 col-md-3">
      <div>
        <div v-if="user" class="d-flex flex-row justify-content-md-start align-items-md-center">
          <img class="image user-avatar" :src="user.avatar_url" />
          <div class="d-flex ml-3 flex-column justify-content-around">
            <span>{{user.display_name}}</span>
            <span class="description">
              @{{user.username}}
              <fa
                v-if="user.is_verified"
                class="text-success icon"
                :icon="['fas', 'check-circle']"
              />
            </span>
          </div>
        </div>
        <div class="description mt-3">{{gif.title}}</div>
        <div class="d-flex flex-row flex-wrap justify-content-between">
          <div class="mr-4">
            <div class="mt-3">Follow on:</div>
            <div class="d-flex flex-row social-network-icons mt-3">
              <fa class="animate fb" :icon="['fab', 'facebook-square']" />
              <fa class="animate ig" :icon="['fab', 'instagram']" />
              <fa class="animate yt" :icon="['fab', 'youtube']" />
            </div>
          </div>
          <div class="mr-4">
            <div class="mt-3">Share:</div>
            <fa @click="onClickShare" class="animate mt-3" :icon="['fas', 'share-alt']" />
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-8 col-md-6">
      <div class="mt-4 mt-md-0">
        <span class="text-md-center">{{gif.title}}</span>
        <div class="d-flex justify-content-md-start justify-content-center align-items-center mt-3">
          <!-- <img style="backgroud-color: pink;" class="image gif-image" :src="gif.images.original.mp4" alt /> -->
          <video
            class="image gif-image"
            :width="gif.images.original.width"
            :height="gif.images.original.height"
            autoplay
            loop
            muted
            playsinline
          >
            <source :src="gif.images.original.mp4" type="video/mp4" />
            <img :src="gif.images.original.mp4" />
          </video>
        </div>
      </div>
    </div>
    <div class="col-lg-2 col-md-3">
      <div class="d-flex justify-content-end mt-4 mt-md-0">
        <div class="arrow-btn">
          <fa class="animate" :icon="['fas', 'chevron-left']" />
        </div>
        <div class="arrow-btn">
          <fa class="animate" :icon="['fas', 'chevron-right']" />
        </div>
      </div>
      <div id="infomation" class="d-flex flex-column justify-content-between mt-3">
        <span>Dimensions: {{gif.images.original.width}} x {{gif.images.original.height}} px</span>
        <span>Uploaded: {{gif.import_datetime | formatDate}}</span>
        <span>Size: {{gif.images.original.size | byteFilter}}</span>
        <span>Rating: {{gif.rating}}</span>
        <span>Frames: {{gif.images.original.frames}}</span>
        <span>
          Flag this GIF
          <fa class="ml-2" :icon="['fas', 'flag']" />
        </span>
      </div>
      <div class="tags">
        <span v-for="(tag, index) in getTags(gif.title)" :key="tag + index">#{{tag}}</span>
      </div>
    </div>
    <b-alert
      v-model="showBottom"
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000;"
      variant="primary"
      dismissible
    >
    Link copied!
    </b-alert>
  </div>
  <div v-else>
    <Loading />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AxiosResponse } from "axios";
import { GifByID } from "../../models/gif-by-id.interface";
import { Gif, User } from "~/models/gif.interface";
import { Action } from "vuex-class";
import GifState from "~/store/gifState";
import Loading from "~/components/Loading.vue"; // @ is an alias to /src

@Component({
  components: {
    Loading
  }
})
@Component
export default class DetailedGif extends Vue {
  @Action("gifState/gifById") getGif: any;

  gif!: Gif;
  user!: User | undefined;
  isLoaded: boolean = false;
  showBottom: boolean = false;

  async created() {
    let id: string = this.$route.params.id;
    this.getGifById(id);
  }

  async getGifById(id: string) {
    await this.getGif(id);
    this.user = (this.$store.state.gifState as GifState).gif.user;
    this.gif = (this.$store.state.gifState as GifState).gif;
    this.isLoaded = true;
  }

  //The tags will be generated with the name of the GIF since we don't have a property that provides that.
  getTags(title: string): string[] {
    return title.split(" ", 3);
  }

  //The url will be copied un our clipboard
  onClickShare() {
    var input = document.body.appendChild(document.createElement("input"));
    input.value = window.location.hostname + this.$route.path;
    input.focus();
    input.select();
    document.execCommand("copy");
    input?.parentNode?.removeChild(input);
    this.showBottom = true;
    setTimeout(() => {
      this.showBottom = false;
    }, 2000);
  }
}
</script>

<style lang="scss" scoped>
.description {
  color: #a7a7a7;
  font-size: 0.85rem;
}

.social-network-icons {
  font-size: 1.25rem;

  & > * {
    margin-right: 0.75rem !important;
    cursor: pointer;
  }

  & .yt {
    color: #c4302b !important;
  }

  & .fb {
    color: #1877f2 !important;
  }

  & .ig {
    color: white !important;
  }
}

#infomation {
  & > * {
    margin-bottom: 0.5rem;
  }
}

.image {
  object-fit: cover;
  line-height: 0;
  display: block;
}

.user-avatar {
  width: 100%;
  height: 100%;
  max-height: 50px;
  max-width: 50px;
  border-radius: 10%;
}

.gif-image {
  width: 100%;
  height: 100%;
}

.tags {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 0.5rem;

  & > span {
    width: 130px;
    background-color: #363636;
    color: white;
    border-radius: 10px;
    padding: 2px 5px;
    margin-bottom: 5px;
    text-align: center;
  }
}

.arrow-btn{
  background-color: #363636;
  padding: 1px 7px;
  margin-left: 10px;
}

</style>