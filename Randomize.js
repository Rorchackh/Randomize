var Randomizer = {
    selection : undefined,
    __SPACE__ : " ",

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

        return this;
    },

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

    performShuffe : function (node) {

        strings = node.wholeText.split(this.__SPACE__ ).shuffle();
        for(var i = strings.length - 1; i >= 0; i--) {
            strings[i] = strings[i].shuffle();
        };

        node.nodeValue = node.nodeValue.replace(node.nodeValue, strings.join(this.__SPACE__));

    },

    // The following functions are used to get the all nodes involved in the selection
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

function test() {
    var r = Object.create(Randomizer);
    r.init().randomize();
}
