Randomize
=========
A small Bookmarklet that randomizes the selected text on a webpage

How to use [Trial]
==========
Simply drag the link to your bookmark menu and you're good to go.
<a href="
    javascript: (function () {
        var jsCode = document.createElement('script');  
        jsCode.setAttribute('src', 'https://raw.github.com/Rorchackh/Randomize/develop/Randomize.js');
        document.body.appendChild(jsCode);
    }());
">Drag me</a>

To do
======
<ul>
    <li>Acknowledgements</li>
    <li>Fix empty spaces leading to shuffling of entire page</li>
</ul>