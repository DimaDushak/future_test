import React from 'react';
import { shallow } from 'enzyme';
import { SearchForm } from '../SearchForm';

describe('SearchForm', () => {
    const wrapper = shallow(<SearchForm handleFilter={() => {}} />);
    const string = '125';

    test('should render (snapshot)', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('render after onChange', () => {
        wrapper.find('input').simulate('change', {
            currentTarget: {
                value: string
            }
        });

        expect(wrapper).toMatchSnapshot();
    });
});
