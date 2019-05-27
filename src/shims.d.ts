declare module '!!raw-loader!*' {
  const contents: string;
  export = contents;
}

declare module 'vue-clamp' {
  import { Vue } from 'vue/types/vue';
  import { VueClass } from 'vue-class-component/lib/declarations';
  const contents: VueClass <Vue>;
  export default contents;
}
