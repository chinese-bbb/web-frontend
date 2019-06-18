import { shallowMount } from '@vue/test-utils';
import Logo from '@/components/logo.vue';

describe('Logo.vue', () => {
  it('renders props.msg when passed', () => {
    const svgSrc = 'new message';
    const wrapper = shallowMount(Logo, {
      propsData: { svgSrc },
    });
    expect(wrapper.text()).toMatch(svgSrc);
  });
});
