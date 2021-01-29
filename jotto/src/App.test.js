import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from '../test/testUtils';
import App from './App';

const setup = (state = {}) => {
    const store = storeFactory(state);
    const wrapper = shallow(<App store={store} />).dive().dive();
    return wrapper;
}

describe('redux properties', () => {
    describe('word has not been guessed', () => {
        let wrapper;
        beforeEach(() => {
            const initialState = { success: false };
            wrapper = setup(initialState);
        });
        test('renders component without error', () => {
            const component = findByTestAttr(wrapper, "component-input");
            expect(component.length).toBe(1);
        });
        test('renders input box', () => {
            const inputBox = findByTestAttr(wrapper, "input-box");
            expect(inputBox.length).toBe(1);
        });
        test('renders submit button', () => {
            const submitButton = findByTestAttr(wrapper, "submit-button");
            expect(submitButton.length).toBe(1);
        });
    });
    describe('word has been guessed', () => {
        let wrapper;
        beforeEach(() => {
            const initialState = { success: true };
            wrapper = setup(initialState);
        });
        test('renders component without error', () => {
            const component = findByTestAttr(wrapper, "component-input");
            expect(component.length).toBe(1);
        });
        test('does not render input box', () => {
            const inputBox = findByTestAttr(wrapper, "input-box");
            expect(inputBox.length).toBe(0);
        });
        test('does not render submit button', () => {
            const submit = findByTestAttr(wrapper, "submit-button");
            expect(submit.length).toBe(0);
        });
    });
});

describe('redux props', () => {
    test('has success piece of state of prop', () => {
        const success = true;
        const wrapper = setup({ success });
        const successProp = wrapper.instance().props.success;
        expect(successProp).toBe(success);
    });
    test('`guessWord` action creator is a function prop', () => {
        const wrapper = setup();
        const guessWordProp = wrapper.instance().props.guessWord;
        expect(guessWordProp).toBeInstanceOf(Function);
    });
});