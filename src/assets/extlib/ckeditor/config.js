/**
 * Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	
	config.language = 'ko';
	config.allowedContent = true;
	config.filebrowserImageUploadUrl = '';
    config.uploadUrl = '';
    
    config.contentsLanguage = 'ko';
    config.fontSize_defaultLabel = '12';
    config.font_names = 
    	'맑은 고딕; 돋움; 굴림; 궁서; 바탕;'
        + CKEDITOR.config.font_names;
    
    config.pasteFilter = null;
	
	config.extraPlugins = 'image2';
	config.removePlugins = 'image';
    
    config.line_height='100%;200%;300%;400%;500%;600%;700%;800%;900%;1000%;';
//    config.shiftEnterMode = CKEDITOR.ENTER_P;
//    config.enterMode = CKEDITOR.ENTER_BR;
    
    config.blockquoteStyle = {
		'border': '1px solid #DCDCDC',
		'margin-left': '0px',
		'margin-right': '0px',
		'padding-left': '20px',
		'padding-right': '20px',
		'border-left': '10px solid #DCDCDC'	
    };
    
    config.hrStyle = {
		'width': '100%',
		'border': '0',
		'border-top': '1px solid #DCDCDC',
		'visibility': 'visible',
		'position': 'initial'
    };
    	
    config.contentsCss='';
    
    config.coreStyles_italic = {
	    element: 'span',
	    attributes: { 'style': 'font-style: italic;' }
	};
    config.coreStyles_bold = {
	    element: 'span',
	    attributes: { 'style': 'font-weight: bold;' }
	};
    config.coreStyles_strike = {
	    element: 'span',
	    attributes: { 'style': 'text-decoration: line-through;' },
	    overrides: 'strike'
	};
    config.coreStyles_underline = {
	    element: 'span',
	    attributes: { 'style': 'text-decoration: underline;' }
	};
    
    config.toolbarGroups = [
		{ name: 'tools', groups: [ 'tools' ] },
		{ name: 'document', groups: [ 'document', 'mode', 'doctools' ] },
		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'colors', groups: [ 'colors' ] },
		{ name: 'paragraph', groups: [ 'align', 'list', 'indent', 'blocks', 'bidi', 'paragraph' ] },
		{ name: 'links', groups: [ 'links' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'forms', groups: [ 'forms' ] },
		{ name: 'emoji', groups: [ 'emoji' ] },
		{ name: 'others', groups: [ 'others' ] },
		{ name: 'about', groups: [ 'about' ] }
	];
    
    config.removeButtons = 'Format,RemoveFormat,CopyFormatting,Language,Save,NewPage,Print,CreateDiv,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Select,Button,HiddenField,Anchor,Flash,Smiley,Iframe,About,save-to-pdf,Templates,Redo,Subscript,Superscript,JustifyBlock,Outdent,Indent,BidiLtr,BidiRtl,Unlink,HKemoji,Cut,ShowBlocks,Undo,Styles,SpecialChar,Mailsign';

};

