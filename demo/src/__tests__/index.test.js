import React from 'react';
import Input from '../index';

describe('<Input />', () => {
  it('should render an input', () => {
    const wrapper = shallow(<Input type="text" />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveProp('type', 'text');
  });
});
