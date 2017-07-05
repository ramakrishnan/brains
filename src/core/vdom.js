let masterObj;
module.exports = () => {
    return {
        updateDOM: ($root, template) => {
            let dom = document.createElement('div');
            dom.innerHTML = template;
            let domObj = buildObject(document.createTreeWalker(dom.firstChild, NodeFilter.SHOW_ELEMENT, null, true).root);
            if (masterObj) {
                updateElement($root.firstChild, domObj, masterObj);
            } else {
                updateElement($root, domObj);
            }
            if (masterObj === undefined) {
                masterObj = domObj;
            }
        }
    }
};

let buildObject = (element) => {
    if (element.childNodes) {
        let childObjects = [];
        for (let i = 0; i < element.childNodes.length; i++) {
            let childNode = element.childNodes[i]
            if (childNode.nodeType === 3) {
                childObjects.push(childNode.data)
            } else {
                childObjects.push(buildObject(childNode));
            }
        }
        return { type: element.nodeName, props: elementProperties(element), children: childObjects }
    }
}

let elementProperties = (element) => {
    let props = {};
    let attributes = element.attributes;
    for(let i = 0; i < attributes.length ; i++) {
        let data = attributes[i];
        props[data.name] = data.value;
    }
    return props;
}

let createElement = (node) => {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }
    
    const $el = document.createElement(node.type);
    for(let prop in node.props) {
        $el.setAttribute(prop, node.props[prop]);
    }
    node.children
        .map(createElement)
        .forEach($el.appendChild.bind($el));
    return $el;
};

let changed = (node1, node2) => {
    return typeof node1 !== typeof node2 ||
        typeof node1 === 'string' && node1 !== node2 ||
        node1.type !== node2.type
}

let updateElement = ($parent, newNode, oldNode, index) => {
    if (!index) {
        index = 0;
    }
    if (!oldNode) {
        $parent.appendChild(
            createElement(newNode));
    } else if (!newNode) {
        let parent = $parent;
        if (parent.parentElement) {
            parent.parentElement.removeChild(
                parent);
        }
    } else if (changed(newNode, oldNode)) {
        let parent = $parent;
        if ($parent.nodeType === 3) {
            $parent.parentElement.replaceChild(
                createElement(newNode),
                $parent);
        } else {
            $parent.parentElement.replaceChild(
                createElement(newNode),
                $parent);
        }
    } else if (newNode.type) {
        const newLength = newNode.children.length;
        const oldLength = oldNode.children.length;
        for (let i = 0;
            (i < oldLength || i < newLength); i++) {
            let parent;
            if ($parent && $parent.childNodes[i]) {
                parent = $parent.childNodes[i]
            }
            let j = 0;
            while (parent === undefined && j < $parent.childNodes.length) {
                parent = $parent.childNodes[i - j++];
            }
            if (parent) {
                updateElement(parent, newNode.children[i], oldNode.children[i], i);
            }
        }
    }
}

