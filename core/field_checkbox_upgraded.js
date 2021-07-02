/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Checkbox field.  Checked or not checked.
 * @author fraser@google.com (Neil Fraser)
 */
 'use strict';

 goog.provide('Blockly.FieldCheckboxUpgraded');
 
 /** @suppress {extraRequire} */
 goog.require('Blockly.Events.BlockChange');
 goog.require('Blockly.Field');
 goog.require('Blockly.fieldRegistry');
 goog.require('Blockly.utils.dom');
 goog.require('Blockly.utils.object');
 
 
 /**
  * Class for a checkbox field.
  * @param {string|boolean=} opt_value The initial value of the field. Should
  *    either be 'TRUE', 'FALSE' or a boolean. Defaults to 'FALSE'.
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
 Blockly.FieldCheckboxUpgraded = function(opt_value, opt_validator, opt_config) {
   /**
    * Character for the check mark. Used to apply a different check mark
    * character to individual fields.
    * @type {?string}
    * @private
    */
   this.checkChar_ = null;
 
   Blockly.FieldCheckboxUpgraded.superClass_.constructor.call(
       this, opt_value, opt_validator, opt_config);
 };
 Blockly.utils.object.inherits(Blockly.FieldCheckboxUpgraded, Blockly.Field);
 
 /**
  * The default value for this field.
  * @type {*}
  * @protected
  */
 Blockly.FieldCheckboxUpgraded.prototype.DEFAULT_VALUE = false;
 
 /**
  * Construct a FieldCheckboxUpgraded from a JSON arg object.
  * @param {!Object} options A JSON object with options (checked).
  * @return {!Blockly.FieldCheckboxUpgraded} The new field instance.
  * @package
  * @nocollapse
  */
 Blockly.FieldCheckboxUpgraded.fromJson = function(options) {
   return new Blockly.FieldCheckboxUpgraded(options['checked'], undefined, options);
 };
 
 /**
  * Default character for the checkmark.
  * @type {string}
  * @const
  */
 Blockly.FieldCheckboxUpgraded.CHECK_CHAR = '\u2713';
 
 /**
  * Serializable fields are saved by the XML renderer, non-serializable fields
  * are not. Editable fields should also be serializable.
  * @type {boolean}
  */
 Blockly.FieldCheckboxUpgraded.prototype.SERIALIZABLE = true;
 
 /**
  * Mouse cursor style when over the hotspot that initiates editability.
  */
 Blockly.FieldCheckboxUpgraded.prototype.CURSOR = 'default';
 
 /**
  * Configure the field based on the given map of options.
  * @param {!Object} config A map of options to configure the field based on.
  * @protected
  * @override
  */
 Blockly.FieldCheckboxUpgraded.prototype.configure_ = function(config) {
   Blockly.FieldCheckboxUpgraded.superClass_.configure_.call(this, config);
   if (config['checkCharacter']) {
     this.checkChar_ = config['checkCharacter'];
   }
 };
 
 /**
  * Create the block UI for this checkbox.
  * @package
  */
 Blockly.FieldCheckboxUpgraded.prototype.initView = function() {
   Blockly.FieldCheckboxUpgraded.superClass_.initView.call(this);
 
   Blockly.utils.dom.addClass(
       /** @type {!SVGTextElement} **/ (this.textElement_), 'blocklyCheckbox');
   this.textElement_.style.display = this.value_ ? 'block' : 'none';
 };
 
 /**
  * @override
  */
 Blockly.FieldCheckboxUpgraded.prototype.render_ = function() {
   if (this.textContent_) {
     this.textContent_.nodeValue = this.getDisplayText_();
   }
   this.updateSize_(this.getConstants().FIELD_CHECKBOX_X_OFFSET);
 };
 
 /**
  * @override
  */
 Blockly.FieldCheckboxUpgraded.prototype.getDisplayText_ = function() {
   return this.checkChar_ || Blockly.FieldCheckboxUpgraded.CHECK_CHAR;
 };
 
 /**
  * Set the character used for the check mark.
  * @param {?string} character The character to use for the check mark, or
  *    null to use the default.
  */
 Blockly.FieldCheckboxUpgraded.prototype.setCheckCharacter = function(character) {
   this.checkChar_ = character;
   this.forceRerender();
 };
 
 /**
  * Toggle the state of the checkbox on click.
  * @protected
  */
 Blockly.FieldCheckboxUpgraded.prototype.showEditor_ = function() {
   this.setValue(!this.value_);
 };
 
 /**
  * Ensure that the input value is valid ('TRUE' or 'FALSE').
  * @param {*=} opt_newValue The input value.
  * @return {?string} A valid value ('TRUE' or 'FALSE), or null if invalid.
  * @protected
  */
 Blockly.FieldCheckboxUpgraded.prototype.doClassValidation_ = function(opt_newValue) {
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
 Blockly.FieldCheckboxUpgraded.prototype.doValueUpdate_ = function(newValue) {
   this.value_ = this.convertValueToBool_(newValue);
   // Update visual.
   if (this.textElement_) {
     this.textElement_.style.display = this.value_ ? 'block' : 'none';
   }
 };
 
 /**
  * Get the value of this field, either 'TRUE' or 'FALSE'.
  * @return {string} The value of this field.
  */
 Blockly.FieldCheckboxUpgraded.prototype.getValue = function() {
   return this.value_ ? 'TRUE' : 'FALSE';
 };
 
 /**
  * Get the boolean value of this field.
  * @return {boolean} The boolean value of this field.
  */
 Blockly.FieldCheckboxUpgraded.prototype.getValueBoolean = function() {
   return /** @type {boolean} */ (this.value_);
 };
 
 /**
  * Get the text of this field. Used when the block is collapsed.
  * @return {string} Text representing the value of this field
  *    ('true' or 'false').
  */
 Blockly.FieldCheckboxUpgraded.prototype.getText = function() {
   return String(this.convertValueToBool_(this.value_));
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
 Blockly.FieldCheckboxUpgraded.prototype.convertValueToBool_ = function(value) {
   if (typeof value == 'string') {
     return value == 'TRUE';
   } else {
     return !!value;
   }
 };
 
 Blockly.fieldRegistry.register('field_checkbox_upgraded', Blockly.FieldCheckboxUpgraded);
 