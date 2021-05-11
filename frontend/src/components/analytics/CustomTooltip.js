import React from 'react';
import { format, parseISO } from 'date-fns';

import abbreviateNumber from 'helper/abbreviateNumber';

function CustomTooltip({ active, payload, label, currency }) {
  if (active) {
    return (
      <div className="tooltip">
        <h4>{format(parseISO(label), 'MMM, yyyy')}</h4>

        {payload.map((p) => {
          return (
            <p key={p.dataKey}>
              <span style={{ color: p.stroke, fontSize: '70%' }}>
                EQT {p.dataKey.slice(4)}
              </span>{' '}
              &nbsp; {abbreviateNumber(p.value)} {currency}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
}

export default CustomTooltip;
