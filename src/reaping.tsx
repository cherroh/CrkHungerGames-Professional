// reaping.tsx displays the tributes in a grid

import React from 'react';
import './App.css';
import { TributeType } from './tributes';

interface ReapingProps {
  tributes: TributeType[]; // Define the prop type
}

function Reaping({ tributes }: ReapingProps): React.ReactElement {

  // Generate the form that allows the user to change properties in the tribute array
  return (
    <div className="reaping">
      <table>
        <tbody>
          {[0, 6, 12, 18].map((start, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <tr>
                {[0, 1, 2].map((cellIndex) => (
                  <td key={cellIndex} colSpan={2} className="district-name">District {rowIndex * 3 + cellIndex + 1}</td>
                ))}
              </tr>
              <tr key={rowIndex + 1000}>
                {tributes.slice(start, start + 6).map((tributeObj, cellIndex) => (
                  <td key={cellIndex}>
                    <img src={tributeObj.picture} alt={tributeObj.name} className="tribute-image" />
                    <p className="tribute-name">{tributeObj.name}</p>
                  </td>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reaping;
