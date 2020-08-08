import React from 'react';
import { shallow } from 'enzyme';
import { THeadCellContentMemo } from '../THeadCellContent';
import { TResponseKeys } from '../../../App';

describe('THeadCellContentMemo', () => {
    const props = {
        content: 'id' as TResponseKeys,
        sortAsc: jest.fn(),
        sortDesc: jest.fn(),
        sortingKey: '',
        setSortingKey: jest.fn()
    };

    const { sortAsc, sortDesc, setSortingKey } = props;

    const wrapper = shallow(<THeadCellContentMemo {...props} />);

    describe('initial render', () => {
        test('not render <ArrowIcon />', () => {
            expect(wrapper.find('ArrowIcon.transform')).toHaveLength(0);
        });

        test('calls with first click', () => {
            wrapper.find('span').simulate('click');
            expect(sortAsc).toHaveBeenCalledTimes(1);
            expect(sortDesc).toHaveBeenCalledTimes(0);
            expect(setSortingKey).toHaveBeenCalledTimes(1);
        });
    });

    describe('render after click', () => {
        const nextProps = {
            ...props,
            sortingKey: 'id'
        };

        const wrapper = shallow(<THeadCellContentMemo {...nextProps} />);

        test('render <ArrowIcon /> after first click', () => {
            expect(wrapper.find('ArrowIcon.transform')).toHaveLength(1);
        });

        test('calls with second click', () => {
            wrapper.find('span').simulate('click');
            expect(sortAsc).toHaveBeenCalledTimes(1);
            expect(sortDesc).toHaveBeenCalledTimes(1);
            expect(setSortingKey).toHaveBeenCalledTimes(1);
        });

        test('render <ArrowIcon /> after second click', () => {
            expect(wrapper.find('ArrowIcon.transform')).toHaveLength(0);
            expect(wrapper.find('ArrowIcon')).toHaveLength(1);
        });

        test('calls with third click', () => {
            wrapper.find('span').simulate('click');
            expect(sortAsc).toHaveBeenCalledTimes(2);
            expect(sortDesc).toHaveBeenCalledTimes(1);
            expect(setSortingKey).toHaveBeenCalledTimes(1);
        });
    });
});
