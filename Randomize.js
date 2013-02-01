var selection;

Array.prototype.shuffle = function() {
    var i = this.length;
    if (i == 0) return this;
    while (--i) {
        var j = Math.floor(Math.random() * (i + 1 ));
        var a = this[i];
        var b = this[j];
        this[i] = b;
        this[j] = a;
    }
    return this;
};

String.prototype.shuffle = function () {
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

function getSelectionHtml() {
    var html = "";
    if (typeof window.getSelection != "undefined") {

        selection = window.getSelection();

        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {

        selection = document.selection;

        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }

    return html;
}

function randomize() {
    html = getSelectionHtml();

    if (html == "") {
        alert("Please select some text first!");
        return;
    }

    node = selection.anchorNode.parentNode;

    strings = html.split(' ').shuffle();
    for (var i = strings.length - 1; i >= 0; i--) {
        strings[i] = strings[i].shuffle();
    };

    node.innerHTML = node.innerHTML.replace(html, strings.join(' '));
}