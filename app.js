// const state = {
//     counter: 0
// }

const counterReducer = (state = { counter: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                counter: state.counter + 1
            };
        case 'DECREMENT':
            return {
                counter: state.counter - 1
            }
        default:
            return { ...state };
    }
}

const createStore = (reducer) => {
    let state = reducer(undefined, { type: 'INIT' });
    let listeners = [];

    return {
        addListener: (listener) => {
            listeners.push(listener);

            return () => {
                listeners = listeners.filter(listener1 => listener1 !== listener);
            }
        },

        dispatch: (action) => {
            state = reducer(state, action);

            listeners.forEach(listener => listener({...state}));
        }
    };
}

const store = createStore(counterReducer);

document.getElementById('incrementButton').addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT' });
});

document.getElementById('decrementButton').addEventListener('click', () => {
    store.dispatch({ type: 'DECREMENT' });
});

store.addListener((data) => console.log(data));

const counterEl = document.getElementById('counter');

store.addListener(({counter}) => {
    counterEl.textContent = counter;
});
