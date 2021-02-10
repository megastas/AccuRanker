import React from 'react';
import {
  EuiHighlight, EuiTableRow, EuiTableRowCell, EuiTextColor,
} from '@elastic/eui';

export default function TableRow({ item, search }) {
  return (
    <EuiTableRow>
      {Object.keys(item).map((field) => (
        <EuiTableRowCell
          mobileOptions={{
            show: false,
          }}
          key={item[field]}
        >
          <EuiHighlight search={search}>{item[field]}</EuiHighlight>
        </EuiTableRowCell>
      ))}
      <EuiTableRowCell
        mobileOptions={{
          header: false,
          width: '100%',
          only: true,
        }}
      >
        <EuiHighlight search={search}>{item.name}</EuiHighlight>
        {' '}
        (
        <EuiHighlight search={search}>{item.code}</EuiHighlight>
        )
        <div>
          <EuiTextColor color="secondary"><EuiHighlight search={search}>{item.continent}</EuiHighlight></EuiTextColor>
        </div>
      </EuiTableRowCell>
    </EuiTableRow>
  );
}
