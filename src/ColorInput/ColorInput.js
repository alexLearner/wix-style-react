import React from 'react';
import { node, bool, string, func, oneOf } from 'prop-types';

import { polyfill } from 'react-lifecycles-compat';

import Input from '../Input';
import { Hash, ColorViewer } from './components';

import { validateHex, extractHex } from './hex-helpers';

class ColorInput extends React.Component {
  static displayName = 'ColorInput';

  static propTypes = {
    /** placeholder to display */
    placeholder: node,
    /** when set to true this component is disabled */
    disabled: bool,
    /** sets error state */
    error: bool,
    /** error message which appears in tooltip */
    errorMessage: node,
    /** input size */
    size: oneOf(['small', 'medium', 'large']),
    /** colorpicker popover placement */
    popoverPlacement: oneOf([
      'auto-start',
      'auto',
      'auto-end',
      'top-start',
      'top',
      'top-end',
      'right-start',
      'right',
      'right-end',
      'bottom-end',
      'bottom',
      'bottom-start',
      'left-end',
      'left',
      'left-start',
    ]),
    /** colorpicker popover calculation to a dom element */
    popoverAppendTo: oneOf(['window', 'scrollParent', 'viewport', 'parent']),
    /** input value */
    value: string.isRequired,
    /** returns confirmed value */
    onConfirm: func,
    /** returns last confirmed value which is props.value */
    onCancel: func,
    /** returns colorpicker change value */
    onPreview: func,
  };

  static defaultProps = {
    placeholder: 'Please choose a color',
    error: false,
    size: 'medium',
    popoverPlacement: 'bottom',
    popoverAppendTo: 'parent',
  };

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      value: '',
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.active && props.value !== state.value) {
      return {
        ...state,
        value: extractHex(props.value),
      };
    }
  }

  _renderPrefix = () => {
    const { disabled, size } = this.props;
    const { active, value } = this.state;
    const hash = (
      <Input.Affix>
        <Hash disabled={disabled} size={this._sizeMapping(size)} />
      </Input.Affix>
    );
    return active || value ? hash : undefined;
  };

  _renderSuffix = () => {
    const { value, active } = this.state;
    const { size, popoverPlacement, popoverAppendTo, disabled } = this.props;
    return (
      <ColorViewer
        value={value}
        active={active}
        disabled={disabled}
        size={this._sizeMapping(size)}
        placement={popoverPlacement}
        appendTo={popoverAppendTo}
        onClick={this.click}
        onChange={this._onPickerChange}
        onCancel={this.cancel}
        onConfirm={this.confirm}
        onClickOutside={this.confirm}
      />
    );
  };

  _sizeMapping = size => (size === 'medium' ? 'normal' : size);

  _onChange = evt => {
    const value = extractHex(evt.target.value);
    this.setState({
      value: value === '' ? '' : value,
    });
  };

  _onPickerChange = value => {
    const { onPreview } = this.props;
    const callback = onPreview && onPreview(value);
    this.setState({ value, active: true }, callback);
  };

  _onFocus = () => this.setState({ active: true });

  _keyDown = e => {
    e.key === 'Enter' && this.confirm();
    e.key === 'Escape' && this.cancel();
  };

  click = () => {
    this.input.focus();
    this.setState({ active: true });
  };

  confirm = () => {
    const { onConfirm } = this.props;
    const value = validateHex(this.state.value);
    const callback = () => onConfirm && onConfirm(value);
    this.setState({ active: false, value }, callback);
  };

  cancel = () => {
    const { onCancel } = this.props;
    const callback = () => onCancel && onCancel(this.props.value);
    this.setState({ value: this.props.value, active: false }, callback);
  };

  render() {
    const { placeholder, errorMessage, size, ...rest } = this.props;
    const { active, value } = this.state;
    const placeHolder = active ? undefined : placeholder;
    return (
      <Input
        {...rest}
        ref={input => (this.input = input)}
        status={this.props.error ? 'error' : undefined}
        statusMessage={errorMessage}
        placeholder={placeHolder}
        size={this._sizeMapping(size)}
        onKeyDown={this._keyDown}
        onChange={this._onChange}
        onFocus={this._onFocus}
        onInputClicked={this.click}
        value={value.replace('#', '')}
        prefix={this._renderPrefix()}
        suffix={this._renderSuffix()}
      />
    );
  }
}

polyfill(ColorInput);

export default ColorInput;
