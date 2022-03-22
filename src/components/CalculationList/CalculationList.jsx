import React from 'react';
import PropTypes from 'prop-types';

import CalculationType from './CalculationType';

import './CalculationList.scss';
import { interfaceList } from './ListInterface';

// Draws a list of calculators, depending on the type
const CalculationList = (props) => {
  return (
    <div className='calc__calculation-list'>
      <h3>{props.name}</h3>
      {
        props.list.map((calc) => <CalculationType
          isDisabled={props.disabledCalcs[calc.name]}
          key={calc.name}
          name={calc.name}
          ImageSvg={calc.img}
          setCurrentType={props.setCurrentType}
          currentType={props.currentType}
          handleShowMenu={props.handleShowMenu} />
        )
      }
    </div>
  )
}

CalculationList.propTypes = {
  name: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.shape(interfaceList)),
  setCurrentType: PropTypes.func,
  handleShowMenu: PropTypes.func,
  currentType: PropTypes.string,
  disabledCalcs: PropTypes.object,
};


CalculationList.defaultProps = {
  name: '',
  list: [],
  currentType: '',
  disabledCalcs: {},
  setCurrentType: () => console.log('Не определена функция setCurrentType'),
  handleShowMenu: () => console.log('Не определена функция setCurrentType'),
};

export default CalculationList