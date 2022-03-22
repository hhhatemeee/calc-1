import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import ScreenOther from '../ScreenOther/ScreenOther';
import { ReactComponent as Loader } from '../../img/Loader.svg';
import ConverterSwitch from './ConverterSwitch/ConverterSwitch';
import { CURRENCY_MOCK } from '../../variables';
import KeyBoardBasic from '../KeyBoardBasic/KeyBoardBasic';

import './Converter.scss';

const Converter = (props) => {
  useEffect(() => { }, [props.currentService])

  const [from, setFrom] = useState(
    {
      name: CURRENCY_MOCK.RUB[0],
      value: CURRENCY_MOCK.RUB[1],
    });
  const [to, setTo] = useState(
    {
      name: CURRENCY_MOCK.USD[0],
      value: CURRENCY_MOCK.USD[1],
    });
  const setOptions = () => props.services.filter((el) => !props.listLimit.includes(el.name));

  const setFromValue = (value) => setFrom(value);
  const setToValue = (value) => setTo(value);

  const onClick = () => {
    props.setLoading(true);
    setCurrentCourse(to.name)
  }
  const setCurrentCourse = async (e) => {
    //If an event came from the selector, then process it.
    if (e.target && e.target.value) {
      const cc = await props.handleConvertaionCurrency(e.target.value);
      await props.setCurrentCourse(cc)
      return;
    }

    //If the name of the currency has come
    const cc = await props.handleConvertaionCurrency(e);
    await props.setCurrentCourse(cc);
  }

  const onChange = (e) => {
    const targetValue = e && e.target && e.target.value
      ? e.target.value
      : 'CC';
    props.setCurrentService(targetValue)
    props.switchService(targetValue);
    props.updateCurrencyList();
  }

  return (
    <div className='converter__container' >
      <ScreenOther
        CURRENCY_TABLE={props.CURRENCY_TABLE}
        currencyList={props.currencyList}
        setFromValue={setFromValue}
        setToValue={setToValue}
        to={to}
        from={from}
        currentNumber={props.currentNumber}
        handleBasicCurrency={props.handleBasicCurrency}
        setCurrentCourse={setCurrentCourse}
        resultNumber={props.resultNumber}
        fontSizeOne={props.fontSizeOne}
        fontSizeTwo={props.fontSizeTwo}
      />
      <span onClick={onClick} className='converter__update'>
        Update rates
        {props.isLoading && <Loader className='loader' />}
      </span>
      <ConverterSwitch
        listLimit={props.listLimit}
        currentService={props.currentService}
        onChange={onChange}
        options={setOptions()}
      />
      <KeyBoardBasic buttons={props.buttons} handleCurNum={props.handleCurNum} />
    </div>
  )
}

Converter.propTypes = {
  currencyList: PropTypes.array,
  CURRENCY_TABLE: PropTypes.object,
  resultNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fontSizeOne: PropTypes.number,
  fontSizeTwo: PropTypes.number,
  handleBasicCurrency: PropTypes.func,
  isLoading: PropTypes.bool,
  buttons: PropTypes.array,
  handleCurNum: PropTypes.func.isRequired,
  updateCurrencyList: PropTypes.func,
  switchService: PropTypes.func,
  setLoading: PropTypes.func,
  setCurrentCourse: PropTypes.func,
  handleConvertaionCurrency: PropTypes.func,
  services: PropTypes.array,
  listLimit: PropTypes.array,
  currentService: PropTypes.string,
  setCurrentService: PropTypes.func,
};

Converter.defaultProps = {
  currencyList: [],
  CURRENCY_TABLE: {},
  resultNumber: '0',
  currentNumber: '0',
  fontSizeOne: 88,
  fontSizeTwo: 88,
  isLoading: false,
  buttons: [],
  services: [],
  listLimit: [],
  currentService: 'CC',
  updateCurrencyList: () => console.log('Не определена функция updateCurrencyList'),
  switchService: () => console.log('Не определена функция switchService'),
  setLoading: () => console.log('Не определена функция setLoading'),
  setCurrentCourse: () => console.log('Не определена функция setCurrentCourse'),
  handleConvertaionCurrency: () => console.log('Не определена функция handleConvertaionCurrency'),
  setCurrentService: () => console.log('Не определена функция setCurrentService'),
};

export default Converter;