// 实现一个useState
// https://juejin.cn/post/6844903990958784526#heading-21
let memorizedState = [];
let idx = 0 
function useState(initial) {
    memorizedState[idx] = memorizedState[idx] || initial;
    function setState(currentVal) {
        memorizedState[idx] = currentVal;
        idx = 0;
        render(<App />, document.getElementById('root'));
    }
    return [memorizedState[idx++], setState]
}

