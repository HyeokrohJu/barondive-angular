/*
 Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.

 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license

*/
(function(){CKEDITOR.plugins.add("placeholder",{requires:"widget,dialog",lang:"en,ko",icons:"placeholder",hidpi:!0,onLoad:function(){CKEDITOR.addCss(".cke_placeholder{background-color:#ff0}")},init:function(a){var b=a.lang.placeholder;CKEDITOR.dialog.add("placeholder",this.path+"dialogs/placeholder.js");a.widgets.add("placeholder",{dialog:"placeholder",pathName:b.pathName,template:'\x3cspan class\x3d"cke_placeholder"\x3e[[]]\x3c/span\x3e',downcast:function(){return new CKEDITOR.htmlParser.text("[["+
this.data.name+"]]")},init:function(){this.setData("name",this.element.getText().slice(2,-2))},data:function(){this.element.setText("[["+this.data.name+"]]")},getLabel:function(){return this.editor.lang.widget.label.replace(/%1/,this.data.name+" "+this.pathName)}});a.ui.addButton&&a.ui.addButton("CreatePlaceholder",{label:b.toolbar,command:"placeholder",toolbar:"insert,5",icon:"placeholder"})},afterInit:function(a){var b=/\[\[([^\[\]])+\]\]/g;a.dataProcessor.dataFilter.addRules({text:function(f,d){var e=
d.parent&&CKEDITOR.dtd[d.parent.name];if(!e||e.span)return f.replace(b,function(b){var c=null,c=new CKEDITOR.htmlParser.element("span",{"class":"cke_placeholder"});c.add(new CKEDITOR.htmlParser.text(b));c=a.widgets.wrapElement(c,"placeholder");return c.getOuterHtml()})}})}})})();