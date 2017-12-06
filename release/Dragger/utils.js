export var int = function int(number) {
    if (number === '') {
        return 0;
    }
    return parseInt(number, 10);
};
export var innerWidth = function innerWidth(node) {
    var width = node.clientWidth;
    var computedStyle = node.style;
    width -= int(computedStyle.paddingLeft);
    width -= int(computedStyle.paddingRight);
    return width;
};

export var outerWidth = function outerWidth(node) {
    var width = node.clientWidth;
    var computedStyle = node.style;
    width += int(computedStyle.borderLeftWidth);
    width += int(computedStyle.borderRightWidth);
    return width;
};

export var innerHeight = function innerHeight(node) {
    var height = node.clientHeight;
    var computedStyle = node.style;
    height -= int(computedStyle.paddingTop);
    height -= int(computedStyle.paddingBottom);
    return height;
};

export var outerHeight = function outerHeight(node) {
    var height = node.clientHeight;
    var computedStyle = node.style;
    height += int(computedStyle.borderTopWidth);
    height += int(computedStyle.borderBottomWidth);
    return height;
};
export var parseBounds = function parseBounds(bounds) {
    return {
        left: -bounds.left,
        top: -bounds.top,
        right: bounds.right,
        bottom: bounds.bottom
    };
};

export var isNumber = function isNumber(things) {
    return typeof things === 'number' ? true : false;
};