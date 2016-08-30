"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function setInputSelection(e,t,n){if(e.focus(),"undefined"!=typeof e.selectionStart)e.selectionStart=t,e.selectionEnd=n;else if(document.selection&&document.selection.createRange){e.select();var a=document.selection.createRange();a.collapse(!0),a.moveEnd("character",n),a.moveStart("character",t),a.select()}}function makeSafePath(e){var t=_.split(_.trim(e),"/");return t=_.map(t,function(e){return _.kebabCase(_.deburr(_.trim(e)))}),_.join(_.filter(t,function(e){return!_.isEmpty(e)}),"/")}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),Alerts=function(){function e(){_classCallCheck(this,e);var t=this;t.mdl=new Vue({el:"#alerts",data:{children:[]},methods:{acknowledge:function(e){t.close(e)}}}),t.uidNext=1}return _createClass(e,[{key:"push",value:function(e){var t=this,n=_.defaults(e,{_uid:t.uidNext,class:"is-info",message:"---",sticky:!1,title:"---"});t.mdl.children.push(n),n.sticky||_.delay(function(){t.close(n._uid)},5e3),t.uidNext++}},{key:"pushError",value:function(e,t){this.push({class:"is-danger",message:t,sticky:!1,title:e})}},{key:"pushSuccess",value:function(e,t){this.push({class:"is-success",message:t,sticky:!1,title:e})}},{key:"close",value:function(e){var t=this,n=_.findIndex(t.mdl.children,["_uid",e]),a=_.nth(t.mdl.children,n);n>=0&&a&&(a.class+=" exit",t.mdl.children.$set(n,a),_.delay(function(){t.mdl.children.$remove(a)},500))}}]),e}();jQuery(document).ready(function(e){e("a").smoothScroll({speed:400,offset:-20});new Sticky(".stickyscroll");e(window).bind("beforeunload",function(){e("#notifload").addClass("active")}),e(document).ajaxSend(function(){e("#notifload").addClass("active")}).ajaxComplete(function(){e("#notifload").removeClass("active")});var t=new Alerts;if(alertsData&&_.forEach(alertsData,function(e){t.push(e)}),1===e("#mk-editor").length)var n=new SimpleMDE({autofocus:!0,autoDownloadFontAwesome:!1,element:e("#mk-editor").get(0),hideIcons:["heading","quote"],placeholder:"Enter Markdown formatted content here...",showIcons:["strikethrough","heading-1","heading-2","heading-3","code","table","horizontal-rule"],spellChecker:!1,status:!1});if(e("#page-type-view").length&&!function(){var t="home"!==e("#page-type-view").data("entrypath")?e("#page-type-view").data("entrypath")+"/":"",n=t+"new-page";e(".btn-create-prompt").on("click",function(a){e("#txt-create-prompt").val(n),e("#modal-create-prompt").toggleClass("is-active"),setInputSelection(e("#txt-create-prompt").get(0),t.length,n.length),e("#txt-create-prompt").removeClass("is-danger").next().addClass("is-hidden")}),e("#txt-create-prompt").on("keypress",function(t){13===t.which&&e(".btn-create-go").trigger("click")}),e(".btn-create-go").on("click",function(t){var n=makeSafePath(e("#txt-create-prompt").val());_.isEmpty(n)?e("#txt-create-prompt").addClass("is-danger").next().removeClass("is-hidden"):(e("#txt-create-prompt").parent().addClass("is-loading"),window.location.assign("/create/"+n))})}(),e("#page-type-create").length&&(e(".btn-create-discard").on("click",function(t){e("#modal-create-discard").toggleClass("is-active")}),e(".btn-create-save").on("click",function(a){e.ajax(window.location.href,{data:{markdown:n.value()},dataType:"json",method:"PUT"}).then(function(n,a,o){n.ok?window.location.assign("/"+e("#page-type-create").data("entrypath")):t.pushError("Something went wrong",n.error)},function(e,n,a){t.pushError("Something went wrong","Save operation failed.")})})),e("#page-type-edit").length&&(e(".btn-edit-discard").on("click",function(t){e("#modal-edit-discard").toggleClass("is-active")}),e(".btn-edit-save").on("click",function(a){e.ajax(window.location.href,{data:{markdown:n.value()},dataType:"json",method:"PUT"}).then(function(n,a,o){n.ok?window.location.assign("/"+e("#page-type-edit").data("entrypath")):t.pushError("Something went wrong",n.error)},function(e,n,a){t.pushError("Something went wrong","Save operation failed.")})})),e("#page-type-source").length){var a=ace.edit("source-display");a.setTheme("ace/theme/tomorrow_night"),a.getSession().setMode("ace/mode/markdown"),a.setReadOnly(!0),a.renderer.updateFull(),console.log(a.getSession().getLength())}});