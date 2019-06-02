import { FunctionalComponentOptions } from 'vue';

const definition: FunctionalComponentOptions<Record<never, any>, never[]> = {
  functional: true,
  render(createElement, context) {
    const data = {
      props: {
        name: 'fade',
        mode: 'out-in',
      },
    };
    return createElement('transition', data, context.children);
  },
};

export default definition;
