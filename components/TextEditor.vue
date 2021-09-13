<template>
  <div>
    <client-only placeholder="Loading...">
      <div :id="id" class="editor-fields"></div>
    </client-only>
  </div>
</template>

<script>
let EditorJS = null
let DragDrop = null
// let ImageTool = null
let HeaderTool = null
let ListTool = null
let MarkerTool = null
let LinkTool = null
let DelimiterTool = null
// let TableTool = null
let WarningTool = null
let ParagraphTool = null
let Hyperlink = null
let Quote = null
let Table = null
let InlineImage = null
// let SimpleImage = null

let editor

if (process.client) {
  InlineImage = require('editorjs-inline-image')
  EditorJS = require('@editorjs/editorjs')
  DragDrop = require('editorjs-drag-drop')
  // ImageTool = require('@editorjs/image')
  HeaderTool = require('@editorjs/header')
  ListTool = require('@editorjs/list')
  MarkerTool = require('@editorjs/marker')
  LinkTool = require('@editorjs/link')
  DelimiterTool = require('@editorjs/delimiter')
  // TableTool = require('@editorjs/table')
  WarningTool = require('@editorjs/warning')
  ParagraphTool = require('@editorjs/paragraph')
  Hyperlink = require('editorjs-hyperlink')
  Quote = require('@editorjs/quote')
  Table = require('editorjs-table')
  // SimpleImage = require('@editorjs/simple-image')
}
export default {
  name: 'VueEditorJs',
  props: {
    id: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
      default: '',
    },
    handlerByFile: {
      type: String,
      required: false,
      default: `${process.env.API_DOMAIN}/api/v1/handler/image/page`,
    },
    handlerByURL: {
      type: String,
      required: false,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: 'New paragraph',
    },
  },
  mounted() {
    if (EditorJS) {
      editor = new EditorJS({
        holder: this.id || 'editorjs',
        onReady: () => {
          // eslint-disable-next-line no-new
          new DragDrop(editor)
        },
        data: this.content ? JSON.parse(this.content) : {},
        tools: {
          table: {
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 3,
            },
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+O',
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: "Quote's author",
            },
          },
          hyperlink: {
            class: Hyperlink,
            config: {
              shortcut: 'CMD+L',
              target: '_blank',
              rel: 'nofollow',
              availableTargets: ['_blank', '_self'],
              availableRels: ['author', 'noreferrer'],
              validate: false,
            },
          },
          header: {
            class: HeaderTool,
          },
          list: {
            class: ListTool,
          },
          marker: {
            class: MarkerTool,
          },
          link: {
            class: LinkTool,
          },
          delimiter: {
            class: DelimiterTool,
          },
          warning: {
            class: WarningTool,
          },
          paragraph: {
            class: ParagraphTool,
          },
          image: {
            class: InlineImage,
            inlineToolbar: true,
            config: {
              unsplash: {
                appName: 'your_app_name',
                clientId: 'your_client_id',
              },
            },
          },
          // image: {
          //   class: ImageTool,
          //   config: {
          //     endpoints: {
          //       byFile: this.handlerByFile || null,
          //       byUrl: this.handlerByURL || null,
          //     },
          //     field: 'image',
          //     types: 'image/*',
          //     additionalRequestHeaders: {
          //       authorization: `Bearer ${
          //         this.$store.getters['user/currentUser'].access_token || ''
          //       }`,
          //     },
          //   },
          // },
        },
        placeholder: this.placeholder,
      })
    }
  },
  methods: {
    saveEditor() {
      editor
        .save()
        .then((outputData) => console.log(outputData))
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err))
    },
  },
}
</script>
<style>
.editor-fields svg {
  stroke-width: 0;
  color: #0097fb;
}
.editor-fields {
  padding: 10px;
}
.ce-toolbar__settings-btn {
  background: none;
}
.ce-block__content {
  color: #000 !important;
  width: 100% !important;
  max-width: 100% !important;
}
.ce-toolbar__content {
  max-width: 100% !important;
}

.codex-editor__redactor {
  padding-bottom: 20px !important;
  min-height: 100px;
  border-radius: 10px;
  background: rgb(255, 255, 255);
  width: 100% !important;
}
.ce-toolbar__actions {
}
.ce-header {
  text-transform: uppercase;
  padding: 10px;
  margin-bottom: 5px;
}
.ce-paragraph {
  color: #000;
  padding: 10px;
  width: 100% !important;
  /* width: 500px !important; */
}
.ce-block__content:hover {
  background: rgb(240, 247, 250);
}
</style>
