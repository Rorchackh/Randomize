## Randomize

A small Bookmarklet that randomizes the selected text on a webpage.

This bookmarlet can be used in a variety of situations. For example, you might want to take a screenshot from the browser but hide some personal information. This is a an easy-to-use replacement to bluring part of the page or resorting to the inspector/firebug.

## How to use

To install as a bookmarklet, use the following javascript code in a bookmark URL:

    javascript: (function () {var jsCode = document.createElement('script'); jsCode.setAttribute('src', 'https://raw.github.com/Rorchackh/Randomize/master/Randomize.min.js');document.body.appendChild(jsCode);}());

This [link](http://www.wikihow.com/Add-a-Bookmark-in-Safari) explains how to add a new bookmark on Safari 5. The procedure in other browsers should be roughly the same.

## Copyright and license

Copyright 2012 Ayoub Khobalatte.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this work except in compliance with the License. You may obtain a copy of the License in the LICENSE file, or at:

  [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
