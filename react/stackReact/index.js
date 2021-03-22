// 使用jsx语法编译
// https://juejin.cn/post/6903864544880230407
function createElement(type, props, ...children) {
    return {
        type, 
        props: {
            ...props, 
            // 这里的children可能是一个text节点
            children: children.map(child => 
                typeof child === 'object'
                ? child
                : createTextElement(child)
            ),
        }
    }
}
class Component {
    constructor(props) {
        this.props = props;
        this.state = {};
    }
    setState(newState) {
        Object.assign(this.state, newState);
        renderComponent(this);
    }
}
function renderComponent(component) {
    let vdom = component.render();
    let node = createDomFromVdom(vdom);
    if (component.$root) {
        component.$root.parentNode.replaceChild(node, component.$root);
    }
    component.$root = node;
}
function render(element, container) {
    let dom = createDomFromVdom(element);
    container.appendChild(dom);
}
// render函数，将生成的element节点挂载到container上
function createDomFromVdom(element, container){
    if (element.type === 'TEXT_ELEMENT') {
       // text节点
       let dom = document.createElement(element.props.nodeValue);
       return dom;
    } else if (typeof element.type === 'function') {
        const props = Object.assign({}, element.props);
        // class component 和 function component
        if (Component.isPrototypeOf(element.type)) {
            // class component是从Component继承过来的，此时的type是一个原型为Component的函数
            const instance = new (element.type)(props);
            let vdom = instance.render();
            let dom = createDomFromVdom(vdom);
            instance.$root = dom;
            return dom;
        } else {
            // function component
            let vdom = element.type(props);
            let dom = createDomFromVdom(vdom);
            return dom
        }
    } else {
        // 普通的组件
        const dom = document.createElement(element.type);
        // 添加属性
        setAttribute(dom.props, dom)
        // 递归渲染
        Object.keys(element).filter(key => key !== 'children').forEach(child => render(child, dom));
        return dom;
    }
}
function setAttribute(props, dom) {
    // 给node节点设置attrs
    // 首先要过滤掉children
    Object.keys(props).filter(key => key !== 'children').forEach(name => {
        // 绑定事件
        if (name.startsWith('on')) {
            dom.addEventListener(name.slice(2).toLowerCase(), props[name]);
        } else {
            dom[name] = props[name];
        }
    })
}
// 创建一个text节点
function createTextElement(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: [];
        }
    }
}

// test
const element = (
    <div id='foo'>
        <span></span>
        text
    </div>
)
