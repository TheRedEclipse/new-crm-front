<template>
  <div>
    <AdminBar />
    <div class="container">
      <div class="col-12 bilder">
        <h2>Create Page</h2>
        <a
          class="button button-outline-primary d-flex justify-content-center w-10 mt-2"
          href="/control/cms/pages"
        >
          <SvgIcon name="prev" />
          <span class="ml-2">Back</span>
        </a>
        <div class="form-group mt-1">
          <label>Title</label>
          <input
            v-model="title"
            type="text"
            class="form-control"
            placeholder="Title Page"
          />
        </div>
        <div class="form-group mt-1">
          <label>Link</label>
          <input
            v-model="link"
            type="text"
            class="form-control"
            placeholder="Title Page"
          />
          <span
            >Link to the page:
            <a :href="`http://moderncitygroup.com/${translit}`"
              >http://moderncitygroup.com/{{ translit }}</a
            ></span
          >
        </div>
        <h3>Page content</h3>
        <TextEditor :id="`page-editor`" />
        <h2>SEO</h2>
        <div class="form-group">
          <label>Title</label>
          <input
            v-model="seo.title"
            type="text"
            class="form-control"
            placeholder="Title Page"
          />
        </div>
        <div class="form-group">
          <label>Description</label>
          <b-form-textarea
            v-model="seo.description"
            placeholder="Description"
            rows="3"
            max-rows="6"
          >
          </b-form-textarea>
        </div>
      </div>
      <a class="button button-primary">Publish</a>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    AdminBar: () => import('~/components/AdminBar'),
    TextEditor: () => import('~/components/TextEditor'),
  },
  data() {
    return {
      seo: {},
      link: '',
      title: '',
      translit: '',
      breadcrumbs: [
        {
          text: this.$t('pages.homePage.title'),
          to: '/',
        },
        {
          text: this.$t('pages.adminSettingsPage.cms', null, {
            id: this.id,
          }),
          active: true,
        },
      ],
    }
  },
  watch: {
    link() {
      this.transliterator(this.link.toLowerCase())
    },
  },
  mounted() {
    this.translit = `id${Math.floor(Math.random() * (9999999999 - 1 + 1)) + 1}`
  },
  methods: {
    transliterator(link) {
      const a = {
        Ё: 'YO',
        Й: 'I',
        Ц: 'TS',
        У: 'U',
        К: 'K',
        Е: 'E',
        Н: 'N',
        Г: 'G',
        Ш: 'SH',
        Щ: 'SCH',
        З: 'Z',
        Х: 'H',
        Ъ: "'",
        ё: 'yo',
        й: 'i',
        ц: 'ts',
        у: 'u',
        к: 'k',
        е: 'e',
        н: 'n',
        г: 'g',
        ш: 'sh',
        щ: 'sch',
        з: 'z',
        х: 'h',
        ъ: "'",
        Ф: 'F',
        Ы: 'I',
        В: 'V',
        А: 'a',
        П: 'P',
        Р: 'R',
        О: 'O',
        Л: 'L',
        Д: 'D',
        Ж: 'ZH',
        Э: 'E',
        ф: 'f',
        ы: 'i',
        в: 'v',
        а: 'a',
        п: 'p',
        р: 'r',
        о: 'o',
        л: 'l',
        д: 'd',
        ж: 'zh',
        э: 'e',
        Я: 'Ya',
        Ч: 'CH',
        С: 'S',
        М: 'M',
        И: 'I',
        Т: 'T',
        Ь: "'",
        Б: 'B',
        Ю: 'YU',
        я: 'ya',
        ч: 'ch',
        с: 's',
        м: 'm',
        и: 'i',
        т: 't',
        ь: "'",
        б: 'b',
        ю: 'yu',
      }
      const word = link
        .split('')
        .map(function (char) {
          return a[char] || char
        })
        .join('')
      this.translit = word.replaceAll(' ', '-')
    },
  },
}
</script>
<style>
.bilder {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 30px;
}
</style>
