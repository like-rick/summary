// https://juejin.cn/post/6888919751004880910#heading-2
let lastDepBox = [];
let lastClearCallbacks = [];
let index = 0;
function useEffect(callback, dep){
    const lastDep = lastDepBox[index];
    let isChanged = 
        lastDep // 首次执行肯定渲染
        || !dep // 不传依赖数组，每次都更新
        || dep.some((dep, idx) => dep != lastDepBox[index]) // 如果依赖数组中有一个变化了
    if (isChanged) {
        lastDepBox[index] = dep;
        if (lastClearCallbacks[index]){
            lastClearCallbacks[index]();
        }
        lastClearCallbacks[index] = callback();
    }
    index++;

}