// ==UserScript==
// @name         danbooru tags
// @updateURL    https://raw.githubusercontent.com/hoppo-chan/danbooru_tags/main/danbooru_tags.user.js
// @downloadURL  https://raw.githubusercontent.com/hoppo-chan/danbooru_tags/main/danbooru_tags.user.js
// @version      2024-03-08
// @description  快速获取danbooru的tag帮助你更好的使用novelai
// @author       星空喵
// @match        https://danbooru.donmai.us/posts/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=donmai.us
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 创建悬浮窗口元素
    const floatWindow = document.createElement('div');
    floatWindow.style.cssText = 'position:fixed; top:0; right:0; width:5px; height:60px; background:#000; opacity:0.1; z-index:9999; transition:opacity 0.3s;';
    floatWindow.className = 'custom-float-window';

    // 创建展开的菜单
    const menu = document.createElement('div');
    menu.style.cssText = 'display:none; position:absolute; top:0; right:5px; width:300px; background:#fff; padding:10px; box-shadow:0 0 5px rgba(0,0,0,0.2);';
    menu.className = 'custom-float-menu';

    // 添加输入框和按钮
    const input = document.createElement('textarea');
    input.style.cssText = 'width:100%; height:150px; margin-bottom:10px;';
    input.className = 'custom-input';

    const button = document.createElement('button');
    button.textContent = '获取';
    button.style.cssText = 'display:block; width:100px; margin:0 auto;';
    button.className = 'custom-button';

    menu.appendChild(input);
    menu.appendChild(button);
    floatWindow.appendChild(menu);
    document.body.appendChild(floatWindow);

    // 悬浮窗口的鼠标悬停和离开事件
    floatWindow.addEventListener('mouseenter', function() {
        this.style.opacity = '1';
        menu.style.display = 'block';
    });

    floatWindow.addEventListener('mouseleave', function() {
        this.style.opacity = '0.1';
        menu.style.display = 'none';
    });

    // 按钮点击事件
    button.addEventListener('click', function() {
        const artistTags = Array.from(document.querySelectorAll('.artist-tag-list li')).map(li => 'artist:' + li.getAttribute('data-tag-name')).join(',');
        const copyrightTags = Array.from(document.querySelectorAll('.copyright-tag-list li')).map(li => li.getAttribute('data-tag-name')).join(',');
        const characterTags = Array.from(document.querySelectorAll('.character-tag-list li')).map(li => li.getAttribute('data-tag-name')).join(',');
        const generalTags = Array.from(document.querySelectorAll('.general-tag-list li')).map(li => li.getAttribute('data-tag-name')).join(',');
        const metaTags = Array.from(document.querySelectorAll('.meta-tag-list li')).map(li => li.getAttribute('data-tag-name')).join(',');

        const tags = [artistTags, copyrightTags, characterTags, generalTags, metaTags].filter(tag => tag).join(',');
        input.value = tags;
    });
})();
