/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Checkbox field. Filled or not filled.
 * @author l.meillier09@google.com (Léo Meillier) leomlr
 */
 'use strict';

 goog.provide('Blockly.FieldCheckboxColor');
 
 /** @suppress {extraRequire} */
 goog.require('Blockly.Events.BlockChange');
 goog.require('Blockly.Field');
 goog.require('Blockly.fieldRegistry');
 goog.require('Blockly.utils.object');
 
 
 /**
  * Class for a checkbox field.
  * @param {string|boolean=} opt_value The initial value of the field. Should
  *    either be 'TRUE', 'FALSE' or a boolean. Defaults to 'FALSE'.
  * @param {Object} opt_style The color filled in background field when chekbox is checked, height and width.
  * @param {Function=} opt_validator  A function that is called to validate
  *    changes to the field's value. Takes in a value ('TRUE' or 'FALSE') &
  *    returns a validated value ('TRUE' or 'FALSE'), or null to abort the
  *    change.
  * @param {Object=} opt_config A map of options used to configure the field.
  *    See the [field creation documentation]{@link https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/checkbox#creation}
  *    for a list of properties this parameter supports.
  * @extends {Blockly.Field}
  * @constructor
  */
  Blockly.FieldCheckboxColor = function(opt_value, opt_style, opt_validator, opt_config) {
     this.color_ = opt_style !== undefined ? opt_style.color : null;
     this.height_ = opt_style !== undefined ? opt_style.height : null;
     this.width_ = opt_style !== undefined ? opt_style.width : null;
     Blockly.FieldCheckboxColor.superClass_.constructor.call(
        this, opt_value, opt_validator, opt_config);
 };
 Blockly.utils.object.inherits(Blockly.FieldCheckboxColor, Blockly.Field);
  
 /**
  * The default value for this field.
  * @type {*}
  * @protected
  */
 Blockly.FieldCheckboxColor.prototype.DEFAULT_VALUE = false;
 
 /**
  * The default color for this background field.
  * @type {*}
  * @protected
  */
 Blockly.FieldCheckboxColor.prototype.DEFAULT_COLOR = 'rgb(250,15,15)';
 
 /**
  * The default size for this border rect in field.
  * @type {*}
  * @protected
  */
 Blockly.FieldCheckboxColor.prototype.DEFAULT_SIZE = 30;
  
 /**
  * Construct a FieldCheckboxUpgraded from a JSON arg object.
  * @param {!Object} options A JSON object with options (checked).
  * @return {!Blockly.FieldCheckboxColor} The new field instance.
  * @package
  * @nocollapse
  */
 Blockly.FieldCheckboxColor.fromJson = function(options) {
    return new Blockly.FieldCheckboxColor(options['checked'], undefined, options);
 };
  
 /**
  * Serializable fields are saved by the XML renderer, non-serializable fields
  * are not. Editable fields should also be serializable.
  * @type {boolean}
  */
 Blockly.FieldCheckboxColor.prototype.SERIALIZABLE = true;
  
 /**
  * Mouse cursor style when over the hotspot that initiates editability.
  */
 Blockly.FieldCheckboxColor.prototype.CURSOR = 'default';
  
 /**
  * Create the block UI for this checkbox.
  * @package
  */
 Blockly.FieldCheckboxColor.prototype.initView = function() {
     Blockly.FieldCheckboxColor.superClass_.initView.call(this);
     this.borderRect_.style.fill = this.value_ ? (this.color_ ? this.color_ : Blockly.FieldCheckboxColor.prototype.DEFAULT_COLOR) : 'white';
 };
  
 /**
  * @override
  */
 Blockly.FieldCheckboxColor.prototype.render_ = function() {
     this.size_.height = this.height_ || Blockly.FieldCheckboxColor.prototype.DEFAULT_SIZE;
     this.size_.width = this.width_ || Blockly.FieldCheckboxColor.prototype.DEFAULT_SIZE;
     this.borderRect_.setAttribute('width', this.size_.width);
     this.borderRect_.setAttribute('height', this.size_.height);
     this.borderRect_.setAttribute('rx', 8);
     this.borderRect_.setAttribute('ry', 4);
 };
  
 /**
  * Toggle the state of the checkbox on click.
  * @protected
  */
 Blockly.FieldCheckboxColor.prototype.showEditor_ = function() {
     this.setValue(!this.value_);
 };
  
 /**
  * Ensure that the input value is valid ('TRUE' or 'FALSE').
  * @param {*=} opt_newValue The input value.
  * @return {?string} A valid value ('TRUE' or 'FALSE), or null if invalid.
  * @protected
  */
 Blockly.FieldCheckboxColor.prototype.doClassValidation_ = function(opt_newValue) {
     if (opt_newValue === true || opt_newValue === 'TRUE') {
         return 'TRUE';
     }
     if (opt_newValue === false || opt_newValue === 'FALSE') {
         return 'FALSE';
     }
     return null;
 };
  
 /**
  * Update the value of the field, and update the checkElement.
  * @param {*} newValue The value to be saved. The default validator guarantees
  * that this is a either 'TRUE' or 'FALSE'.
  * @protected
  */
 Blockly.FieldCheckboxColor.prototype.doValueUpdate_ = function(newValue) {
     this.value_ = this.convertValueToBool_(newValue);
     // Update visual.
     if (this.textElement_) {
         this.textElement_.style.display = this.value_ ? 'block' : 'none';
     }
     if (this.borderRect_) {
         this.borderRect_.style.fill = this.value_ ? (this.color_ ? this.color_ : Blockly.FieldCheckboxColor.prototype.DEFAULT_COLOR) : 'white';
     }
 };
  
 /**
  * Get the value of this field, either 'TRUE' or 'FALSE'.
  * @return {string} The value of this field.
  */
 Blockly.FieldCheckboxColor.prototype.getValue = function() {
     return this.value_ ? 'TRUE' : 'FALSE';
 };
  
 /**
  * Convert a value into a pure boolean.
  *
  * Converts 'TRUE' to true and 'FALSE' to false correctly, everything else
  * is cast to a boolean.
  * @param {*} value The value to convert.
  * @return {boolean} The converted value.
  * @private
  */
 Blockly.FieldCheckboxColor.prototype.convertValueToBool_ = function(value) {
     if (typeof value == 'string') {
         return value == 'TRUE';
     } else {
         return !!value;
     }
 };
  
 Blockly.fieldRegistry.register('field_checkbox_color', Blockly.FieldCheckboxColor);