import React, { useContext } from 'react';

import alertContext from '../../context/alert/alertContext';

const Alert = () => {
  const { alerts } = useContext(alertContext);

  return (
    alerts &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle' /> {alert.msg}
      </div>
    ))
  );
};

export default Alert;
