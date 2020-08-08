import React from 'react';
import { shallow } from 'enzyme';
import { Dropdown } from '../Dropdown';
import { RowAdditionFormMemo } from '../../RowAdditionForm';
import { TResponseKeys } from '../../../App';

describe('Dropdown', () => {
    const formProps = {
        allHeaders: ['id', 'firstName', 'lastName', 'phone'] as TResponseKeys[],
        handleSubmit: jest.fn()
    };
    const props = {
        button: <button className="dropdown-button">Нажми</button>,
        children: <RowAdditionFormMemo {...formProps} />
    };

    const wrapper = shallow(<Dropdown {...props} />);

    test('should render', () => {
        expect(wrapper).toBeDefined();
        expect(wrapper.find('.dropdown-button').isEmptyRender()).toBeFalsy();
        expect(wrapper.find('Memo(RowAdditionForm)').isEmptyRender());
    });

    test('render after button click', () => {
        wrapper.find('.container div').simulate('click');
        expect(wrapper.find('Memo(RowAdditionForm)').isEmptyRender()).toBeFalsy();
    });

    test('render after list click', () => {
        wrapper.find('.list').simulate('click');
        expect(wrapper.find('Memo(RowAdditionForm)').isEmptyRender());
    });

    test('render after submit', () => {
        wrapper.find('.container div').simulate('click');
        wrapper.find('.list').simulate('submit', {
            preventDefault: () => {}
        });
        expect(wrapper.find('Memo(RowAdditionForm)').isEmptyRender());
    });
});
