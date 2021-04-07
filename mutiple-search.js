// ==UserScript==
// @name         MutipleSearch
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://cn.bing.com/*
// @match        https://www.baidu.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  var urlMap = {
    test: '127.0.0.1',
    bing: 'cn.bing.com',
    baidu: 'www.baidu.com'
  }

  function run() {
    var currentUrl = window.location.hostname
    if (currentUrl == urlMap.bing) {
      doBingRules()
    } else if (currentUrl == urlMap.baidu) {
      setTimeout(function () {
        doBaiduRules()
      }, 0)
    }
  }

  var tabIndex = 1

  /**
   * bing
   * @returns
   */
  function doBingRules() {
    var engineList = [
      {
        cn: '百度',
        en: 'baidu',
        url: 'https://www.baidu.com/s?wd='
      }
    ]

    var searchBtnWrapper = document.getElementById('est_switch')
    if (!searchBtnWrapper && searchBtnWrapper.childElementCount === 2) {
      return
    }
    var keyWords = document.getElementById('sb_form_q').value
    for (var engine of engineList) {
      // html
      var engineItemDom = document.createElement('div')
      var id = 'est_' + engine.en
      engineItemDom.id = id
      engineItemDom.innerHTML = engine.cn
      engineItemDom.tabindex = tabIndex
      engineItemDom.ariaLabel = engine.cn
      // style
      var styleDom = document.createElement('style')
      var styleValue = "#est_baidu{position:relative;cursor: pointer;margin-left: 4px;display:inline-block;height:24px;line-height:25px;font-size:14px;text-align:center;padding:0 11px 0 12px;color:#fff;font-family:'Microsoft YaHei',Arial,Helvetica,sans-serif}#est_baidu::after{content:'';position:absolute;top:4px;right:0;bottom:0;left:0;z-index:-1;-webkit-transform:scale(1.1,1.3)perspective(.5em)rotateX(1.9deg);transform:scale(1.1,1.3)perspective(.5em)rotateX(1.9deg);-webkit-transform-origin:bottom left;transform-origin:bottom left;border-radius:2px 2px 0 0;background-image:linear-gradient(to right,rgb(39,92, 230), rgb(59,184,244));};"
      styleDom.innerHTML = styleValue
      tabIndex++
      // event
      engineItemDom.addEventListener('click', function () {
        window.location.href = engine.url + keyWords
      }, true)
      searchBtnWrapper.appendChild(engineItemDom)
      searchBtnWrapper.appendChild(styleDom)
    }
  };

  /**
   * 百度
   * @returns
   */
  function doBaiduRules() {
    var engineList = [
      {
        cn: 'Bing搜索',
        en: 'bing',
        url: 'https://cn.bing.com/search?q='
      }
    ]
    var searchBtnItem = document.getElementById('su')
    if (!searchBtnItem) {
      return
    }
    var keyWords = document.getElementById('kw').value
    for (var engine of engineList) {
      // html
      var engineItemDom = document.createElement('span')
      engineItemDom.className = 'bg s_btn_wr s_btn_bing'
      var engineItemDomInput = document.createElement('input')
      engineItemDomInput.type = 'submit'
      engineItemDomInput.id = engine.en
      engineItemDomInput.value = engine.cn
      engineItemDomInput.className = 'bg s_btn s_btn_bing'
      engineItemDom.appendChild(engineItemDomInput)
      // style
      var styleDom = document.createElement('style')
      var styleValue = ".wrapper_new .s_btn_wr .s_btn{border-radius: 0 !important;}.s_btn_bing {background-image:linear-gradient(to right,rgb(39,92, 230), rgb(59,184,244)) !important;border-radius: 0 10px 10px 0 !important;overflow: hidden;};"
      styleDom.innerHTML = styleValue
      // event
      engineItemDom.addEventListener('click', function () {
        window.location.href = engine.url + keyWords
      }, {
        once: true
      })
      document.getElementById('form').appendChild(engineItemDom)
      document.getElementById('form').appendChild(styleDom)
    }
  };

  window.onload = function () {
    run()
  }

})();
