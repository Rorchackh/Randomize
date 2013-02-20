/**
 * The Polyfill hack
 *
 * This hack is used to enabled Object.create() in older 
 * browser that do now support such functionality.
 * 
 */
if (!Object.create) {
    Object.create = function (o) {
        if (arguments.length > 1) {
            throw new Error('Object.create implementation only accepts the first parameter.');
        }
        function F() {}
        F.prototype = o;
        return new F();
    };
}

/**
 * 
 * All the logic behind this bookmarklet is contained
 * withing the following single object.
 * 
 * @type Randomizer
 */
var Randomizer = {

    /**
     * The selection varible the node/text ranges
     * selected by the user.
     *
     * @type {Selection}
     * 
     */
    selection : undefined,

    /**
     * Just a simple varibale used instead of hardcoding spaces.
     * 
     * @type {String}
     */
    __SPACE__ : " ",

    /**
     * The init method is used to add shuffling methods
     * to both arrays and string. The shuffling is based on 
     * Fisher-Yates. Awesome examples and credit goes to 
     * 
     * http://sedition.com/perl/javascript-fy.html
     * and
     * http://stackoverflow.com/a/3943985/495416
     * 
     * @return {Randomizer} the current object
     */
    init: function () {

        Array.prototype.shuffle = function() {
            var i = this.length;
            if(i == 0) return this;
            while(--i) {
                var j = Math.floor(Math.random() * (i + 1));
                var a = this[i];
                var b = this[j];
                this[i] = b;
                this[j] = a;
            }
            return this;
        };

        String.prototype.shuffle = function() {
            var a = this.split(""),
                n = a.length;

            for(var i = n - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var tmp = a[i];
                a[i] = a[j];
                a[j] = tmp;
            }
            return a.join("");
        }

        return this;
    },

    /**
     * This is the main function of this scripts
     *
     * By lunching this function, the script starts the shuffling process
     * 
     */
    randomize: function () {

        if (!Array.prototype.shuffle) {
            this.init();
        }

        nodes = this.getSelectedNodes();
        console.log(nodes);
        if (nodes.length == 0) {
            alert("Please select some text");
            return;
        }
        
        for (var i = nodes.length - 1; i >= 0; i--) {
            this.traverseRecursively(nodes[i]);
        };
    },

    /**
     * Tranverse the DOM tree recursively start with {obj} as root
     * 
     * @param  {Node} obj the node at which the traversal starts
     */
    traverseRecursively : function (obj) {

        var obj = obj || document.getElementsByTagName('body')[0];
        if (obj.hasChildNodes()) {
            var child = obj.firstChild;
            while (child) {
                if (child.nodeName.toLowerCase() != 'script') {

                    if (child.nodeType === 1) {
                        this.traverseRecursively(child);
                    } else if (child.nodeType === 3) {
                        this.performShuffe(child);
                    }                
                }

                child = child.nextSibling;
            }
        } else if (obj.nodeType === 3) {
            this.performShuffe(obj);
        }

    }, 

    /**
     * Given a certain node, this function shuffles both its words and letters
     * 
     * @param  {Node} node 
     * 
     */
    performShuffe : function (node) {

        strings = node.wholeText.split(this.__SPACE__ ).shuffle();
        for(var i = strings.length - 1; i >= 0; i--) {
            strings[i] = strings[i].shuffle();
        };

        node.nodeValue = node.nodeValue.replace(node.nodeValue, strings.join(this.__SPACE__));

    },

    /**
     * Return the next sibling of the given node
     * 
     * @param  {Node} node 
     * 
     * @return {Node}      sibling
     */
    nextNode: function (node) {
        if (node.hasChildNodes()) {
            return node.firstChild;
        } else {
            while (node && !node.nextSibling) {
                node = node.parentNode;
            }
            if (!node) {
                return null;
            }
            return node.nextSibling;
        }
    },

    /**
     * Select nodes selected by the user at a certain range
     *
     * Credit to this amazing function goes to
     *
     * http://stackoverflow.com/a/7784176/495416
     * 
     * @param  {Range} range The range of selection
     * 
     * @return {Array}       A list of node in the range matched
     */
    getRangeSelectedNodes: function (range) {
        var node = range.startContainer;
        var endNode = range.endContainer;

        // Special case for a range that is contained within a single node
        if (node == endNode) {
            return [node];
        }

        // Iterate nodes until we hit the end container
        var rangeNodes = [];
        while (node && node != endNode) {
            rangeNodes.push( node = this.nextNode(node) );
        }

        // Add partially selected nodes at the start of the range
        node = range.startContainer;
        while (node && node != range.commonAncestorContainer) {
            rangeNodes.unshift(node);
            node = node.parentNode;
        }

        return rangeNodes;
    },

    /**
     * Returns an array of all nodes selected by the user
     *
     * Credit to this amazing function also goes to
     *
     * http://stackoverflow.com/a/7784176/495416
     * 
     * @return {Array}       A list of node matched
     */
    getSelectedNodes: function () {
        if (window.getSelection) {
            var sel = window.getSelection();
            if (!sel.isCollapsed) {
                return this.getRangeSelectedNodes(sel.getRangeAt(0));
            }
        }
        return [];
    }
};

/**
 * Lunching the bookmarklet
 * 
 */
var r = Object.create(Randomizer);
r.init().randomize();
