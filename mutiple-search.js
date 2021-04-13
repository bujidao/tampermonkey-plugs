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
    } else {
      doBingRules()
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
        cn: '百度一下',
        en: 'baidu',
        url: 'https://www.baidu.com/s?wd='
      }
    ]

    var searchBtnWrapper = document.getElementById('est_switch')
    searchBtnWrapper.style.width = 'auto'
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
      engineItemDom.className = 'est_unselected_after'
      // style
      var aEstUnselectedDom = document.querySelector('#est_en')
      var aEstUnselectedDomStyleList = getComputedStyle(aEstUnselectedDom)
      for(var i = 0; i < aEstUnselectedDomStyleList.length; i++) {
        var key = aEstUnselectedDomStyleList[i]
        var value = aEstUnselectedDomStyleList.getPropertyValue(key)
        if (value) {
          engineItemDom.style[key] = value
        }
      }
      engineItemDom.style.width = 'auto'
      engineItemDom.style.color = '#fff'
      engineItemDom.style['-webkit-text-fill-color'] = ''
      engineItemDom.style['text-shadow'] = 'none'
      engineItemDom.style['z-index'] = '-2 !important'
      engineItemDom.style.zIndex = '-2 !important'
      engineItemDom.style['margin-left'] = '2px'
      // style after
      var aEstUnselectedDomAfterStyleStrint = '.est_unselected_after::after{'
      var aEstUnselectedDomAfterStyleList = getComputedStyle(aEstUnselectedDom, '::after')
      for(var j = 0; j < aEstUnselectedDomAfterStyleList.length; j++) {
        var key2 = aEstUnselectedDomAfterStyleList[j]
        var value2 = aEstUnselectedDomAfterStyleList.getPropertyValue(key2)
        if (value2) {
          aEstUnselectedDomAfterStyleStrint += key2 + ':' + value2 + ';'
        }
      }
      aEstUnselectedDomAfterStyleStrint += 'width: auto;color: #fff;z-index: -2 !important;background-image:linear-gradient(to right,rgb(39,92, 230), rgb(59,184,244));}'
      var styleDom = document.createElement('style')
      styleDom.innerHTML = aEstUnselectedDomAfterStyleStrint
      // event
      engineItemDom.addEventListener('click', function () {
        window.location.href = engine.url + keyWords
      }, true)
      // append
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
