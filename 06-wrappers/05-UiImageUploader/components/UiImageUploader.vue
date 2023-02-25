<template>
  <div class="image-uploader">
    <label class="image-uploader__preview"
      :class="{
        'image-uploader__preview-loading': state === 'loading',
      }"
      :style="selectedImage ? `--bg-url: url('${selectedImage}')` : null"
    >
      <span class="image-uploader__text">
        {{ text }}
      </span>
      <input type="file" accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs" ref="input"
        @click="click"
        @change="change" />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  data() {
    return {
      state: this.preview ? 'full' : 'empty', // 'empty' | 'loading' | 'full'
      selectedImage: this.preview ? this.preview : null,
    };
  },

  emits: ['upload', 'error', 'remove', 'select'],

  computed: {
    text() {
      switch (this.state) {
        case 'loading':
          return 'Загрузка...';
        case 'full':
          return 'Удалить изображение';
        case 'empty':
        default:
          return 'Загрузить изображение';
      };
    },
  },

  props: {
    preview: {
      type: String,
      required: false,
    },
    uploader: {
      type: Function,
      required: false,
    },
  },

  methods: {
    click(e) {
      switch (this.state) {
        case 'loading':
          e.preventDefault();
          break;
        case 'full':
          e.preventDefault();
          this.delete();
          break;
      };
    },
    delete() {
      this.state = 'empty';
      this.selectedImage = null;
      this.$emit('remove');
      this.$refs.input.value = null;
    },
    async change(e) {
      const file = this.$refs.input.files[0];
      this.selectedImage = URL.createObjectURL(file);
      this.$emit('select', file);

      if (this.uploader) {
        try {
          this.state = 'loading';
          const result = await this.uploader(file);
          this.$emit('upload', result);
          this.state = 'full';
        } catch (error) {
          this.$emit('error', error);
          this.state = 'empty';
          this.selectedImage = null;
          this.$refs.input.value = null;
        }
      } else {
        this.state = 'full';
      }
    },
  },

};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
